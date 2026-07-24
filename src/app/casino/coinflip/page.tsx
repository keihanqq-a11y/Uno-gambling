"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

export default function CoinflipPage() {
  const [bet, setBet] = useState(25);
  const [side, setSide] = useState<"heads" | "tails">("heads");
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [face, setFace] = useState<"heads" | "tails">("heads");
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    if (flipping) return;
    setFlipping(true);
    playSound("coin");
    adjust(-bet);
    const outcome = Math.random() > 0.5 ? "heads" : "tails";
    setTimeout(() => {
      setFace(outcome);
      const win = outcome === side;
      if (win) {
        adjust(bet * 1.95);
        playSound("win");
        fireWinConfetti();
        setResult(`You won $${(bet * 1.95).toFixed(2)} · ${outcome}`);
      } else {
        playSound("lose");
        setResult(`You lost $${bet.toFixed(2)} · ${outcome}`);
      }
      setFlipping(false);
    }, 900);
  };

  return (
    <GameShell
      title="Coinflip"
      subtitle="Choose a side · 1.95x payout"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      playing={flipping}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="flex gap-3">
          {(["heads", "tails"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`rounded-xl px-5 py-2 text-sm font-medium capitalize ${
                side === s
                  ? "bg-gradient-to-r from-purple to-cyan"
                  : "bg-white/5 text-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <motion.div
          animate={flipping ? { rotateY: [0, 720] } : { rotateY: 0 }}
          transition={{ duration: 0.9 }}
          className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-purple via-blue to-cyan text-2xl font-bold shadow-[0_0_40px_rgba(139,92,246,0.45)]"
        >
          {face}
        </motion.div>
      </div>
    </GameShell>
  );
}
