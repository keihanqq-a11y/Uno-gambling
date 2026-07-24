"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Mic, RotateCcw, Sparkles } from "lucide-react";
import { UnoCardView } from "@/components/game/uno-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { UnoCard } from "@/types";
import { playSound } from "@/lib/sounds";
import { fireWinConfetti } from "@/components/effects/confetti-burst";
import { useUiStore } from "@/stores/ui-store";

function makeCard(color: UnoCard["color"], value: UnoCard["value"], i: number): UnoCard {
  return { id: `${color}-${value}-${i}`, color, value };
}

const starterHand: UnoCard[] = [
  makeCard("red", "7", 1),
  makeCard("blue", "skip", 2),
  makeCard("green", "2", 3),
  makeCard("yellow", "draw2", 4),
  makeCard("wild", "wild", 5),
  makeCard("red", "9", 6),
  makeCard("blue", "4", 7),
];

const opponents = [
  { name: "VoltQueen", cards: 5, pos: "top" },
  { name: "Blitz", cards: 3, pos: "left" },
  { name: "Echo", cards: 6, pos: "right" },
];

export function UnoTable() {
  const [hand, setHand] = useState(starterHand);
  const [selected, setSelected] = useState<string | null>(null);
  const [discard, setDiscard] = useState<UnoCard>(makeCard("green", "5", 0));
  const [turnTimer, setTurnTimer] = useState(12);
  const [direction, setDirection] = useState<"cw" | "ccw">("cw");
  const [chat, setChat] = useState("Nice stack 🔥");
  const pushToast = useUiStore((s) => s.pushToast);

  const canUno = hand.length === 1;

  useEffect(() => {
    const id = setInterval(() => {
      setTurnTimer((t) => (t <= 0 ? 15 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const playCard = (card: UnoCard) => {
    setSelected(card.id);
    playSound("card");
    setTimeout(() => {
      setDiscard(card);
      setHand((h) => h.filter((c) => c.id !== card.id));
      setSelected(null);
      setTurnTimer(15);
      if (card.value === "reverse") {
        setDirection((d) => (d === "cw" ? "ccw" : "cw"));
      }
      if (hand.length === 1) {
        playSound("win");
        fireWinConfetti();
        pushToast({
          tone: "success",
          title: "You win!",
          description: "Celebration unlocked · rematch ready",
        });
      }
    }, 180);
  };

  const drawCard = () => {
    playSound("shuffle");
    const colors: UnoCard["color"][] = ["red", "blue", "green", "yellow"];
    const values: UnoCard["value"][] = ["1", "3", "6", "8", "skip"];
    const card = makeCard(
      colors[Math.floor(Math.random() * colors.length)],
      values[Math.floor(Math.random() * values.length)],
      Date.now(),
    );
    setHand((h) => [...h, card]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
            Neon Table
          </h1>
          <p className="text-sm text-muted">
            Ranked 1v1v1v1 · stacking on · AFK & reconnect protected
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="cyan">Timer {turnTimer}s</Badge>
          <Badge tone="purple">Dir {direction === "cw" ? "↻" : "↺"}</Badge>
          <Badge tone="success">Anti-cheat live</Badge>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_45%),linear-gradient(180deg,#14141c,#0d0d0d)] p-4 md:p-8 min-h-[560px]">
        <div className="absolute inset-6 rounded-[1.5rem] border border-white/5" />

        {/* Opponents */}
        <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-6">
          <div className="flex justify-center gap-6">
            {opponents.map((op) => (
              <motion.div
                key={op.name}
                className="glass rounded-2xl px-4 py-3 text-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: Math.random() }}
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-cyan text-xs font-bold">
                  {op.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-sm font-medium">{op.name}</p>
                <div className="mt-2 flex justify-center -space-x-3">
                  {Array.from({ length: Math.min(op.cards, 5) }).map((_, i) => (
                    <UnoCardView key={i} faceDown size="sm" className="!h-14 !w-10" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={drawCard}
              className="relative"
              aria-label="Draw pile"
            >
              <UnoCardView faceDown size="lg" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted">
                Draw
              </span>
            </motion.button>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={discard.id}
                initial={{ rotateY: 90, scale: 0.8 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <UnoCardView card={discard} size="lg" className="pulse-glow" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted">Your hand · click to play</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={canUno ? "primary" : "secondary"}
                  glow={canUno}
                  sound="uno"
                  onClick={() => {
                    playSound("uno");
                    pushToast({ title: "UNO!", description: "Button slammed" });
                  }}
                >
                  <Sparkles size={14} /> UNO
                </Button>
                <Button size="sm" variant="secondary" sound="success">
                  <RotateCcw size={14} /> Rematch
                </Button>
                <Button size="sm" variant="ghost">
                  <Mic size={14} /> Voice ready
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {hand.map((card) => (
                <UnoCardView
                  key={card.id}
                  card={card}
                  selected={selected === card.id}
                  onClick={() => playCard(card)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="glass flex items-center gap-3 rounded-2xl p-3">
          <MessageCircle size={18} className="text-cyan" />
          <input
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            placeholder="Match chat..."
          />
          <Button
            size="sm"
            onClick={() => {
              playSound("notify");
              pushToast({ title: "Message sent", description: chat });
            }}
          >
            Send
          </Button>
        </div>
        <div className="glass flex items-center justify-around rounded-2xl p-3 text-xl">
          {["🔥", "😂", "💀", "👑", "⚡"].map((e) => (
            <button
              key={e}
              className="rounded-lg px-2 py-1 transition hover:bg-white/10"
              onClick={() => playSound("click")}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
