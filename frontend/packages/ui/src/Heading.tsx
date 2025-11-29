import type { PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}>;

export function Heading({ level = 2, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
  };
  return (
    <Tag
      className={`font-semibold leading-tight text-neutral-900 ${sizes[level]} ${className}`}
    >
      {children}
    </Tag>
  );
}
