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
