"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";

export default function RegisterPage() {
  const signIn = useUserStore((s) => s.signIn);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md">
      <GlassCard gradient hover={false} padding="lg">
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Join UnoX
        </h1>
        <p className="mt-2 text-sm text-muted">18+ only · Responsible gaming required</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            signIn(String(data.get("username") || "NeonAce"));
            playSound("success");
            router.push("/");
          }}
        >
          <Input id="username" name="username" label="Username" required />
          <Input id="email" name="email" label="Email" type="email" required />
          <Input id="password" name="password" label="Password" type="password" required />
          <label className="flex items-start gap-2 text-xs text-muted">
            <input type="checkbox" required className="mt-0.5 accent-purple" />
            I confirm I am 18+ and accept the Terms & Responsible Gambling policy.
          </label>
          <Button className="w-full" size="lg" glow type="submit">
            Create account
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
