import type { PropsWithChildren, ReactNode } from "react";
import { tokens } from "./tokens";

type PageShellProps = PropsWithChildren<{
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}>;

const widths: Record<NonNullable<PageShellProps["maxWidth"]>, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function PageShell({
  title,
  subtitle,
  actions,
  maxWidth = "lg",
  className = "",
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: tokens.colors.surfaceMuted }}>
      <div className={`mx-auto px-6 py-10 w-full ${widths[maxWidth]} ${className}`}>
        {(title || subtitle || actions) && (
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              {title ? (
                <h1 className="text-3xl font-semibold text-neutral-900">{title}</h1>
              ) : null}
              {subtitle ? (
                <p className="text-sm text-neutral-600">{subtitle}</p>
              ) : null}
            </div>
            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
          </div>
        )}
        <div className="grid gap-4">{children}</div>
      </div>
    </div>
  );
}
