import type { Movie } from "../types/movie";
import Footer from "../components/footer";
import MovieGrid from "../components/movie-grid";
import Pagination from "../components/pagination";

interface MovieListPageProps {
  movies: Movie[];
}

function MovieListPage({ movies }: MovieListPageProps) {
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
