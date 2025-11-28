"use client";

export function MockBadge() {
  const mock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-md ${
          mock ? "bg-amber-200 text-amber-900" : "bg-emerald-100 text-emerald-800"
        }`}
      >
        {mock ? "Mock mode" : "Live mode"}
      </span>
    </div>
  );
}
