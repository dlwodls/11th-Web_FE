import ky, { isHTTPError, isNetworkError, isTimeoutError } from "ky";

// TMDB 요청 공통 설정: 기본 URL, 인증 헤더, 제한 시간
export const tmdb = ky.create({
  baseUrl: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
  timeout: 10_000,
});

export function isNotFoundError(error: unknown) {
  return isHTTPError(error) && error.response.status === 404;
}

// 화면에 보여줄 오류 문구
export function getErrorMessage(error: unknown) {
  if (isHTTPError(error)) {
    if (error.response.status === 401) {
      return "TMDB 인증에 실패했어요. 토큰을 확인해 주세요.";
    }
    if (error.response.status === 404) return "요청한 정보를 찾을 수 없어요.";
    if (error.response.status === 429) {
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요.";
    }
    return `서버 오류가 발생했어요. (${error.response.status})`;
  }
  if (isTimeoutError(error))
    return "응답이 늦어지고 있어요. 다시 시도해 주세요.";
  if (isNetworkError(error)) return "네트워크 연결을 확인해 주세요.";
  return "영화 정보를 불러오지 못했어요.";
}
