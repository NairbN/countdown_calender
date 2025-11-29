import type { PropsWithChildren } from "react";

type BadgeProps = PropsWithChildren<{
  variant?: "neutral" | "success" | "warning" | "danger" | "info";
  className?: string;
}>;

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-slate-100 text-slate-800",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-sky-100 text-sky-700",
};

export function Badge({ variant = "neutral", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
