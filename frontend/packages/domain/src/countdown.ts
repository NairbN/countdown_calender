export type CountdownSummary = {
  millisRemaining: number;
  isExpired: boolean;
};

export function getCountdownSummary(
  startAtIso: string,
  durationMinutes: number
): CountdownSummary {
  const start = new Date(startAtIso).getTime();
  const now = Date.now();
  const end = start + durationMinutes * 60 * 1000;
  const millisRemaining = Math.max(0, end - now);
  return { millisRemaining, isExpired: millisRemaining === 0 };
}

export function formatCountdownToStart(startAtIso: string): { label: string; isExpired: boolean } {
  const now = Date.now();
  const target = new Date(startAtIso).getTime();
  const diffMs = target - now;
  if (diffMs < -60 * 1000) return { label: "Ended", isExpired: true };
  if (Math.abs(diffMs) <= 60 * 1000) return { label: "Right now", isExpired: false };

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const plural = (v: number, unit: string) => `${v} ${unit}${v === 1 ? "" : "s"}`;

  if (years >= 1) {
    const remMonths = Math.floor((days - years * 365) / 30);
    return { label: `${plural(years, "year")} ${plural(remMonths, "month")}`, isExpired: false };
  }

  if (months >= 1) {
    const remWeeks = Math.floor((days - months * 30) / 7);
    return { label: `${plural(months, "month")} ${plural(remWeeks, "week")}`, isExpired: false };
  }

  if (weeks >= 1) {
    const remDays = days - weeks * 7;
    return { label: `${plural(weeks, "week")} ${plural(remDays, "day")}`, isExpired: false };
  }

  if (days >= 1) {
    const remHours = hours - days * 24;
    return { label: `${plural(days, "day")} ${plural(remHours, "hour")}`, isExpired: false };
  }

  if (hours >= 1) {
    const remMins = minutes - hours * 60;
    return { label: `${plural(hours, "hour")} ${plural(remMins, "minute")}`, isExpired: false };
  }

  if (minutes >= 1) {
    const remSecs = totalSeconds - minutes * 60;
    return { label: `${plural(minutes, "minute")} ${plural(remSecs, "second")}`, isExpired: false };
  }

  return { label: `${plural(totalSeconds, "second")}`, isExpired: false };
}
