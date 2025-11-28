import type { PropsWithChildren } from "react";

type SurfaceProps = PropsWithChildren<{
  className?: string;
}>;

export function Surface({ className = "", children }: SurfaceProps) {
  return (
    <div className={`rounded-lg border border-neutral-200 p-4 ${className}`}>
      {children}
    </div>
  );
}
