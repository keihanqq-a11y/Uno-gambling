"use client";

import { useMemo, useState } from "react";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";
import { cn } from "@/lib/utils";

export default function MinesPage() {
  const [bet, setBet] = useState(20);
  const [started, setStarted] = useState(false);
  const [mines, setMines] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [dead, setDead] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const adjust = useUserStore((s) => s.adjustBalance);

  const mult = useMemo(
    () => Number((1 + revealed.size * 0.28).toFixed(2)),
    [revealed.size],
  );

  const start = () => {
    const set = new Set<number>();
    while (set.size < 5) set.add(Math.floor(Math.random() * 25));
    setMines(set);
    setRevealed(new Set());
    setDead(false);
    setStarted(true);
    adjust(-bet);
    playSound("click");
    setResult(null);
  };

  const reveal = (i: number) => {
    if (!started || dead || revealed.has(i)) return;
    if (mines.has(i)) {
      setDead(true);
      setStarted(false);
      playSound("lose");
      setResult("Hit a mine — round over");
      setRevealed(new Set([...revealed, ...mines]));
      return;
    }
    const next = new Set(revealed);
    next.add(i);
    setRevealed(next);
    playSound("success");
  };

  const cashout = () => {
    if (!started || revealed.size === 0) return;
    const payout = bet * mult;
    adjust(payout);
    setStarted(false);
    playSound("win");
    fireWinConfetti();
    setResult(`Cashed out ${mult}x · +$${payout.toFixed(2)}`);
  };

  return (
    <GameShell
      title="Mines"
      subtitle="Reveal gems, avoid bombs, cash out anytime"
      bet={bet}
      setBet={setBet}
      onPlay={started ? cashout : start}
      lastResult={result}
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => {
          const isMine = revealed.has(i) && mines.has(i);
          const isGem = revealed.has(i) && !mines.has(i);
          return (
            <button
              key={i}
              onClick={() => reveal(i)}
              className={cn(
                "aspect-square rounded-xl border text-lg transition",
                isMine
                  ? "border-danger/50 bg-danger/20"
                  : isGem
                    ? "border-success/50 bg-success/20"
                    : "border-white/10 bg-white/5 hover:border-cyan/40",
              )}
            >
              {isMine ? "💣" : isGem ? "💎" : ""}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        Current multiplier: <span className="text-cyan">{mult}x</span>
      </p>
    </GameShell>
  );
}
