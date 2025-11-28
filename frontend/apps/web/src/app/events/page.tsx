"use client";

import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Grid,
  Heading,
  PageShell,
  Skeleton,
  Stack,
  Text,
  Toolbar,
} from "@countdown-calender/ui";
import { useCurrentUser, useDeleteEvent, useEvents } from "@countdown-calender/state";
import { formatCountdownToStart } from "@countdown-calender/domain";
import { useState } from "react";

export default function EventsPage() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const eventsQuery = useEvents();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!user) {
    return (
      <PageShell
        title="Events"
        subtitle="Log in to view your countdowns"
        actions={<Button onClick={() => router.push("/login")}>Login</Button>}
      >
        <EmptyState
          title="Sign in required"
          description="Log in or register to create and manage events."
          actionText="Register"
          onAction={() => router.push("/register")}
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Your events"
      subtitle="Create and track countdowns"
      maxWidth="full"
      actions={
        <Button variant="primary" onClick={() => router.push("/events/new")}>
          New event
        </Button>
      }
    >
      <Toolbar
        left={<Text muted>{eventsQuery.data?.length ?? 0} events</Text>}
        right={
          <Button variant="ghost" onClick={() => router.push("/ui-playground")}>
            UI Playground
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start w-full">
        <div className="sticky top-4 self-start w-full">
          <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <Heading level={3} className="mb-3 text-slate-800">
              Calendar
            </Heading>
            <CalendarSidebar events={eventsQuery.data ?? []} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {eventsQuery.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <Stack>
                  <Skeleton width="70%" height={18} />
                  <Skeleton width="50%" height={14} />
                  <Skeleton width="40%" height={14} />
                </Stack>
              </Card>
            ))
          ) : eventsQuery.data && eventsQuery.data.length > 0 ? (
            eventsQuery.data
              .slice()
              .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
              .map((ev) => (
                <EventCard
                  key={ev.id}
                  eventId={ev.id}
                  title={ev.title}
                  start_at={ev.start_at}
                  all_day={ev.all_day}
                  duration_minutes={ev.duration_minutes}
                  onView={() => router.push(`/events/${ev.id}`)}
                  onEdit={() => router.push(`/events/${ev.id}/edit`)}
                  onDeleted={() => setDeletingId(null)}
                  setDeletingId={setDeletingId}
                  deletingId={deletingId}
                />
              ))
          ) : (
            <EmptyState
              title="No events yet"
              description="Create your first countdown."
              actionText="Create event"
              onAction={() => router.push("/events/new")}
            />
          )}
        </div>
      </div>
    </PageShell>
  );
}

type EventCardProps = {
  eventId: string;
  title: string;
  start_at: string;
  duration_minutes: number;
  all_day: boolean;
  onView: () => void;
  onEdit: () => void;
  onDeleted: () => void;
  setDeletingId: (id: string | null) => void;
  deletingId: string | null;
};

function EventCard({
  eventId,
  title,
  start_at,
  duration_minutes,
  all_day,
  onView,
  onEdit,
  onDeleted,
  setDeletingId,
  deletingId,
}: EventCardProps) {
  const del = useDeleteEvent(eventId);
  const handleDelete = async () => {
    setDeletingId(eventId);
    await del.mutateAsync();
    onDeleted();
  };

  return (
    <Card
      title={title}
      actions={
        <Stack direction="row" className="items-center gap-2">
          <Button size="sm" variant="ghost" onClick={onView}>
            View
          </Button>
          <Button size="sm" variant="ghost" onClick={onEdit}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            disabled={deletingId === eventId}
            onClick={handleDelete}
          >
            {deletingId === eventId ? "Deleting..." : "Delete"}
          </Button>
        </Stack>
      }
    >
      <Stack gap="sm">
        <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2">
          <span className="text-xl" aria-hidden>
            ⏳
          </span>
          <Heading level={3} className="text-indigo-700">
            {formatCountdownToStart(start_at).label}
          </Heading>
        </div>
        <Text muted>{new Date(start_at).toLocaleString()}</Text>
        <Badge variant={all_day ? "info" : "neutral"}>
          {all_day ? "All day" : `${duration_minutes} min`}
        </Badge>
      </Stack>
    </Card>
  );
}

type CalendarSidebarProps = {
  events: {
    id: string;
    start_at: string;
  }[];
};

function CalendarSidebar({ events }: CalendarSidebarProps) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();

  const eventDates = new Set(
    events.map((e) => new Date(e.start_at).toDateString())
  );

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  for (let i = 0; i < startOfMonth.getDay(); i++) {
    currentWeek.push(new Date(NaN));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, month, day));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length) weeks.push(currentWeek);

  return (
    <div className="flex flex-col gap-3">
      <Text muted>
        {today.toLocaleString("default", { month: "long" })} {year}
      </Text>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((date, idx) => {
          const isValid = !isNaN(date.getTime());
          const hasEvent = isValid && eventDates.has(date.toDateString());
          const isToday = isValid && date.toDateString() === today.toDateString();
          return (
            <div
              key={`${date}-${idx}`}
              className={`flex h-10 flex-col items-center justify-center rounded-lg border text-sm ${
                isValid ? "border-slate-200 bg-white" : "border-transparent"
              } ${isToday ? "ring-2 ring-indigo-200" : ""}`}
            >
              {isValid ? (
                <>
                  <span className="text-slate-800">{date.getDate()}</span>
                  {hasEvent ? <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> : null}
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
