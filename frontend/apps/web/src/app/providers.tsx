"use client";

import type { PropsWithChildren } from "react";
import { AppStateProvider } from "@countdown-calender/state";

export function Providers({ children }: PropsWithChildren) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
