import { render, waitFor } from "@testing-library/react";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "..";

const TOKEN_KEY = "countdown_auth_token";

function SetTokenOnMount({ value }: { value: string | null }) {
  const { setToken, clear, token } = useAuth();
  useEffect(() => {
    if (value) {
      setToken(value);
    } else {
      clear();
    }
  }, [value, setToken, clear]);
  return <div data-testid="token">{token ?? ""}</div>;
}

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores token to localStorage", async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <SetTokenOnMount value="abc123" />
      </AuthProvider>
    );

    await waitFor(() =>
      expect(localStorage.getItem(TOKEN_KEY)).toBe("abc123")
    );
    expect(getByTestId("token").textContent).toBe("abc123");
  });

  it("clears token from localStorage", async () => {
    localStorage.setItem(TOKEN_KEY, "existing");
    const { getByTestId } = render(
      <AuthProvider>
        <SetTokenOnMount value={null} />
      </AuthProvider>
    );

    await waitFor(() => expect(localStorage.getItem(TOKEN_KEY)).toBeNull());
    expect(getByTestId("token").textContent).toBe("");
  });
});
