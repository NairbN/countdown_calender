import type { PropsWithChildren } from "react";

type FormFieldProps = PropsWithChildren<{
  label: string;
  htmlFor?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
}>;

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-neutral-800"
      >
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  );
}
