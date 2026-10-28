import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import type { TmdbMovie, TmdbPage } from "../types/tmdb";
import { toMovie } from "../lib/tmdb";
import Footer from "../components/footer";
import MovieGrid from "../components/movie-grid";
import Pagination from "../components/pagination";

function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // 순수 fetch 로 인기 영화 1페이지 요청
  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<TmdbPage<TmdbMovie>>;
      })
      .then((data) => setMovies(data.results.map(toMovie)))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error("인기 영화 요청 실패", error);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <main className="flex w-full flex-col items-start gap-5 px-20 py-6">
        <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px]">
          영화 목록
        </h1>
        <MovieGrid movies={movies} showBookmark />
        <Pagination currentPage={1} totalPages={5} />
      </main>
      <Footer />
    </>
  );
}

export default MovieListPage;
