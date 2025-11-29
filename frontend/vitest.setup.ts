import "@testing-library/jest-dom/vitest";
import { TextDecoder, TextEncoder } from "util";

// Polyfill for Next.js / node < 19 environments in tests
if (!globalThis.TextDecoder) {
  (globalThis as any).TextDecoder = TextDecoder;
}
if (!globalThis.TextEncoder) {
  (globalThis as any).TextEncoder = TextEncoder;
}
