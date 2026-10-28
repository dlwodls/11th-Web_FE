import { cn } from "../lib/cn";
import Icon from "./icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const VISIBLE_PAGE_COUNT = 5;

// 현재 페이지를 가운데에 두고 최대 5개의 페이지 번호를 만든다
function getVisiblePages(currentPage: number, totalPages: number) {
  const count = Math.min(VISIBLE_PAGE_COUNT, totalPages);
  const start = Math.min(
    Math.max(currentPage - Math.floor(count / 2), 1),
    totalPages - count + 1,
  );
  return Array.from({ length: count }, (_, i) => start + i);
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getVisiblePages(currentPage, totalPages);
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
        onClick={() => onPageChange?.(currentPage - 1)}
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
            onClick={() => onPageChange?.(page)}
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
        onClick={() => onPageChange?.(currentPage + 1)}
        className={cn("text-gray-600", !hasNext && "text-primary-soft")}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
}

export default Pagination;
