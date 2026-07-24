"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const brackets = [
  {
    name: "Neon Cup",
    prize: 5000,
    entrants: 48,
    max: 64,
    status: "registering",
  },
  {
    name: "Midnight Bracket",
    prize: 1200,
    entrants: 16,
    max: 16,
    status: "live",
  },
  {
    name: "Weekend Royale",
    prize: 10000,
    entrants: 12,
    max: 128,
    status: "upcoming",
  },
];

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Tournament Brackets
        </h1>
        <p className="text-sm text-muted">
          Single-elim and Swiss formats · spectator streams · clan wars ready
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {brackets.map((b) => (
          <GlassCard key={b.name} gradient>
            <Badge
              tone={
                b.status === "live"
                  ? "danger"
                  : b.status === "registering"
                    ? "success"
                    : "muted"
              }
            >
              {b.status}
            </Badge>
            <h3 className="mt-3 font-[family-name:var(--font-oxanium)] text-xl font-bold">
              {b.name}
            </h3>
            <p className="mt-2 text-sm text-muted">
              Prize pool ${b.prize.toLocaleString()} · {b.entrants}/{b.max}{" "}
              players
            </p>
            <Link href="/uno/play" className="mt-4 inline-block">
              <Button size="sm">
                {b.status === "live" ? "Spectate" : "Enter"}
              </Button>
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
