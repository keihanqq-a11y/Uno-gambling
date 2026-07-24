"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const panels = [
  "User management",
  "Ban / mute",
  "KYC review",
  "Deposit monitoring",
  "Withdrawal approval",
  "Live analytics",
  "Revenue dashboard",
  "Game management",
  "Reward management",
  "Promo creator",
  "VIP management",
  "Support tickets",
  "Broadcasts",
  "Chat moderation",
  "Audit logs",
  "Security monitoring",
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted">
          Operations, compliance, and live platform controls
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Revenue (24h)", 42890],
          ["Active users", 1824],
          ["Pending KYC", 12],
          ["Withdraw queue", 7],
        ].map(([label, value]) => (
          <GlassCard key={String(label)} padding="sm" className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted">
              {label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-oxanium)] text-2xl font-bold">
              {typeof value === "number" && String(label).includes("Revenue") ? (
                <AnimatedCounter value={value} />
              ) : (
                value
              )}
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {panels.map((p) => (
          <GlassCard key={p} className="flex items-center justify-between">
            <span className="text-sm font-medium">{p}</span>
            <Badge tone="cyan">Ready</Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
