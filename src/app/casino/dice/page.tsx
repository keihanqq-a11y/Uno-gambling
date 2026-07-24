"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

export default function DicePage() {
  const [bet, setBet] = useState(15);
  const [target, setTarget] = useState(50);
  const [roll, setRoll] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    setPlaying(true);
    adjust(-bet);
    playSound("coin");
    const value = Math.floor(Math.random() * 100) + 1;
    setTimeout(() => {
      setRoll(value);
      const win = value < target;
      if (win) {
        const mult = Number((95 / target).toFixed(2));
        const payout = bet * mult;
        adjust(payout);
        playSound("win");
        fireWinConfetti();
        setResult(`Rolled ${value} · won $${payout.toFixed(2)} (${mult}x)`);
      } else {
        playSound("lose");
        setResult(`Rolled ${value} · lost $${bet.toFixed(2)}`);
      }
      setPlaying(false);
    }, 500);
  };

  return (
    <GameShell
      title="Dice"
      subtitle="Roll under your target number"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      playing={playing}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <motion.div
          key={roll ?? "idle"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-32 w-32 items-center justify-center rounded-3xl border border-white/15 bg-white/5 font-[family-name:var(--font-oxanium)] text-5xl font-bold"
        >
          {roll ?? "--"}
        </motion.div>
        <label className="w-full max-w-sm text-sm">
          <div className="mb-2 flex justify-between text-muted">
            <span>Roll under</span>
            <span className="text-cyan">{target}</span>
          </div>
          <input
            type="range"
            min={2}
            max={95}
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full accent-purple"
          />
        </label>
      </div>
    </GameShell>
  );
}
