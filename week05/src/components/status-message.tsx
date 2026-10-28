import type { ReactNode } from "react";

interface StatusMessageProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

// 로딩·오류·빈 결과 안내를 같은 모양으로 보여준다
function StatusMessage({ title, description, action }: StatusMessageProps) {
  return (
    <div
      role="status"
      className="flex w-full flex-1 flex-col items-center justify-center gap-3 py-20 text-center"
    >
      <p className="text-lg font-bold">{title}</p>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      {action}
    </div>
  );
}

interface StatusButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export function StatusButton({ onClick, children }: StatusButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[42px] items-center justify-center rounded-lg border border-ink bg-ink px-4 text-sm font-extrabold text-white"
    >
      {children}
    </button>
  );
}

export default StatusMessage;
