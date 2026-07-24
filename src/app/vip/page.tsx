"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { VIP_TIERS } from "@/data/mock";
import { useUserStore } from "@/stores/user-store";

export default function VipPage() {
  const user = useUserStore((s) => s.user);
  const currentIdx = VIP_TIERS.findIndex((t) => t.name === user.vip);
  const next = VIP_TIERS[Math.min(currentIdx + 1, VIP_TIERS.length - 1)];
  const progress =
    ((user.xp - VIP_TIERS[currentIdx].minXp) /
      Math.max(1, next.minXp - VIP_TIERS[currentIdx].minXp)) *
    100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          VIP Club
        </h1>
        <p className="text-sm text-muted">
          Level up for cashback, priority support, and exclusive cases
        </p>
      </div>

      <GlassCard gradient hover={false} padding="lg">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge tone="cyan">{user.vip}</Badge>
            <h2 className="mt-3 font-[family-name:var(--font-oxanium)] text-4xl font-bold">
              Level {user.level}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {user.xp.toLocaleString()} XP · next {next.name}
            </p>
          </div>
          <p className="text-sm text-cyan">
            {VIP_TIERS[currentIdx].cashback}% cashback
          </p>
        </div>
        <Progress value={progress} className="mt-6 h-3" />
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {VIP_TIERS.map((tier) => (
          <GlassCard
            key={tier.name}
            className={tier.name === user.vip ? "neon-glow" : undefined}
          >
            <div
              className="mb-3 h-2 w-16 rounded-full"
              style={{ background: tier.color }}
            />
            <h3 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
              {tier.name}
            </h3>
            <p className="mt-2 text-sm text-muted">
              From {tier.minXp.toLocaleString()} XP
            </p>
            <p className="mt-1 text-sm text-cyan">{tier.cashback}% cashback</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
