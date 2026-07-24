"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Gamepad2,
  Sparkles,
  Trophy,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useUserStore } from "@/stores/user-store";
import { MOCK_LEADERBOARD, MOCK_LOBBIES } from "@/data/mock";
import { WALLET_FEES } from "@/lib/fees";

const features = [
  {
    title: "PvP UNO Arena",
    desc: "Ranked, casual, private lobbies, tournaments & spectator mode.",
    href: "/uno",
    icon: Gamepad2,
  },
  {
    title: "Crypto Wallet",
    desc: `Deposit +${WALLET_FEES.depositPercent}% · Withdraw +${WALLET_FEES.withdrawPercent}% · BTC, ETH, USDT & more.`,
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Casino Suite",
    desc: "Crash, cases, roulette, plinko, mines, towers and rain events.",
    href: "/casino",
    icon: Sparkles,
  },
  {
    title: "VIP & Rewards",
    desc: "Daily cases, XP leveling, missions, achievements and cashback.",
    href: "/rewards",
    icon: Crown,
  },
];

export default function HomePage() {
  const user = useUserStore((s) => s.user);

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[min(78vh,720px)] flex items-end">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 70% 40%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(ellipse 50% 60% at 20% 70%, rgba(34,211,238,0.22), transparent 50%), linear-gradient(160deg, #12121a 0%, #0d0d0d 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-[8%] top-[18%] h-40 w-28 rotate-[-18deg] rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-2xl" />
          <div className="absolute left-[22%] top-[28%] h-40 w-28 rotate-[12deg] rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl" />
          <div className="absolute right-[16%] top-[16%] h-48 w-32 rotate-[8deg] rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 shadow-2xl" />
          <div className="absolute right-[28%] bottom-[22%] h-36 w-24 rotate-[-10deg] rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 shadow-2xl" />
        </div>
        <div className="relative z-10 w-full p-6 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="font-[family-name:var(--font-oxanium)] text-5xl font-extrabold tracking-tight text-gradient md:text-7xl">
              UnoX
            </p>
            <h1 className="mt-3 max-w-xl text-2xl font-semibold text-white md:text-4xl">
              Luxury multiplayer UNO meets neon casino energy.
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
              Immersive cards, crypto wallet rails, VIP progression, and
              buttery-smooth animations — built to feel like a AAA gaming
              destination.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/uno">
                <Button size="lg" glow>
                  <Zap size={18} /> Play UNO
                </Button>
              </Link>
              <Link href="/wallet/deposit">
                <Button size="lg" variant="secondary">
                  <Wallet size={18} /> Deposit crypto
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Balance", value: <AnimatedCounter value={user.balance} /> },
          { label: "Level", value: user.level },
          { label: "VIP", value: user.vip },
          { label: "Wins", value: user.wins },
        ].map((stat) => (
          <GlassCard key={stat.label} className="text-center" padding="sm">
            <p className="text-xs uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-oxanium)] text-2xl font-bold">
              {stat.value}
            </p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Link key={f.href} href={f.href}>
              <GlassCard
                gradient
                className="h-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple/20 text-cyan">
                  <Icon size={20} />
                </div>
                <h3 className="font-[family-name:var(--font-oxanium)] text-lg font-bold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{f.desc}</p>
              </GlassCard>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
              Live lobbies
            </h2>
            <Link href="/uno/lobby" className="text-sm text-cyan hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_LOBBIES.map((lobby) => (
              <div
                key={lobby.id}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] p-3"
              >
                <div>
                  <p className="font-medium">{lobby.name}</p>
                  <p className="text-xs text-muted">
                    {lobby.mode} · {lobby.players.length}/{lobby.maxPlayers} · $
                    {lobby.bet} bet
                  </p>
                </div>
                <Badge tone={lobby.status === "waiting" ? "success" : "warning"}>
                  {lobby.status}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
              Top earners
            </h2>
            <Trophy size={18} className="text-warning" />
          </div>
          <div className="space-y-3">
            {MOCK_LEADERBOARD.slice(0, 5).map((row) => (
              <div
                key={row.rank}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 font-[family-name:var(--font-oxanium)] text-sm font-bold text-cyan">
                  #{row.rank}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple/70 to-cyan/60 text-xs font-bold">
                  {row.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{row.username}</p>
                  <p className="text-xs text-muted">
                    {row.vip} · Lv {row.level}
                  </p>
                </div>
                <AnimatedCounter
                  value={row.value}
                  className="text-sm font-semibold text-success"
                />
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
