"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createApiClient } from "@countdown-calender/api-client";

type AuthContextShape = {
  token: string | null;
  setToken: (token: string | null) => void;
  clear: () => void;
};

const AuthContext = createContext<AuthContextShape | undefined>(undefined);
const TOKEN_KEY = "countdown_auth_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const setToken = (value: string | null) => setTokenState(value);
  const clear = () => setTokenState(null);

  const value = useMemo<AuthContextShape>(
    () => ({ token, setToken, clear }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextShape {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useApiClient() {
  const { token } = useAuth();
  return useMemo(
    () =>
      createApiClient({
        getToken: () => token,
      }),
    [token]
  );
}
