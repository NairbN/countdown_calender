import type { PropsWithChildren } from "react";

type GridProps = PropsWithChildren<{
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}>;

const colClasses: Record<NonNullable<GridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ columns = 2, className = "", children }: GridProps) {
  return <div className={`grid gap-4 ${colClasses[columns]} ${className}`}>{children}</div>;
}
