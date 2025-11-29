import React from "react";

type InputProps = {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export function Input({
  id,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
  disabled = false,
  error = false,
  className = "",
}: InputProps) {
  const base =
    "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60";
  const border = error
    ? "border-rose-300 focus:border-rose-300 focus:ring-rose-200"
    : "border-slate-200 focus:border-indigo-300";
  return (
    <input
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      disabled={disabled}
      className={`${base} ${border} ${className}`}
    />
  );
}
