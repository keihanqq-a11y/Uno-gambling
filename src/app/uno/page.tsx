"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Lock, Swords, Trophy, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_LOBBIES } from "@/data/mock";

const modes = [
  { title: "1v1", players: 2, desc: "Pure duel intensity" },
  { title: "1v1v1", players: 3, desc: "Triangular chaos" },
  { title: "1v1v1v1", players: 4, desc: "Classic table" },
  { title: "1v1v1v1v1", players: 5, desc: "High variance" },
  { title: "1v1v1v1v1v1", players: 6, desc: "Full lobby mayhem" },
];

export default function UnoHubPage() {
  return (
    <div className="space-y-8">
      <section className="gradient-border overflow-hidden rounded-[2rem] p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge tone="cyan">Multiplayer · Ranked · Private · Tournaments</Badge>
          <h1 className="mt-4 font-[family-name:var(--font-oxanium)] text-4xl font-bold text-gradient md:text-5xl">
            UNO Arena
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Skill-based matchmaking, animated dealing, house rules, spectator
            mode, rematch, reconnect, AFK detection, and anti-cheat ready
            architecture.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/uno/lobby">
              <Button size="lg" glow>
                <Swords size={18} /> Quick match
              </Button>
            </Link>
            <Link href="/uno/play">
              <Button size="lg" variant="secondary">
                Jump into demo table
              </Button>
            </Link>
            <Link href="/uno/tournaments">
              <Button size="lg" variant="outline">
                <Trophy size={18} /> Tournaments
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {modes.map((m, i) => (
          <GlassCard
            key={m.title}
            gradient
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Users size={18} className="text-cyan" />
            <h3 className="mt-3 font-[family-name:var(--font-oxanium)] text-xl font-bold">
              {m.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{m.desc}</p>
            <p className="mt-3 text-xs text-purple-bright">
              {m.players} players
            </p>
          </GlassCard>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
              Public lobbies
            </h2>
            <Link href="/uno/lobby" className="text-sm text-cyan">
              Browse
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
                    {lobby.bet}
                  </p>
                </div>
                <Link href="/uno/play">
                  <Button size="sm">Join</Button>
                </Link>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-4">
          {[
            {
              title: "Private lobby",
              desc: "Create invite codes and custom house rules",
              icon: Lock,
              href: "/uno/lobby",
            },
            {
              title: "Spectator mode",
              desc: "Watch live matches with delayed reactions",
              icon: Eye,
              href: "/uno/play",
            },
            {
              title: "Match history",
              desc: "Replays, reconnect logs, and ranked deltas",
              icon: Trophy,
              href: "/uno/history",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}>
                <GlassCard className="flex items-start gap-4">
                  <div className="rounded-xl bg-purple/20 p-3 text-cyan">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
