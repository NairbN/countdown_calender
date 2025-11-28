"use client";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { EventForm } from "./EventForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("EventForm", () => {
  it("submits with provided values", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(
      <EventForm
        mode="create"
        onSubmit={onSubmit}
        initial={{
          id: "1",
          user_id: "u",
          title: "Launch",
          description: "Desc",
          start_at: "2030-01-01T00:00:00Z",
          duration_minutes: 60,
          all_day: false,
          created_at: "",
          updated_at: "",
        }}
      />
    );

    fireEvent.change(screen.getByDisplayValue("Launch"), {
      target: { value: "Updated launch" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });
});
