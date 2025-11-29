export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  events: {
    all: ["events"] as const,
    detail: (id: string) => ["events", id] as const,
  },
};
