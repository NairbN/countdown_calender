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
import { useRegister } from "@countdown-calender/state";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailId = "register-email";
  const passwordId = "register-password";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register.mutateAsync({ email, password }).then(() => {
      router.push("/login");
    });
  };

  return (
    <PageShell
      title="Create account"
      subtitle="Sign up to start creating countdown events"
      maxWidth="sm"
    >
      <Card title="Register">
        {register.error ? <Banner type="error">{register.error.message}</Banner> : null}
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
            <FormField
              label="Password"
              required
              helperText="Use at least 8 characters"
              htmlFor={passwordId}
            >
              <Input
                id={passwordId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormField>
          </Stack>
          <Button type="submit" disabled={register.isPending}>
            {register.isPending ? "Creating account..." : "Register"}
          </Button>
          <Text muted>
            Already have an account?{" "}
            <Button variant="ghost" type="button" onClick={() => router.push("/login")}>
              Login
            </Button>
          </Text>
        </form>
      </Card>
    </PageShell>
  );
}
