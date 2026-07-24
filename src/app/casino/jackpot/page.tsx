"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

export default function JackpotPage() {
  const [bet, setBet] = useState(30);
  const [pot, setPot] = useState(1840);
  const [result, setResult] = useState<string | null>(null);
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    adjust(-bet);
    setPot((p) => p + bet);
    playSound("coin");
    const win = Math.random() < bet / (pot + bet);
    setTimeout(() => {
      if (win) {
        adjust(pot + bet);
        playSound("win");
        fireWinConfetti();
        setResult(`You hit the jackpot · +$${(pot + bet).toFixed(2)}`);
        setPot(250);
      } else {
        playSound("lose");
        setResult("Ticket registered — waiting for next draw");
      }
    }, 600);
  };

  return (
    <GameShell
      title="Jackpot"
      subtitle="Buy tickets into the shared neon pot"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Current pot</p>
        <motion.p
          key={pot}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="mt-2 font-[family-name:var(--font-oxanium)] text-5xl font-extrabold text-gradient"
        >
          ${pot.toLocaleString()}
        </motion.p>
        <div className="mt-8 flex -space-x-2">
          {["AU", "VQ", "BL", "EC", "NA"].map((a) => (
            <div
              key={a}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-purple to-cyan text-xs font-bold"
            >
              {a}
            </div>
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-muted">
            +18
          </div>
        </div>
      </div>
    </GameShell>
  );
}
