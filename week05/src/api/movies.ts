import type { Movie, MovieDetail } from "../types/movie";
import type { TmdbMovie, TmdbMovieDetail, TmdbPage } from "../types/tmdb";
import { toMovie, toMovieDetail } from "../lib/tmdb";
import { tmdb } from "./tmdb";

const LANGUAGE = "ko-KR";

// TMDB 는 500페이지 이후를 조회할 수 없다
const MAX_PAGE = 500;

export interface MoviePage {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

function toMoviePage(data: TmdbPage<TmdbMovie>): MoviePage {
  return {
    movies: data.results.map(toMovie),
    page: data.page,
    totalPages: Math.min(data.total_pages, MAX_PAGE),
    totalResults: data.total_results,
  };
}

export async function getPopularMovies(page: number, signal: AbortSignal) {
  const data = await tmdb
    .get("movie/popular", {
      searchParams: { language: LANGUAGE, page },
      signal,
    })
    .json<TmdbPage<TmdbMovie>>();
  return toMoviePage(data);
}

export async function searchMovies(
  query: string,
  page: number,
  signal: AbortSignal,
) {
  const data = await tmdb
    .get("search/movie", {
      searchParams: { language: LANGUAGE, query, page, include_adult: false },
      signal,
    })
    .json<TmdbPage<TmdbMovie>>();
  return toMoviePage(data);
}

export async function getMovieDetail(
  movieId: number,
  signal: AbortSignal,
): Promise<MovieDetail> {
  const data = await tmdb
    .get(`movie/${movieId}`, { searchParams: { language: LANGUAGE }, signal })
    .json<TmdbMovieDetail>();
  return toMovieDetail(data);
}
