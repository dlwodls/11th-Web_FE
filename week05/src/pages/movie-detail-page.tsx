import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import Footer from "../components/footer";
import Icon from "../components/icon";
import { cn } from "../lib/cn";
import { useBookmarkStore } from "../stores/bookmark-store";

interface MovieDetailPageProps {
  movies: Movie[];
}

const RATINGS = [1, 2, 3, 4, 5];

function MovieDetailPage({ movies }: MovieDetailPageProps) {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === Number(movieId));
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(Number(movieId)),
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (!movie) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-20 py-6">
        <h1 className="text-[21px] font-bold">영화를 찾을 수 없어요.</h1>
        <Link to="/" className="text-sm font-extrabold text-primary">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <>
      <section className="relative h-[360px] w-full overflow-hidden">
        <img
          src={movie.backdropPath}
          alt={`${movie.title} 배경`}
          className="size-full object-cover"
        />
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
              <span>{movie.genres.join(" · ")}</span>
              <span>·</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex w-full items-start gap-8 px-20 py-6">
        <div className="h-[286px] w-[200px] shrink-0 overflow-hidden rounded-[10px] bg-surface shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="size-full object-cover"
          />
        </div>

        <section className="flex flex-1 flex-col items-start gap-3">
          <h2 className="text-[21px] leading-[25px] font-bold tracking-[-0.63px]">
            {movie.tagline}
          </h2>
          <p className="text-sm leading-6 text-gray-600">{movie.overview}</p>
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
