"use client";

type Event = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_at: string;
  duration_minutes: number;
  all_day: boolean;
  created_at: string;
  updated_at: string;
};

type User = {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const MOCK_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  email: "mock@example.com",
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

function loadEvents(): Event[] {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem("mock_events");
  return raw ? (JSON.parse(raw) as Event[]) : [];
}

function saveEvents(events: Event[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("mock_events", JSON.stringify(events));
}

function makeEvent(input: Partial<Event> & Pick<Event, "title" | "start_at" | "duration_minutes" | "all_day">): Event {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    user_id: MOCK_USER.id,
    description: null,
    created_at: now,
    updated_at: now,
    ...input,
  };
}

export function installMockApi() {
  if (typeof window === "undefined") return;
  if ((window as any).__MOCK_API_INSTALLED__) return;
  (window as any).__MOCK_API_INSTALLED__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const { method = "GET" } = init || {};

    if (!url.startsWith("http")) {
      return originalFetch(input, init);
    }

    // Auth endpoints
    if (url.endsWith("/auth/login") && method === "POST") {
      return jsonResponse({ access_token: "mock-token", token_type: "bearer" });
    }
    if (url.endsWith("/auth/register") && method === "POST") {
      return jsonResponse(MOCK_USER);
    }
    if (url.endsWith("/auth/me") && method === "GET") {
      return jsonResponse(MOCK_USER);
    }

    // Events
    if (url.endsWith("/events") && method === "GET") {
      return jsonResponse(loadEvents());
    }
    if (url.endsWith("/events") && method === "POST") {
      const body = parseBody(init?.body);
      const ev = makeEvent({
        title: body.title ?? "Untitled",
        description: body.description ?? null,
        start_at: body.start_at ?? new Date().toISOString(),
        duration_minutes: body.duration_minutes ?? 0,
        all_day: !!body.all_day,
      });
      const events = loadEvents();
      events.push(ev);
      saveEvents(events);
      return jsonResponse(ev, 201);
    }
    const eventIdMatch = url.match(/\/events\/([^/]+)$/);
    if (eventIdMatch) {
      const eventId = eventIdMatch[1];
      const events = loadEvents();
      const idx = events.findIndex((e) => e.id === eventId);
      if (idx === -1) return notFound();
      if (method === "GET") {
        return jsonResponse(events[idx]);
      }
      if (method === "PATCH") {
        const body = parseBody(init?.body);
        events[idx] = {
          ...events[idx],
          ...body,
          updated_at: new Date().toISOString(),
        };
        saveEvents(events);
        return jsonResponse(events[idx]);
      }
      if (method === "DELETE") {
        events.splice(idx, 1);
        saveEvents(events);
        return new Response(null, { status: 204 });
      }
    }

    // Fallback to real fetch
    return originalFetch(input, init);
  };
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function parseBody(body: BodyInit | null | undefined): any {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  if (body instanceof Blob || body instanceof FormData) return {};
  return body as any;
}

function notFound() {
  return new Response(JSON.stringify({ detail: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
