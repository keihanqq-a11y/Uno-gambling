"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const friends = [
  { name: "VoltQueen", status: "online", level: 41 },
  { name: "Blitz", status: "in-game", level: 55 },
  { name: "Echo", status: "away", level: 60 },
  { name: "Aurora", status: "online", level: 88 },
];

export default function FriendsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Friends & DMs
        </h1>
        <p className="text-sm text-muted">
          Online status, party invites, and direct messages
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {friends.map((f) => (
          <GlassCard
            key={f.name}
            hover={false}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-cyan text-xs font-bold">
                {f.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{f.name}</p>
                <p className="text-xs text-muted">Level {f.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                tone={
                  f.status === "online"
                    ? "success"
                    : f.status === "in-game"
                      ? "cyan"
                      : "warning"
                }
              >
                {f.status}
              </Badge>
              <Button size="sm" variant="secondary">
                Message
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
