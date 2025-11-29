import type { PropsWithChildren } from "react";
import { tokens } from "./tokens";

type SurfaceProps = PropsWithChildren<{
  className?: string;
}>;

export function Surface({ className = "", children }: SurfaceProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
    >
      {children}
    </div>
  );
}
