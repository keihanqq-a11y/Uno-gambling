"use client";

import { useState } from "react";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";
import { cn } from "@/lib/utils";

export default function TowersPage() {
  const [bet, setBet] = useState(20);
  const [floor, setFloor] = useState(0);
  const [alive, setAlive] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const adjust = useUserStore((s) => s.adjustBalance);
  const mult = Number((1 + floor * 0.45).toFixed(2));

  const start = () => {
    adjust(-bet);
    setFloor(0);
    setAlive(true);
    playSound("click");
    setResult(null);
  };

  const climb = () => {
    if (!alive) return;
    const safe = Math.random() > 0.28;
    if (!safe) {
      setAlive(false);
      playSound("lose");
      setResult(`Collapsed on floor ${floor + 1}`);
      return;
    }
    setFloor((f) => f + 1);
    playSound("success");
  };

  const cashout = () => {
    if (!alive || floor === 0) return;
    const payout = bet * mult;
    adjust(payout);
    setAlive(false);
    playSound("win");
    fireWinConfetti();
    setResult(`Climbed to ${mult}x · +$${payout.toFixed(2)}`);
  };

  return (
    <GameShell
      title="Towers"
      subtitle="Climb floors for rising multipliers"
      bet={bet}
      setBet={setBet}
      onPlay={alive ? cashout : start}
      lastResult={result}
    >
      <div className="mx-auto flex max-w-xs flex-col-reverse gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <button
            key={i}
            onClick={alive && i === floor ? climb : undefined}
            className={cn(
              "rounded-xl border px-4 py-3 text-sm font-medium transition",
              i < floor
                ? "border-success/40 bg-success/15 text-success"
                : i === floor && alive
                  ? "border-cyan/50 bg-cyan/10 text-white pulse-glow"
                  : "border-white/10 bg-white/5 text-muted",
            )}
          >
            Floor {i + 1}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        Multiplier <span className="text-cyan">{mult}x</span>
        {alive ? " · click current floor to climb" : ""}
      </p>
    </GameShell>
  );
}
