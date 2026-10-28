import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import Footer from "../components/footer";
import Icon from "../components/icon";
import { BookmarkButton } from "../components/bookmark-button";

interface MovieSearchPageProps {
  movies: Movie[];
}

// 제목 또는 원제(대소문자 무시)에 검색어가 포함된 영화만 반환
function searchMovies(movies: Movie[], keyword: string) {
  const lower = keyword.toLowerCase();
  return movies.filter(
    ({ title, originalTitle }) =>
      title.toLowerCase().includes(lower) ||
      originalTitle.toLowerCase().includes(lower),
  );
}

function MovieSearchPage({ movies }: MovieSearchPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = (searchParams.get("query") ?? "").trim();

  const search = (next: string) => {
    const value = next.trim();
    if (!value) return;
    setSearchParams({ query: value });
  };

  if (!keyword) {
    return <SearchLanding onSearch={search} />;
  }

  // key 로 검색어가 바뀌면(뒤로 가기 등) 입력값도 URL 과 다시 맞춘다
  return (
    <SearchResults
      key={keyword}
      keyword={keyword}
      results={searchMovies(movies, keyword)}
      onSearch={search}
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
  results: Movie[];
}

function SearchResults({ keyword, results, onSearch }: SearchResultsProps) {
  const [query, setQuery] = useState(keyword);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <main className="flex w-full flex-col items-start px-20 py-6">
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
          <span className="text-xs text-gray-400">
            영화 {results.length}편 · 1페이지
          </span>
        </div>

        {results.length === 0 ? (
          <p className="w-full py-20 text-center text-sm text-gray-600">
            ‘{keyword}’에 해당하는 영화가 없어요. 다른 검색어로 찾아보세요.
          </p>
        ) : (
          <div className="grid w-full grid-cols-2 gap-x-10">
            {results.map((movie) => (
              <article
                key={movie.id}
                className="flex items-start gap-[18px] py-5"
              >
                <Link
                  to={`/movies/${movie.id}`}
                  className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-gray-200"
                >
                  <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="size-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col items-start gap-2 pt-1">
                  <h3 className="text-lg leading-6 font-bold">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{movie.originalTitle}</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <p className="text-[12.5px] leading-5 text-gray-600">
                    {movie.overview}
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
        )}
      </main>
      <Footer />
    </>
  );
}

export default MovieSearchPage;
