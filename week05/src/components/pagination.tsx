import { cn } from "../lib/cn";
import Icon from "./icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="영화 목록 페이지"
      className="flex w-full items-center justify-center gap-3"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={!hasPrev}
        className={cn("text-gray-600", !hasPrev && "text-primary-soft")}
      >
        <Icon name="chevron-left" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex size-9 items-center justify-center rounded-[7px] text-[13px] font-bold text-gray-600",
              page === currentPage && "bg-ink text-white",
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={!hasNext}
        className={cn("text-gray-600", !hasNext && "text-primary-soft")}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
}

export default Pagination;
