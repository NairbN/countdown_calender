"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FormField, Input, Stack, Toggle } from "@countdown-calender/ui";
import type { EventCreateInput, EventUpdateInput, Event } from "@countdown-calender/api-client";

type EventFormProps = {
  onSubmit: (values: EventCreateInput | EventUpdateInput) => Promise<void>;
  initial?: Event | null;
  mode: "create" | "edit";
};

export function EventForm({ onSubmit, initial = null, mode }: EventFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [allDay, setAllDay] = useState(initial?.all_day ?? false);
  const [startAt, setStartAt] = useState(() =>
    initial ? toLocalDateTime(initial.start_at) : ""
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initial?.duration_minutes?.toString() ?? "60"
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description ?? "");
      setAllDay(initial.all_day);
      setStartAt(toLocalDateTime(initial.start_at));
      setDurationMinutes(initial.duration_minutes.toString());
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: EventCreateInput | EventUpdateInput = {
      title,
      description: description || null,
      start_at: fromLocalDateTime(startAt),
      duration_minutes: allDay ? 0 : Math.max(0, Number(durationMinutes) || 0),
      all_day: allDay,
    };
    await onSubmit(payload);
    setSaving(false);
    router.push("/events");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Stack gap="sm">
        <FormField label="Title" required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event name" />
        </FormField>
        <FormField label="Description" helperText="Optional">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details, notes, etc."
          />
        </FormField>
        <FormField label="Start" required helperText="Local time">
          <Input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </FormField>
        <Toggle
          checked={allDay}
          onChange={setAllDay}
          label="All day"
          className="mt-1"
        />
        {!allDay && (
          <FormField label="Duration (minutes)" required>
            <Input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="60"
            />
          </FormField>
        )}
      </Stack>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? (mode === "edit" ? "Saving..." : "Creating...") : mode === "edit" ? "Save" : "Create"}
        </Button>
        <Button variant="ghost" type="button" onClick={() => router.push("/events")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function toLocalDateTime(iso: string) {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
}

function fromLocalDateTime(local: string) {
  // assume local input; convert back to UTC ISO
  const d = new Date(local);
  return d.toISOString();
}
