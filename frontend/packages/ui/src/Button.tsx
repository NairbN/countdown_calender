import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}>;

export function Button({
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-300 disabled:hover:bg-indigo-500",
    secondary:
      "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-200",
    ghost:
      "bg-transparent text-neutral-800 hover:bg-neutral-100 focus:ring-indigo-200",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-300 disabled:hover:bg-rose-500",
  };
  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
