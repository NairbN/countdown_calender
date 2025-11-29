import type { PropsWithChildren } from "react";
import { Button } from "./Button";

type BannerProps = PropsWithChildren<{
  type?: "info" | "success" | "warning" | "error";
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}>;

const palette: Record<NonNullable<BannerProps["type"]>, string> = {
  info: "bg-sky-50 text-sky-900 border-sky-200",
  success: "bg-emerald-50 text-emerald-900 border-emerald-200",
  warning: "bg-amber-50 text-amber-900 border-amber-200",
  error: "bg-rose-50 text-rose-900 border-rose-200",
};

export function Banner({
  type = "info",
  actionText,
  onAction,
  onClose,
  className = "",
  children,
}: BannerProps) {
  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-md border px-3 py-2 ${palette[type]} ${className}`}
    >
      <div className="flex-1 text-sm">{children}</div>
      <div className="flex items-center gap-2">
        {actionText && onAction ? (
          <Button size="sm" variant="ghost" onClick={onAction}>
            {actionText}
          </Button>
        ) : null}
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-inherit hover:underline focus:outline-none"
            aria-label="Close banner"
          >
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
