"use client";

import { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HOUSE_RULES, MOCK_LOBBIES } from "@/data/mock";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export default function UnoLobbyPage() {
  const [invite, setInvite] = useState("");
  const [rules, setRules] = useState<string[]>(["stacking"]);
  const [players, setPlayers] = useState(4);
  const [bet, setBet] = useState(25);
  const pushToast = useUiStore((s) => s.pushToast);

  const toggleRule = (id: string) => {
    playSound("click");
    setRules((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Matchmaking Lobby
        </h1>
        <p className="text-sm text-muted">
          Public queues, private invite codes, custom rules & skill-based MMR
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <GlassCard gradient hover={false}>
          <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
            Create private lobby
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Players
              </span>
              <select
                value={players}
                onChange={(e) => setPlayers(Number(e.target.value))}
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 outline-none"
              >
                {[2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n} className="bg-[#15151d]">
                    {n} players
                  </option>
                ))}
              </select>
            </label>
            <Input
              id="bet"
              label="Bet amount (USD)"
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
            />
          </div>

          <p className="mt-5 text-xs uppercase tracking-wider text-muted">
            House rules
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {HOUSE_RULES.map((rule) => {
              const active = rules.includes(rule.id);
              return (
                <button
                  key={rule.id}
                  onClick={() => toggleRule(rule.id)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    active
                      ? "border-cyan/50 bg-cyan/10 text-white"
                      : "border-white/10 bg-white/5 text-muted hover:text-white"
                  }`}
                >
                  <span className="font-medium">{rule.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              glow
              onClick={() => {
                playSound("success");
                pushToast({
                  tone: "success",
                  title: "Lobby created",
                  description: "Invite code UNOX-7K2M shared",
                });
              }}
            >
              Create lobby
            </Button>
            <Link href="/uno/play">
              <Button variant="secondary">Enter as host</Button>
            </Link>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <h2 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
            Join with code
          </h2>
          <div className="mt-4 flex gap-2">
            <Input
              id="invite"
              placeholder="e.g. UNOX-7K2M"
              value={invite}
              onChange={(e) => setInvite(e.target.value.toUpperCase())}
            />
            <Link href="/uno/play">
              <Button>Join</Button>
            </Link>
          </div>

          <h3 className="mt-8 mb-3 font-semibold">Open public tables</h3>
          <div className="space-y-3">
            {MOCK_LOBBIES.map((lobby) => (
              <div
                key={lobby.id}
                className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{lobby.name}</p>
                    <p className="text-xs text-muted">
                      {lobby.mode} · ${lobby.bet} ·{" "}
                      {lobby.houseRules.join(", ")}
                    </p>
                  </div>
                  <Badge tone="purple">
                    {lobby.players.length}/{lobby.maxPlayers}
                  </Badge>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link href="/uno/play">
                    <Button size="sm">Join match</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
