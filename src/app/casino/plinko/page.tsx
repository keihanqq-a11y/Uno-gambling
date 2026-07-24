"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

const buckets = [0.2, 0.5, 1, 2, 5, 2, 1, 0.5, 0.2];

export default function PlinkoPage() {
  const [bet, setBet] = useState(15);
  const [dropX, setDropX] = useState(50);
  const [result, setResult] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    setPlaying(true);
    adjust(-bet);
    playSound("coin");
    const idx = Math.floor(Math.random() * buckets.length);
    setDropX(8 + idx * 11);
    setTimeout(() => {
      const mult = buckets[idx];
      const payout = bet * mult;
      adjust(payout);
      if (mult >= 2) {
        playSound("win");
        fireWinConfetti();
      } else playSound(mult >= 1 ? "success" : "lose");
      setResult(`Hit ${mult}x · ${payout >= bet ? "+" : ""}$${(payout - bet).toFixed(2)} net`);
      setPlaying(false);
    }, 900);
  };

  return (
    <GameShell
      title="Plinko"
      subtitle="Drop the puck through neon pegs"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      playing={playing}
      lastResult={result}
    >
      <div className="relative mx-auto h-72 w-full max-w-lg">
        <div className="absolute inset-x-0 top-8 grid grid-cols-9 gap-2 opacity-40">
          {Array.from({ length: 45 }).map((_, i) => (
            <div key={i} className="mx-auto h-2 w-2 rounded-full bg-cyan/70" />
          ))}
        </div>
        <motion.div
          animate={{ left: `${dropX}%`, top: playing ? "85%" : "0%" }}
          transition={{ duration: 0.9, ease: "easeIn" }}
          className="absolute h-5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-br from-purple to-cyan shadow-[0_0_20px_rgba(139,92,246,0.7)]"
        />
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-9 gap-1">
          {buckets.map((b, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 py-2 text-center text-xs font-semibold text-cyan"
            >
              {b}x
            </div>
          ))}
        </div>
      </div>
    </GameShell>
  );
}
