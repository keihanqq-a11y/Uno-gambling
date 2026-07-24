"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GameShell } from "@/components/casino/game-shell";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";

const loot = [
  { label: "Common", value: 5, color: "#9CA3AF", weight: 50 },
  { label: "Rare", value: 25, color: "#3B82F6", weight: 30 },
  { label: "Epic", value: 80, color: "#8B5CF6", weight: 15 },
  { label: "Legendary", value: 250, color: "#F59E0B", weight: 5 },
];

function rollLoot() {
  const total = loot.reduce((s, l) => s + l.weight, 0);
  let r = Math.random() * total;
  for (const item of loot) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return loot[0];
}

export default function CasesPage() {
  const [bet, setBet] = useState(10);
  const [opening, setOpening] = useState(false);
  const [prize, setPrize] = useState<(typeof loot)[number] | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const adjust = useUserStore((s) => s.adjustBalance);

  const play = () => {
    setOpening(true);
    adjust(-bet);
    playSound("shuffle");
    const item = rollLoot();
    setTimeout(() => {
      setPrize(item);
      adjust(item.value);
      if (item.value >= 80) {
        playSound("win");
        fireWinConfetti();
      } else playSound("success");
      setResult(`Opened ${item.label} · +$${item.value}`);
      setOpening(false);
    }, 900);
  };

  return (
    <GameShell
      title="Cases"
      subtitle="Open neon cases · daily free case in Rewards"
      bet={bet}
      setBet={setBet}
      onPlay={play}
      playing={opening}
      lastResult={result}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          animate={
            opening
              ? { rotateY: [0, 180, 360], scale: [1, 1.08, 1] }
              : { rotateY: 0 }
          }
          transition={{ duration: 0.9 }}
          className="flex h-44 w-36 items-center justify-center rounded-3xl border border-purple/40 bg-gradient-to-br from-[#1b1230] to-[#0d0d0d] shadow-[0_0_40px_rgba(139,92,246,0.35)]"
        >
          <span
            className="font-[family-name:var(--font-oxanium)] text-xl font-bold"
            style={{ color: prize?.color ?? "#22D3EE" }}
          >
            {prize?.label ?? "CASE"}
          </span>
        </motion.div>
      </div>
    </GameShell>
  );
}
