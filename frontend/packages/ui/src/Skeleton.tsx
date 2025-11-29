import type { PropsWithChildren } from "react";

type SkeletonProps = PropsWithChildren<{
  height?: number | string;
  width?: number | string;
  circle?: boolean;
  className?: string;
}>;

export function Skeleton({
  height = 12,
  width = "100%",
  circle = false,
  className = "",
}: SkeletonProps) {
  const radius = circle ? "50%" : "8px";
  return (
    <div
      className={`animate-pulse bg-slate-200 ${className}`}
      style={{
        height,
        width,
        borderRadius: radius,
      }}
      aria-hidden="true"
    />
  );
}
