import type { PropsWithChildren } from "react";
import { tokens } from "./tokens";

type StackProps = PropsWithChildren<{
  direction?: "row" | "col";
  gap?: keyof typeof tokens.spacing;
  className?: string;
}>;

export function Stack({
  direction = "col",
  gap = "md",
  className = "",
  children,
}: StackProps) {
  const dirClass = direction === "row" ? "flex-row" : "flex-col";
  // Tailwind gap utilities are limited; this uses inline style for consistency with tokens.
  const gapValue = tokens.spacing[gap];
  return (
    <div className={`flex ${dirClass} ${className}`} style={{ gap: gapValue }}>
      {children}
    </div>
  );
}
