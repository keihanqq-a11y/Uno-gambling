"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

export default function CrashPage() {
  const [bet, setBet] = useState(20);
  const [mult, setMult] = useState(1);
  const [running, setRunning] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [cashed, setCashed] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [crashAt, setCrashAt] = useState(2);
  const adjust = useUserStore((s) => s.adjustBalance);

  useEffect(() => {
    if (!running || crashed || cashed) return;
    const id = setInterval(() => {
      setMult((m) => {
        const next = Number((m + 0.05).toFixed(2));
        if (next >= crashAt) {
          setCrashed(true);
          setRunning(false);
          if (!cashed) {
            playSound("lose");
            setResult(`Crashed at ${crashAt.toFixed(2)}x`);
          }
        }
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [running, crashed, cashed, crashAt]);

  const start = () => {
    setMult(1);
    setCrashed(false);
    setCashed(false);
    setCrashAt(Number((1.2 + Math.random() * 4).toFixed(2)));
    adjust(-bet);
    setRunning(true);
    playSound("click");
    setResult(null);
  };

  const cashout = () => {
    if (!running || cashed || crashed) return;
    setCashed(true);
    setRunning(false);
    const payout = bet * mult;
    adjust(payout);
    playSound("win");
    fireWinConfetti();
    setResult(`Cashed out at ${mult.toFixed(2)}x · +$${payout.toFixed(2)}`);
  };

  return (
    <GameShell
      title="Crash"
      subtitle="Watch the multiplier climb — cash out before it snaps"
      bet={bet}
      setBet={setBet}
      onPlay={running ? cashout : start}
      playing={false}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <motion.p
          key={mult}
          className={`font-[family-name:var(--font-oxanium)] text-6xl font-extrabold ${
            crashed ? "text-danger" : "text-gradient"
          }`}
        >
          {mult.toFixed(2)}x
        </motion.p>
        <p className="mt-3 text-sm text-muted">
          {running ? "In flight — hit Play to cash out" : crashed ? "Round over" : "Place a bet"}
        </p>
        <div className="mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-purple to-cyan"
            animate={{ width: `${Math.min(100, ((mult - 1) / 5) * 100)}%` }}
          />
        </div>
      </div>
    </GameShell>
  );
}
