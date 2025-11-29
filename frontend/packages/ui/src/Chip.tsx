import type { PropsWithChildren } from "react";

type ChipProps = PropsWithChildren<{
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}>;

export function Chip({ selected = false, onClick, className = "", children }: ChipProps) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const style = selected
    ? "border-indigo-400 bg-indigo-50 text-indigo-800 focus:ring-indigo-200"
    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus:ring-indigo-100";
  return (
    <button type="button" onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  );
}
