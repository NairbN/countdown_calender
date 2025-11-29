import { z } from "zod";
import {
  eventCreateSchema,
  eventSchema,
  type Event,
  type EventCreateInput,
  type EventUpdateInput,
  type User,
  userSchema,
} from "./schemas";

export type ApiClientConfig = {
  baseUrl?: string;
  getToken?: () => string | null | undefined;
};

const defaultBaseUrl = "http://localhost:8000";

export function createApiClient(config: ApiClientConfig = {}) {
  // Allow usage in browsers and non-Node environments.
  const envBaseUrl =
    typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE
      ? process.env.NEXT_PUBLIC_API_BASE
      : undefined;
  const baseUrl = config.baseUrl ?? envBaseUrl ?? defaultBaseUrl;

  const authHeader = () => {
    const token = config.getToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return {
    baseUrl,
    authHeader,
    async register(email: string, password: string): Promise<User> {
      const res = await postJson("/auth/register", { email, password });
      return userSchema.parse(res);
    },
    async login(
      email: string,
      password: string
    ): Promise<{ access_token: string; token_type: string }> {
      return postJson("/auth/login", { email, password });
    },
    async me(): Promise<User> {
      const res = await getJson("/auth/me");
      return userSchema.parse(res);
    },
    async listEvents(): Promise<Event[]> {
      const res = await getJson("/events");
      return z.array(eventSchema).parse(res);
    },
    async getEvent(eventId: string): Promise<Event> {
      const res = await getJson(`/events/${eventId}`);
      return eventSchema.parse(res);
    },
    async createEvent(input: EventCreateInput): Promise<Event> {
      const res = await postJson("/events", input);
      return eventSchema.parse(res);
    },
    async updateEvent(eventId: string, input: EventUpdateInput): Promise<Event> {
      const res = await patchJson(`/events/${eventId}`, input);
      return eventSchema.parse(res);
    },
    async deleteEvent(eventId: string): Promise<void> {
      await send("DELETE", `/events/${eventId}`);
    },
  };

  async function send(method: string, path: string, body?: unknown) {
    const token = config.getToken?.();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const message = await extractError(res);
      throw new Error(message);
    }
    return res;
  }

  async function getJson(path: string) {
    const res = await send("GET", path);
    return res.json();
  }

  async function postJson(path: string, body?: unknown) {
    const res = await send("POST", path, body);
    return res.json();
  }

  async function patchJson(path: string, body?: unknown) {
    const res = await send("PATCH", path, body);
    return res.json();
  }

  async function extractError(res: Response): Promise<string> {
    try {
      const data = await res.json();
      if (typeof data.detail === "string") return data.detail;
      if (Array.isArray(data.detail)) {
        return data.detail
          .map((d: { msg?: string }) => d.msg ?? JSON.stringify(d))
          .join("; ");
      }
      if (data.message) return data.message;
    } catch {
      // ignore parse errors
    }
    return `Request failed with status ${res.status}`;
  }
}

export type ApiClient = ReturnType<typeof createApiClient>;
