"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useUserStore } from "@/stores/user-store";

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-6">
      <GlassCard gradient hover={false} padding="lg">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple to-cyan text-2xl font-bold shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            {user.avatar}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold">
                {user.username}
              </h1>
              <Badge tone="cyan">{user.vip}</Badge>
              <Badge tone={user.kycVerified ? "success" : "warning"}>
                {user.kycVerified ? "KYC verified" : "KYC optional"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted">
              Level {user.level} · Joined {user.joinedAt} · {user.status}
            </p>
            <Progress value={(user.xp % 1000) / 10} className="mt-3 max-w-md" />
          </div>
          <div className="flex gap-2">
            <Link href="/settings">
              <Button variant="secondary">Settings</Button>
            </Link>
            <Link href="/kyc">
              <Button variant="outline">KYC</Button>
            </Link>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Balance", node: <AnimatedCounter value={user.balance} /> },
          { label: "Wins", node: user.wins },
          { label: "Losses", node: user.losses },
          {
            label: "Wagered",
            node: <AnimatedCounter value={user.totalWagered} />,
          },
        ].map((s) => (
          <GlassCard key={s.label} padding="sm" className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted">
              {s.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-oxanium)] text-2xl font-bold">
              {s.node}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
