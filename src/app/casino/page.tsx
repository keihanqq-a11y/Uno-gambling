"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const games = [
  { href: "/casino/coinflip", title: "Coinflip", tag: "PvP", desc: "Heads or tails duels" },
  { href: "/casino/jackpot", title: "Jackpot", tag: "Pot", desc: "Shared pot, one winner" },
  { href: "/casino/cases", title: "Cases", tag: "Loot", desc: "Open premium cases" },
  { href: "/casino/crash", title: "Crash", tag: "Live", desc: "Cash out before it crashes" },
  { href: "/casino/roulette", title: "Roulette", tag: "Classic", desc: "Neon wheel spins" },
  { href: "/casino/dice", title: "Dice", tag: "Instant", desc: "Roll under / over" },
  { href: "/casino/mines", title: "Mines", tag: "Grid", desc: "Avoid the bombs" },
  { href: "/casino/plinko", title: "Plinko", tag: "Drop", desc: "Bouncy multiplier paths" },
  { href: "/casino/towers", title: "Towers", tag: "Climb", desc: "Ascend for bigger odds" },
];

export default function CasinoPage() {
  return (
    <div className="space-y-6">
      <section className="gradient-border rounded-[2rem] p-6 md:p-10">
        <Badge tone="pink">Casino Suite</Badge>
        <h1 className="mt-3 font-[family-name:var(--font-oxanium)] text-4xl font-bold text-gradient">
          Neon Casino
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          Provably fair games with polished motion, sound, and leaderboard
          rain events. Daily free case available in Rewards.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {games.map((g, i) => (
          <Link key={g.href} href={g.href}>
            <GlassCard
              gradient
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="h-full"
            >
              <Badge tone="cyan">{g.tag}</Badge>
              <h3 className="mt-3 font-[family-name:var(--font-oxanium)] text-xl font-bold">
                {g.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{g.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
