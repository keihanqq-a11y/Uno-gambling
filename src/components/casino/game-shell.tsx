"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useUserStore } from "@/stores/user-store";

export function GameShell({
  title,
  subtitle,
  children,
  bet,
  setBet,
  onPlay,
  playing,
  lastResult,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  bet: number;
  setBet: (n: number) => void;
  onPlay: () => void;
  playing?: boolean;
  lastResult?: string | null;
}) {
  const balance = useUserStore((s) => s.user.balance);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          {title}
        </h1>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <GlassCard gradient hover={false} padding="lg" className="min-h-[360px]">
          {children}
        </GlassCard>

        <GlassCard hover={false} className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Balance</p>
            <AnimatedCounter
              value={balance}
              className="font-[family-name:var(--font-oxanium)] text-2xl font-bold"
            />
          </div>
          <Input
            id="bet"
            label="Bet amount"
            type="number"
            min={1}
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
          />
          <div className="flex gap-2">
            {[10, 25, 50, 100].map((n) => (
              <Button
                key={n}
                size="sm"
                variant="secondary"
                onClick={() => setBet(n)}
              >
                ${n}
              </Button>
            ))}
          </div>
          <Button className="w-full" size="lg" glow onClick={onPlay} disabled={playing}>
            {playing ? "Rolling..." : "Play"}
          </Button>
          {lastResult && (
            <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
              {lastResult}
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
