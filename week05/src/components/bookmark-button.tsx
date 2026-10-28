import { cn } from "../lib/cn";
import { useBookmarkStore } from "../stores/bookmark-store";
import Icon from "./icon";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
      className={cn(
        "flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-extrabold text-gray-600",
        isBookmarked && "border-primary bg-primary text-white",
      )}
    >
      <Icon
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={14}
      />
      {isBookmarked ? "북마크 해제" : "북마크 추가"}
    </button>
  );
}
