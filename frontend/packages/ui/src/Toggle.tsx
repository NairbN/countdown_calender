type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  className?: string;
};

export function Toggle({ checked, onChange, label, className = "" }: ToggleProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 ${className}`}>
      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-neutral-300"
        }`}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`ml-0.5 inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
      {label ? <span className="text-sm text-neutral-800">{label}</span> : null}
    </label>
  );
}
