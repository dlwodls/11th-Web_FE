import type { Movie, MovieDetail } from "../types/movie";
import type { TmdbMovie, TmdbMovieDetail } from "../types/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function getImageUrl(path: string | null, size: "w500" | "w1280") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

// "2026-07-29" → "2026.07.29"
function formatDate(date: string) {
  return date ? date.replaceAll("-", ".") : "개봉일 미정";
}

// 145 → "2시간 25분"
function formatRuntime(minutes: number | null) {
  if (!minutes) return "상영 시간 미정";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}분`;
  return rest === 0 ? `${hours}시간` : `${hours}시간 ${rest}분`;
}

export function toMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: formatDate(movie.release_date),
    posterPath: getImageUrl(movie.poster_path, "w500"),
    backdropPath: getImageUrl(movie.backdrop_path, "w1280"),
    overview: movie.overview,
  };
}

export function toMovieDetail(movie: TmdbMovieDetail): MovieDetail {
  return {
    ...toMovie(movie),
    genres: movie.genres.map(({ name }) => name),
    runtime: formatRuntime(movie.runtime),
    tagline: movie.tagline,
  };
}
