"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MOCK_LEADERBOARD } from "@/data/mock";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Leaderboards
        </h1>
        <p className="text-sm text-muted">Weekly wager kings and UNO ranked elites</p>
      </div>
      <GlassCard hover={false} padding="none" className="overflow-hidden">
        <div className="divide-y divide-white/8">
          {MOCK_LEADERBOARD.map((row) => (
            <div
              key={row.rank}
              className="flex items-center gap-4 px-4 py-4 md:px-6"
            >
              <span className="w-10 font-[family-name:var(--font-oxanium)] text-lg font-bold text-cyan">
                #{row.rank}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple/80 to-cyan/70 text-sm font-bold">
                {row.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium">{row.username}</p>
                <div className="mt-1 flex gap-2">
                  <Badge tone="purple">{row.vip}</Badge>
                  <Badge tone="muted">Lv {row.level}</Badge>
                </div>
              </div>
              <AnimatedCounter
                value={row.value}
                className="font-[family-name:var(--font-oxanium)] font-bold text-success"
              />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
