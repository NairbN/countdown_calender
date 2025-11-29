import { z } from "zod";

// Schemas based on backend docs
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const eventSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  start_at: z.string(),
  duration_minutes: z.number().int().nonnegative(),
  all_day: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const eventCreateSchema = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  start_at: z.string(),
  duration_minutes: z.number().int().nonnegative(),
  all_day: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
export type Event = z.infer<typeof eventSchema>;
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = Partial<EventCreateInput>;
