"use client";

import { motion } from "framer-motion";
import type { UnoCard as UnoCardType } from "@/types";
import { cn } from "@/lib/utils";

const colorMap = {
  red: "from-rose-500 to-red-700",
  yellow: "from-amber-300 to-yellow-600",
  green: "from-emerald-400 to-green-700",
  blue: "from-sky-400 to-blue-700",
  wild: "from-purple via-fuchsia-500 to-cyan",
};

const labels: Record<string, string> = {
  skip: "⊘",
  reverse: "↺",
  draw2: "+2",
  wild: "W",
  wild4: "+4",
};

export function UnoCardView({
  card,
  faceDown = false,
  selected = false,
  onClick,
  size = "md",
  className,
}: {
  card?: UnoCardType;
  faceDown?: boolean;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-20 w-14 text-lg",
    md: "h-28 w-20 text-2xl",
    lg: "h-36 w-24 text-3xl",
  };

  if (faceDown || !card) {
    return (
      <motion.div
        whileHover={{ y: -6, rotate: -2 }}
        className={cn(
          "card-face relative cursor-pointer rounded-xl bg-gradient-to-br from-[#1a1030] via-[#241248] to-[#0d0d0d] border border-purple/40",
          sizes[size],
          className,
        )}
        onClick={onClick}
      >
        <div className="absolute inset-2 rounded-lg border border-cyan/30 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.45),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.3),transparent_40%)]" />
        <div className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-oxanium)] text-sm font-bold text-white/80">
          UnoX
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -10, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        "card-face relative overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br text-white shadow-xl",
        colorMap[card.color],
        sizes[size],
        selected && "ring-2 ring-cyan shadow-[0_0_28px_rgba(34,211,238,0.45)] -translate-y-3",
        className,
      )}
    >
      <span className="absolute left-2 top-1 text-sm font-bold drop-shadow">
        {labels[card.value] ?? card.value}
      </span>
      <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-oxanium)] font-extrabold drop-shadow-lg">
        {labels[card.value] ?? card.value}
      </span>
      <span className="absolute bottom-1 right-2 rotate-180 text-sm font-bold drop-shadow">
        {labels[card.value] ?? card.value}
      </span>
    </motion.button>
  );
}
