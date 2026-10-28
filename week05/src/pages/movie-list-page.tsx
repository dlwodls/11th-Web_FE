import { useSearchParams } from "react-router-dom";
import { getPopularMovies } from "../api/movies";
import { getErrorMessage } from "../api/tmdb";
import { useAsync } from "../hooks/use-async";
import { parsePageParam } from "../lib/page-param";
import Footer from "../components/footer";
import MovieGrid from "../components/movie-grid";
import Pagination from "../components/pagination";
import StatusMessage, { StatusButton } from "../components/status-message";

function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePageParam(searchParams.get("page"));
  const popular = useAsync(`popular:${page}`, (signal) =>
    getPopularMovies(page, signal),
  );

  const changePage = (next: number) => {
    setSearchParams({ page: String(next) });
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-start gap-5 px-20 py-6">
        <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px]">
          영화 목록
        </h1>

        {popular.status === "loading" && (
          <StatusMessage title="영화를 불러오는 중이에요..." />
        )}

        {popular.status === "error" && (
          <StatusMessage
            title="영화 목록을 불러오지 못했어요."
            description={getErrorMessage(popular.error)}
            action={
              <StatusButton onClick={popular.retry}>다시 시도</StatusButton>
            }
          />
        )}

        {popular.status === "success" &&
          (popular.data.movies.length === 0 ? (
            <StatusMessage
              title="표시할 영화가 없어요."
              action={
                <StatusButton onClick={() => changePage(1)}>
                  1페이지로 이동
                </StatusButton>
              }
            />
          ) : (
            <>
              <MovieGrid movies={popular.data.movies} showBookmark />
              <Pagination
                currentPage={page}
                totalPages={popular.data.totalPages}
                onPageChange={changePage}
              />
            </>
          ))}
      </main>
      <Footer />
    </>
  );
}

export default MovieListPage;
