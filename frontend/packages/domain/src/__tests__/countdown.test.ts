import { getCountdownSummary } from "../index";

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
});
