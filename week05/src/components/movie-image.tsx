import { cn } from "../lib/cn";

interface MovieImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

// TMDB 에 이미지가 없는 영화는 빈 칸 대신 안내 문구를 보여준다
function MovieImage({ src, alt, className }: MovieImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex size-full items-center justify-center bg-gray-200 text-xs text-gray-400",
          className,
        )}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("size-full object-cover", className)}
    />
  );
}

export default MovieImage;
