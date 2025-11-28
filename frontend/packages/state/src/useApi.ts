"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Event,
  EventCreateInput,
  EventUpdateInput,
  User,
} from "@countdown-calender/api-client";
import { useApiClient, useAuth } from "./useAuth";

export function useLogin() {
  const client = useApiClient();
  const { setToken, clear } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { email: string; password: string }) =>
      client.login(vars.email, vars.password),
    onSuccess: async (data) => {
      setToken(data.access_token);
      await qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: () => {
      clear();
    },
  });
}

export function useRegister() {
  const client = useApiClient();
  return useMutation({
    mutationFn: async (vars: { email: string; password: string }) =>
      client.register(vars.email, vars.password),
  });
}

export function useCurrentUser() {
  const client = useApiClient();
  const { token } = useAuth();
  return useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: () => client.me(),
    enabled: !!token,
  });
}

export function useEvents() {
  const client = useApiClient();
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => client.listEvents(),
  });
}

export function useCreateEvent() {
  const client = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: EventCreateInput) => client.createEvent(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent(eventId: string) {
  const client = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: EventUpdateInput) =>
      client.updateEvent(eventId, input),
    onSuccess: (event) => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.setQueryData(["events", eventId], event);
    },
  });
}

export function useDeleteEvent(eventId: string) {
  const client = useApiClient();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => client.deleteEvent(eventId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.removeQueries({ queryKey: ["events", eventId] });
    },
  });
}
