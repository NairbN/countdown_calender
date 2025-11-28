"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Badge,
  Banner,
  Button,
  Card,
  PageShell,
  Skeleton,
  Stack,
  Text,
} from "@countdown-calender/ui";
import { useDeleteEvent, useEvent } from "@countdown-calender/state";

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const eventQuery = useEvent(id);
  const del = useDeleteEvent(id);

  const handleDelete = async () => {
    await del.mutateAsync();
    router.push("/events");
  };

  return (
    <PageShell
      title={eventQuery.data?.title ?? "Event"}
      subtitle="Countdown details"
      actions={
        <Stack direction="row" className="items-center gap-2">
          <Button variant="ghost" onClick={() => router.push(`/events/${id}/edit`)}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={del.isPending}>
            {del.isPending ? "Deleting..." : "Delete"}
          </Button>
        </Stack>
      }
    >
      {eventQuery.isLoading ? (
        <Card>
          <Stack gap="sm">
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={16} />
            <Skeleton width="40%" height={16} />
          </Stack>
        </Card>
      ) : eventQuery.error ? (
        <Banner type="error">{String(eventQuery.error)}</Banner>
      ) : eventQuery.data ? (
        <Card>
          <Stack gap="sm">
            <Badge variant={eventQuery.data.all_day ? "info" : "neutral"}>
              {eventQuery.data.all_day ? "All day" : `${eventQuery.data.duration_minutes} min`}
            </Badge>
            <Text>{new Date(eventQuery.data.start_at).toLocaleString()}</Text>
            {eventQuery.data.description ? <Text muted>{eventQuery.data.description}</Text> : null}
          </Stack>
        </Card>
      ) : null}
    </PageShell>
  );
}
