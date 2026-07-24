"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

const colors = ["red", "black", "green"] as const;

export default function RoulettePage() {
  const [bet, setBet] = useState(25);
  const [pick, setPick] = useState<(typeof colors)[number]>("red");
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    setSpinning(true);
    adjust(-bet);
    playSound("shuffle");
    const outcome =
      Math.random() < 0.03
        ? "green"
        : Math.random() > 0.5
          ? "red"
          : "black";
    setAngle((a) => a + 1080 + Math.floor(Math.random() * 360));
    setTimeout(() => {
      const win = outcome === pick;
      if (win) {
        const payout = bet * (outcome === "green" ? 14 : 2);
        adjust(payout);
        playSound("win");
        fireWinConfetti();
        setResult(`Landed ${outcome} · +$${payout.toFixed(2)}`);
      } else {
        playSound("lose");
        setResult(`Landed ${outcome} · lost $${bet.toFixed(2)}`);
      }
      setSpinning(false);
    }, 1200);
  };

  return (
    <GameShell
      title="Roulette"
      subtitle="Red / Black 2x · Green 14x"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      playing={spinning}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setPick(c)}
              className={`rounded-xl px-4 py-2 text-sm capitalize ${
                pick === c
                  ? "bg-gradient-to-r from-purple to-cyan"
                  : "bg-white/5 text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <motion.div
          animate={{ rotate: angle }}
          transition={{ duration: 1.2, ease: [0.15, 0.8, 0.2, 1] }}
          className="h-48 w-48 rounded-full border-4 border-white/20"
          style={{
            background:
              "conic-gradient(#ef4444 0deg 12deg, #111 12deg 24deg, #ef4444 24deg 36deg, #111 36deg 48deg, #22c55e 48deg 54deg, #ef4444 54deg 66deg, #111 66deg 360deg)",
          }}
        />
      </div>
    </GameShell>
  );
}
