"use client";

import { useRouter } from "next/navigation";
import { Banner, Card, PageShell } from "@countdown-calender/ui";
import { useCreateEvent } from "@countdown-calender/state";
import { EventForm } from "../_components/EventForm";

export default function NewEventPage() {
  const createEvent = useCreateEvent();
  const router = useRouter();

  return (
    <PageShell
      title="Create event"
      subtitle="Set up a new countdown"
      actions={
        createEvent.error ? <Banner type="error">{createEvent.error.message}</Banner> : null
      }
    >
      <Card>
        <EventForm
          mode="create"
          onSubmit={async (values) => {
            await createEvent.mutateAsync(values);
            router.push("/events");
          }}
        />
      </Card>
    </PageShell>
  );
}
