import type { PropsWithChildren } from "react";

type TextProps = PropsWithChildren<{
  as?: "p" | "span" | "label" | "div";
  muted?: boolean;
  className?: string;
}>;

export function Text({ as = "p", muted = false, className = "", children }: TextProps) {
  const Component = as;
  return (
    <Component
      className={`text-sm ${muted ? "text-neutral-600" : "text-neutral-900"} ${className}`}
    >
      {children}
    </Component>
  );
}
