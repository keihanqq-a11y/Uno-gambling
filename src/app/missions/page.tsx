"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_MISSIONS } from "@/data/mock";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export default function MissionsPage() {
  const adjust = useUserStore((s) => s.adjustBalance);
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Missions
        </h1>
        <p className="text-sm text-muted">Complete objectives for cash & XP</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_MISSIONS.map((m) => (
          <GlassCard key={m.id} gradient>
            <Badge tone={m.completed ? "success" : "purple"}>
              {m.completed ? "Ready" : "In progress"}
            </Badge>
            <h3 className="mt-3 font-semibold">{m.title}</h3>
            <p className="mt-1 text-sm text-muted">{m.description}</p>
            <Progress
              value={m.progress}
              max={m.target}
              className="mt-4"
            />
            <p className="mt-2 text-xs text-muted">
              {m.progress}/{m.target} · ${m.reward} · {m.xp} XP
            </p>
            <Button
              className="mt-4 w-full"
              disabled={!m.completed}
              onClick={() => {
                adjust(m.reward);
                playSound("success");
                pushToast({
                  tone: "success",
                  title: "Mission claimed",
                  description: `+$${m.reward}`,
                });
              }}
            >
              Claim
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
