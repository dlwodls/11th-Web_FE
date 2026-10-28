import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/movies";
import { getErrorMessage } from "../api/tmdb";
import { useAsync } from "../hooks/use-async";
import { parsePageParam } from "../lib/page-param";
import Footer from "../components/footer";
import Icon from "../components/icon";
import MovieImage from "../components/movie-image";
import Pagination from "../components/pagination";
import StatusMessage, { StatusButton } from "../components/status-message";
import { BookmarkButton } from "../components/bookmark-button";

function MovieSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = (searchParams.get("query") ?? "").trim();
  const page = parsePageParam(searchParams.get("page"));

  // 새 검색어는 1페이지부터 보여준다
  const search = (next: string) => {
    const value = next.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  const changePage = (next: number) => {
    setSearchParams({ query: keyword, page: String(next) });
    window.scrollTo({ top: 0 });
  };

  if (!keyword) {
    return <SearchLanding onSearch={search} />;
  }

  // key 로 검색어가 바뀌면(뒤로 가기 등) 입력값도 URL 과 다시 맞춘다
  return (
    <SearchResults
      key={keyword}
      keyword={keyword}
      page={page}
      onSearch={search}
      onPageChange={changePage}
    />
  );
}

interface SearchFormProps {
  onSearch: (query: string) => void;
}

function SearchLanding({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <main className="flex w-full flex-col items-center px-[72px] pt-[209px] pb-[210px]">
      <div className="flex w-[790px] flex-col items-center gap-9">
        <h1 className="text-[46px] leading-[52px] font-bold tracking-[-2.3px]">
          어떤 영화를 찾고 있나요?
        </h1>

        <form
          id="movie-search-form"
          onSubmit={handleSubmit}
          className="flex h-[74px] w-full items-center gap-3.5 rounded-xl border-2 border-ink bg-white pr-[17px] pl-[21px] shadow-[0_12px_34px_rgba(17,19,24,0.08)]"
        >
          <span className="text-gray-600">
            <Icon name="search" />
          </span>
          <input
            type="search"
            aria-label="영화 제목"
            placeholder="예: 스파이더맨"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-0.5 py-px text-[17px] outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex h-[42px] items-center justify-center rounded-lg border border-ink bg-ink px-4 text-sm font-extrabold text-white"
          >
            검색
          </button>
        </form>

        <p className="text-sm text-gray-600">
          검색어를 입력하면 제목이나 원제로 영화를 찾아드려요.
        </p>
      </div>
    </main>
  );
}

interface SearchResultsProps extends SearchFormProps {
  keyword: string;
  page: number;
  onPageChange: (page: number) => void;
}

function SearchResults({
  keyword,
  page,
  onSearch,
  onPageChange,
}: SearchResultsProps) {
  const [query, setQuery] = useState(keyword);
  const result = useAsync(`search:${keyword}:${page}`, (signal) =>
    searchMovies(keyword, page, signal),
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <main className="flex w-full flex-1 flex-col items-start px-20 py-6">
        <div className="flex w-full flex-col gap-[17px]">
          <h1 className="text-[38px] leading-11 font-bold tracking-[-1.71px]">
            영화 검색
          </h1>

          <form
            id="results-search-form"
            onSubmit={handleSubmit}
            className="flex h-[54px] w-full items-center gap-[18px] rounded-[9px] border border-gray-200 bg-white pr-2.5 pl-[15px]"
          >
            <span className="text-gray-600">
              <Icon name="search" />
            </span>
            <input
              type="search"
              aria-label="검색어"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent px-0.5 py-px text-sm font-bold outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setQuery("")}
              className="text-gray-600"
            >
              <Icon name="close" />
            </button>
            <button
              type="submit"
              className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-ink px-4 text-sm font-extrabold text-white"
            >
              다시 검색
            </button>
          </form>
        </div>

        <div className="flex h-[54px] w-full items-center justify-between border-y border-gray-200">
          <h2 id="results-title" className="text-lg font-bold">
            ‘{keyword}’ 검색 결과
          </h2>
          {result.status === "success" && (
            <span className="text-xs text-gray-400">
              영화 {result.data.totalResults.toLocaleString()}편 · {page}페이지
            </span>
          )}
        </div>

        {result.status === "loading" && (
          <StatusMessage title="영화를 검색하는 중이에요..." />
        )}

        {result.status === "error" && (
          <StatusMessage
            title="검색 결과를 불러오지 못했어요."
            description={getErrorMessage(result.error)}
            action={
              <StatusButton onClick={result.retry}>다시 시도</StatusButton>
            }
          />
        )}

        {result.status === "success" &&
          (result.data.totalResults === 0 ? (
            <StatusMessage
              title={`‘${keyword}’에 해당하는 영화가 없어요.`}
              description="다른 검색어로 찾아보세요."
            />
          ) : result.data.movies.length === 0 ? (
            <StatusMessage
              title={`${page}페이지에는 검색 결과가 없어요.`}
              description={`검색 결과는 ${result.data.totalPages}페이지까지 있어요.`}
              action={
                <StatusButton onClick={() => onPageChange(1)}>
                  1페이지로 이동
                </StatusButton>
              }
            />
          ) : (
            <>
              <div className="grid w-full grid-cols-2 gap-x-10">
                {result.data.movies.map((movie) => (
                  <article
                    key={movie.id}
                    className="flex items-start gap-[18px] py-5"
                  >
                    <Link
                      to={`/movies/${movie.id}`}
                      className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-gray-200"
                    >
                      <MovieImage
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                      />
                    </Link>

                    <div className="flex flex-1 flex-col items-start gap-2 pt-1">
                      <h3 className="text-lg leading-6 font-bold">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{movie.originalTitle}</span>
                        <span>{movie.releaseDate}</span>
                      </div>
                      <p className="line-clamp-3 text-[12.5px] leading-5 text-gray-600">
                        {movie.overview || "등록된 줄거리가 없어요."}
                      </p>
                      <Link
                        to={`/movies/${movie.id}`}
                        className="flex items-center gap-1 text-xs font-extrabold text-primary"
                      >
                        상세 보기
                        <Icon name="arrow-right" size={16} />
                      </Link>
                      <BookmarkButton movieId={movie.id} />
                    </div>
                  </article>
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={result.data.totalPages}
                onPageChange={onPageChange}
              />
            </>
          ))}
      </main>
      <Footer />
    </>
  );
}

export default MovieSearchPage;
