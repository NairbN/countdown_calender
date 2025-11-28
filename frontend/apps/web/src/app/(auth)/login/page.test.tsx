"use client";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import LoginPage from "./page";

const pushMock = vi.fn();
const mutateAsyncMock = vi.fn().mockResolvedValue(undefined);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@countdown-calender/state", () => ({
  useLogin: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
    error: null,
  }),
}));

describe("LoginPage", () => {
  it("submits and redirects to events", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(mutateAsyncMock).toHaveBeenCalled());
  });
});
