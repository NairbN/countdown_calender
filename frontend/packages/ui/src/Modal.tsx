import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "./Button";

type ModalProps = PropsWithChildren<{
  open: boolean;
  title?: ReactNode;
  onClose: () => void;
  primaryAction?: { label: string; onClick: () => void; variant?: "primary" | "danger" };
  secondaryAction?: { label: string; onClick: () => void };
  className?: string;
}>;

export function Modal({
  open,
  title,
  onClose,
  primaryAction,
  secondaryAction,
  className = "",
  children,
}: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-[2px]">
      <div
        className={`w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
      >
        {title ? <h2 className="mb-3 text-xl font-semibold text-neutral-900">{title}</h2> : null}
        <div className="mb-5 text-sm text-neutral-800">{children}</div>
        <div className="flex justify-end gap-2">
          {secondaryAction ? (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          ) : null}
          {primaryAction ? (
            <Button
              variant={primaryAction.variant ?? "primary"}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          ) : null}
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
