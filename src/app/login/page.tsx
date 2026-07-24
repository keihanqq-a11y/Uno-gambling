"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";

export default function LoginPage() {
  const signIn = useUserStore((s) => s.signIn);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md">
      <GlassCard gradient hover={false} padding="lg">
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          Secure auth · Email, Google, Discord
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
            playSound("success");
            router.push("/");
          }}
        >
          <Input id="email" label="Email" type="email" placeholder="you@unox.gg" required />
          <Input id="password" label="Password" type="password" required />
          <Button className="w-full" size="lg" glow type="submit">
            Sign in
          </Button>
        </form>
        <div className="mt-4 grid gap-2">
          <Button variant="secondary" className="w-full" type="button">
            Continue with Google
          </Button>
          <Button variant="secondary" className="w-full" type="button">
            Continue with Discord
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/register" className="text-cyan hover:underline">
            Create account
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
