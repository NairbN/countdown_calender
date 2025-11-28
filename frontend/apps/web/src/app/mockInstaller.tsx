"use client";

import { useEffect } from "react";
import { installMockApi } from "../mocks/mockApi";

export function MockInstaller() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      installMockApi();
    }
  }, []);
  return null;
}
