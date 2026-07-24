"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { useUiStore } from "@/stores/ui-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

const tracks = [
  { id: "daily", title: "Daily", reward: 25, xp: 100, claimed: false },
  { id: "weekly", title: "Weekly", reward: 150, xp: 500, claimed: false },
  { id: "monthly", title: "Monthly", reward: 750, xp: 2000, claimed: false },
];

export default function RewardsPage() {
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});
  const [caseClaimed, setCaseClaimed] = useState(false);
  const adjust = useUserStore((s) => s.adjustBalance);
  const pushToast = useUiStore((s) => s.pushToast);

  const claim = (id: string, reward: number) => {
    if (claimed[id]) return;
    setClaimed((c) => ({ ...c, [id]: true }));
    adjust(reward);
    playSound("success");
    fireWinConfetti();
    pushToast({
      tone: "success",
      title: `${id} reward claimed`,
      description: `+$${reward} credited`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Rewards Center
        </h1>
        <p className="text-sm text-muted">
          Daily free case, timed rewards, promo codes & rain giveaways
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tracks.map((t) => (
          <GlassCard key={t.id} gradient>
            <Badge tone="cyan">{t.title}</Badge>
            <h3 className="mt-3 font-[family-name:var(--font-oxanium)] text-2xl font-bold">
              ${t.reward}
            </h3>
            <p className="text-sm text-muted">+{t.xp} XP</p>
            <Progress value={claimed[t.id] ? 100 : 70} className="mt-4" />
            <Button
              className="mt-4 w-full"
              disabled={!!claimed[t.id]}
              onClick={() => claim(t.id, t.reward)}
            >
              {claimed[t.id] ? "Claimed" : "Claim"}
            </Button>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard hover={false}>
          <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
            Daily free case
          </h2>
          <p className="mt-2 text-sm text-muted">
            One complimentary neon case every 24 hours.
          </p>
          <Button
            className="mt-4"
            glow
            disabled={caseClaimed}
            onClick={() => {
              setCaseClaimed(true);
              adjust(18);
              playSound("win");
              fireWinConfetti();
              pushToast({
                tone: "success",
                title: "Free case opened",
                description: "+$18 credited",
              });
            }}
          >
            {caseClaimed ? "Come back tomorrow" : "Open free case"}
          </Button>
        </GlassCard>

        <PromoBox />
      </div>
    </div>
  );
}

function PromoBox() {
  const [code, setCode] = useState("");
  const adjust = useUserStore((s) => s.adjustBalance);
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <GlassCard hover={false}>
      <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
        Promo code
      </h2>
      <p className="mt-2 text-sm text-muted">Try UNOXLAUNCH for a demo bonus.</p>
      <div className="mt-4 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter code"
          className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-purple/50"
        />
        <Button
          onClick={() => {
            if (code === "UNOXLAUNCH") {
              adjust(50);
              playSound("success");
              pushToast({
                tone: "success",
                title: "Promo applied",
                description: "+$50 bonus",
              });
            } else {
              playSound("error");
              pushToast({ tone: "error", title: "Invalid promo code" });
            }
          }}
        >
          Apply
        </Button>
      </div>
    </GlassCard>
  );
}
