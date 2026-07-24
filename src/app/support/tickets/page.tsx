"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export default function TicketsPage() {
  const [subject, setSubject] = useState("");
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Support tickets
        </h1>
        <p className="text-sm text-muted">Track deposits, withdrawals, and account issues</p>
      </div>
      <GlassCard hover={false} className="space-y-4">
        <Input
          id="subject"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Withdrawal pending confirmation"
        />
        <label className="block text-xs uppercase tracking-wider text-muted">
          Details
          <textarea
            className="mt-1.5 min-h-32 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-purple/50"
            placeholder="Describe the issue..."
          />
        </label>
        <Button
          onClick={() => {
            playSound("notify");
            pushToast({
              tone: "info",
              title: "Ticket created",
              description: subject || "Support will reply shortly",
            });
            setSubject("");
          }}
        >
          Submit ticket
        </Button>
      </GlassCard>
    </div>
  );
}
