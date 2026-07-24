"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/ui-store";

const feed = [
  { user: "Aurora", action: "won a $2,400 jackpot", time: "2m" },
  { user: "Blitz", action: "hit UNO in ranked 1v1", time: "5m" },
  { user: "VoltQueen", action: "opened a Legendary case", time: "9m" },
  { user: "Echo", action: "created clan Neon Syndicate", time: "14m" },
];

export default function CommunityPage() {
  const setChat = useUiStore((s) => s.setChatOpen);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
            Community
          </h1>
          <p className="text-sm text-muted">
            Live feed, clans, guilds, parties, and events
          </p>
        </div>
        <Button onClick={() => setChat(true)}>Open global chat</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Clans", "Create or join competitive clans"],
          ["Guilds", "Shared rewards & weekly goals"],
          ["Parties", "Queue together across modes"],
        ].map(([title, desc]) => (
          <GlassCard key={title} gradient>
            <h3 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard hover={false}>
        <h2 className="mb-4 font-[family-name:var(--font-oxanium)] text-xl font-bold">
          Live activity
        </h2>
        <div className="space-y-3">
          {feed.map((f) => (
            <div
              key={`${f.user}-${f.time}`}
              className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3"
            >
              <p className="text-sm">
                <span className="font-semibold text-cyan">{f.user}</span>{" "}
                {f.action}
              </p>
              <Badge tone="muted">{f.time}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
