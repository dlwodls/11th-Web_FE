import type { CSSProperties } from "react";
import { cn } from "../lib/cn";

export type IconName =
  | "search"
  | "movie"
  | "bookmark"
  | "bookmark-outline"
  | "chevron-left"
  | "chevron-right"
  | "arrow-right"
  | "close"
  | "star"
  | "star-outline"
  | "person"
  | "edit"
  | "mail"
  | "lock";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// 검정 단색 SVG 아이콘을 currentColor 로 칠하기 위한 마스크
function Icon({ name, size = 24, className }: IconProps) {
  const style = {
    "--icon": `url(/icons/${name}.svg)`,
    width: size,
    height: size,
  } as CSSProperties;

  return (
    <span
      aria-hidden
      className={cn(
        "inline-block flex-none bg-current mask-(--icon) mask-contain mask-center mask-no-repeat",
        className,
      )}
      style={style}
    />
  );
}

export default Icon;
