"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const matches = [
  {
    id: "m1",
    result: "win",
    mode: "ranked 1v1",
    delta: "+28 MMR",
    payout: 48,
    date: "Jul 23, 2026",
  },
  {
    id: "m2",
    result: "loss",
    mode: "casual 1v1v1v1",
    delta: "-12 MMR",
    payout: -25,
    date: "Jul 23, 2026",
  },
  {
    id: "m3",
    result: "win",
    mode: "tournament QF",
    delta: "+40 MMR",
    payout: 120,
    date: "Jul 22, 2026",
  },
];

export default function MatchHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Match History
        </h1>
        <p className="text-sm text-muted">
          Replays, reconnect events, and ranked progression
        </p>
      </div>
      <div className="space-y-3">
        {matches.map((m) => (
          <GlassCard
            key={m.id}
            hover={false}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <Badge tone={m.result === "win" ? "success" : "danger"}>
                  {m.result}
                </Badge>
                <p className="font-medium">{m.mode}</p>
              </div>
              <p className="mt-1 text-xs text-muted">
                {m.date} · {m.delta}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p
                className={`font-[family-name:var(--font-oxanium)] font-bold ${
                  m.payout >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {m.payout >= 0 ? "+" : ""}${Math.abs(m.payout)}
              </p>
              <Button size="sm" variant="secondary">
                Replay
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
