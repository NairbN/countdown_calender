"use client";

import { useParams, useRouter } from "next/navigation";
import { Banner, Card, PageShell } from "@countdown-calender/ui";
import { useEvent, useUpdateEvent } from "@countdown-calender/state";
import { EventForm } from "../../_components/EventForm";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const eventQuery = useEvent(id);
  const update = useUpdateEvent(id);

  return (
    <PageShell title="Edit event" subtitle="Update your countdown">
      {eventQuery.isLoading ? (
        <Card>Loading...</Card>
      ) : eventQuery.error ? (
        <Banner type="error">{String(eventQuery.error)}</Banner>
      ) : eventQuery.data ? (
        <Card>
          <EventForm
            mode="edit"
            initial={eventQuery.data}
            onSubmit={async (values) => {
              await update.mutateAsync(values);
              router.push(`/events/${id}`);
            }}
          />
        </Card>
      ) : null}
    </PageShell>
  );
}
