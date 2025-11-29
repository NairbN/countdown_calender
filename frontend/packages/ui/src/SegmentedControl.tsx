import type { ReactNode } from "react";

type Option<T extends string> = {
  label: ReactNode;
  value: T;
};

type SegmentedControlProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
    className = "",
}: SegmentedControlProps<T>) {
  return (
    <div className={`inline-flex rounded-full border border-slate-200 bg-white p-1 ${className}`}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              active
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
