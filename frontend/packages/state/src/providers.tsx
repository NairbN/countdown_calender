"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { AuthProvider } from "./useAuth";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const client = globalQueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}

let singletonClient: QueryClient | null = null;
function globalQueryClient() {
  if (!singletonClient) {
    singletonClient = createQueryClient();
  }
  return singletonClient;
}
