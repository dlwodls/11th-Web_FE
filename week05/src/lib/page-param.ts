// URL 의 page 값을 1 이상의 정수로 바꾼다 (없거나 잘못되면 1)
export function parsePageParam(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}
