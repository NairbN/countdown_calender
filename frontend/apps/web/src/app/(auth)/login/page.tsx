"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Banner,
  Button,
  Card,
  FormField,
  Input,
  PageShell,
  Stack,
  Text,
} from "@countdown-calender/ui";
import { useLogin } from "@countdown-calender/state";

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailId = "login-email";
  const passwordId = "login-password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login.mutateAsync({ email, password }).then(() => {
      router.push("/events");
    });
  };

  return (
    <PageShell title="Welcome back" subtitle="Log in to see your countdowns" maxWidth="sm">
      <Card title="Login">
        {login.error ? <Banner type="error">{login.error.message}</Banner> : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Stack gap="sm">
            <FormField label="Email" required htmlFor={emailId}>
              <Input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormField>
            <FormField label="Password" required htmlFor={passwordId}>
              <Input
                id={passwordId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormField>
          </Stack>
          <Button type="submit" disabled={login.isPending}>
            {login.isPending ? "Signing in..." : "Login"}
          </Button>
          <Text muted>
            New here?{" "}
            <Button variant="ghost" type="button" onClick={() => router.push("/register")}>
              Create an account
            </Button>
          </Text>
        </form>
      </Card>
    </PageShell>
  );
}
