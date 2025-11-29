import type { PropsWithChildren, ReactNode } from "react";
import { tokens } from "./tokens";

type CardProps = PropsWithChildren<{
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
}>;

export function Card({ title, actions, className = "", children }: CardProps) {
  return (
    <section
      className={`rounded-xl border bg-white p-5 shadow-sm ${className}`}
      style={{ boxShadow: tokens.shadow.sm, borderColor: tokens.colors.border }}
    >
      {(title || actions) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title ? (
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          ) : (
            <span />
          )}
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </header>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
