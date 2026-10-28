import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movies";
import { getErrorMessage, isNotFoundError } from "../api/tmdb";
import { useAsync } from "../hooks/use-async";
import Footer from "../components/footer";
import Icon from "../components/icon";
import MovieImage from "../components/movie-image";
import StatusMessage, { StatusButton } from "../components/status-message";
import { cn } from "../lib/cn";
import { useBookmarkStore } from "../stores/bookmark-store";

const RATINGS = [1, 2, 3, 4, 5];

function MovieDetailPage() {
  const { movieId } = useParams();
  const id = Number(movieId);
  const detail = useAsync(`detail:${movieId}`, (signal) =>
    getMovieDetail(id, signal),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(id),
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (detail.status === "loading") {
    return (
      <main className="flex flex-1 flex-col px-20 py-6">
        <StatusMessage title="영화 정보를 불러오는 중이에요..." />
      </main>
    );
  }

  if (detail.status === "error") {
    const notFound = isNotFoundError(detail.error);
    return (
      <main className="flex flex-1 flex-col px-20 py-6">
        <StatusMessage
          title={
            notFound
              ? "영화를 찾을 수 없어요."
              : "영화 정보를 불러오지 못했어요."
          }
          description={notFound ? undefined : getErrorMessage(detail.error)}
          action={
            notFound ? (
              <Link to="/" className="text-sm font-extrabold text-primary">
                영화 목록으로 돌아가기
              </Link>
            ) : (
              <StatusButton onClick={detail.retry}>다시 시도</StatusButton>
            )
          }
        />
      </main>
    );
  }

  const movie = detail.data;

  return (
    <>
      <section className="relative h-[360px] w-full overflow-hidden">
        <MovieImage src={movie.backdropPath} alt={`${movie.title} 배경`} />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/20" />

        <div className="absolute inset-0 flex flex-col items-start justify-between px-20 py-6 text-white">
          <Link
            to="/"
            className="flex items-center gap-1 text-[13px] font-bold"
          >
            <Icon name="chevron-left" />
            영화 목록
          </Link>

          <div className="flex w-[800px] flex-col gap-2">
            <h1 className="text-[46px] leading-[50px] font-bold tracking-[-2.3px]">
              {movie.title}
            </h1>
            <p className="text-sm">{movie.originalTitle}</p>
            <div className="flex items-center gap-2 text-[13px] font-bold">
              <span>{movie.releaseDate}</span>
              <span>·</span>
              <span>{movie.genres.join(" · ") || "장르 정보 없음"}</span>
              <span>·</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex w-full items-start gap-8 px-20 py-6">
        <div className="h-[286px] w-[200px] shrink-0 overflow-hidden rounded-[10px] bg-surface shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
          <MovieImage src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </div>

        <section className="flex flex-1 flex-col items-start gap-3">
          {movie.tagline && (
            <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px]">
              {movie.tagline}
            </h2>
          )}
          <p className="text-sm leading-6 text-gray-600">
            {movie.overview || "등록된 줄거리가 없어요."}
          </p>
          <button
            type="button"
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(movie.id)}
            className="flex h-[42px] items-center gap-2 rounded-lg border border-white bg-primary px-4 text-sm font-extrabold text-white"
          >
            <Icon
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={16}
            />
            즐겨찾기
          </button>
        </section>

        <aside className="flex w-[360px] shrink-0 flex-col gap-2 pb-[41px] pl-[30px]">
          <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px]">
            내 평점
          </h2>
          <p className="text-xs text-gray-400">
            별점은 필수, 후기는 선택이에요.
          </p>

          <div className="flex gap-1" role="radiogroup" aria-label="영화 별점">
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value}점`}
                onClick={() => setRating(value)}
                className={cn(
                  "flex size-[38px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600",
                  value <= rating && "text-primary",
                )}
              >
                <Icon name={value <= rating ? "star" : "star-outline"} />
              </button>
            ))}
          </div>

          <textarea
            id="review-text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="h-[102px] w-full resize-none rounded-lg border border-gray-200 bg-white px-3 pt-4 pb-[18px] text-[13px] leading-5 placeholder:text-gray-400"
          />

          <button
            id="save-rating"
            type="button"
            className="flex h-[42px] w-full items-center justify-center rounded-lg border border-white bg-ink text-sm font-extrabold text-white"
          >
            평점 저장
          </button>
        </aside>
      </main>
      <Footer />
    </>
  );
}

export default MovieDetailPage;
