import { useEffect, useEffectEvent, useState } from "react";

type SettledState<T> =
  { status: "error"; error: unknown } | { status: "success"; data: T };

export type AsyncState<T> = { status: "loading" } | SettledState<T>;

// key 가 바뀔 때마다 fetcher 를 다시 실행하고, 이전 요청은 취소한다
export function useAsync<T>(
  key: string,
  fetcher: (signal: AbortSignal) => Promise<T>,
) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{
    requestKey: string;
    state: SettledState<T>;
  } | null>(null);
  const runFetcher = useEffectEvent(fetcher);
  const requestKey = `${key}#${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    runFetcher(controller.signal).then(
      (data) => setResult({ requestKey, state: { status: "success", data } }),
      (error: unknown) => {
        if (controller.signal.aborted) return;
        setResult({ requestKey, state: { status: "error", error } });
      },
    );

    return () => controller.abort();
  }, [requestKey]);

  // 아직 현재 key 의 응답이 오지 않았다면 로딩 중
  const state: AsyncState<T> =
    result?.requestKey === requestKey ? result.state : { status: "loading" };

  return { ...state, retry: () => setAttempt((prev) => prev + 1) };
}
