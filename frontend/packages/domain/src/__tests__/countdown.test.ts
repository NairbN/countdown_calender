import { getCountdownSummary } from "../countdown";
import { formatCountdownToStart } from "../countdown";

describe("getCountdownSummary", () => {
  it("returns remaining time when in future", () => {
    const now = Date.now();
    const start = new Date(now + 60_000).toISOString(); // starts in 1 min
    const result = getCountdownSummary(start, 2); // 2 minutes duration
    expect(result.isExpired).toBe(false);
    expect(result.millisRemaining).toBeGreaterThan(0);
  });

  it("returns expired when past end", () => {
    const past = new Date(Date.now() - 10 * 60_000).toISOString();
    const result = getCountdownSummary(past, 1);
    expect(result.isExpired).toBe(true);
    expect(result.millisRemaining).toBe(0);
  });

  it("formats long countdown into years and months", () => {
    const now = new Date();
    const future = new Date(now.getTime() + 400 * 24 * 60 * 60 * 1000).toISOString();
    const result = formatCountdownToStart(future);
    expect(result.label).toMatch(/year/);
    expect(result.isExpired).toBe(false);
  });
});
