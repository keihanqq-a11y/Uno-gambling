"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ACHIEVEMENTS } from "@/data/mock";
import { cn } from "@/lib/utils";

const rarityTone = {
  common: "muted",
  rare: "blue",
  epic: "purple",
  legendary: "warning",
} as const;

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Achievements
        </h1>
        <p className="text-sm text-muted">Collect trophies across UNO and casino</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_ACHIEVEMENTS.map((a) => (
          <GlassCard
            key={a.id}
            className={cn(!a.unlocked && "opacity-55 grayscale")}
          >
            <div className="text-3xl">{a.icon}</div>
            <h3 className="mt-3 font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted">{a.description}</p>
            <Badge className="mt-3" tone={rarityTone[a.rarity]}>
              {a.rarity}
            </Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
