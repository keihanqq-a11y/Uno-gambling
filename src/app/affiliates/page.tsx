"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";

export default function AffiliatesPage() {
  const code = useUserStore((s) => s.user.referralCode);
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Affiliate Dashboard
        </h1>
        <p className="text-sm text-muted">
          Earn from referrals · track clicks, signups, and wager share
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Clicks", "1,284"],
          ["Signups", "96"],
          ["Active", "41"],
          ["Earnings", "$1,420"],
        ].map(([label, value]) => (
          <GlassCard key={label} padding="sm" className="text-center">
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-2 font-[family-name:var(--font-oxanium)] text-2xl font-bold">
              {value}
            </p>
          </GlassCard>
        ))}
      </div>

      <GlassCard gradient hover={false}>
        <Badge tone="cyan">Your code</Badge>
        <p className="mt-3 font-[family-name:var(--font-oxanium)] text-3xl font-bold">
          {code}
        </p>
        <p className="mt-1 text-sm text-muted">
          https://unox.gg/r/{code}
        </p>
        <Button
          className="mt-4"
          onClick={async () => {
            await navigator.clipboard.writeText(`https://unox.gg/r/${code}`);
            setCopied(true);
            playSound("success");
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "Copied" : "Copy referral link"}
        </Button>
      </GlassCard>
    </div>
  );
}
