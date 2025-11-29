import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "./Button";
import { Text } from "./Text";

type EmptyStateProps = PropsWithChildren<{
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}>;

export function EmptyState({
  title,
  description,
  actionText,
  onAction,
  icon,
  className = "",
  children,
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-200 bg-white p-6 text-center ${className}`}>
      {icon ? <div className="text-3xl">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      {description ? <Text muted>{description}</Text> : null}
      {children}
      {actionText && onAction ? (
        <Button onClick={onAction} variant="primary">
          {actionText}
        </Button>
      ) : null}
    </div>
  );
}
