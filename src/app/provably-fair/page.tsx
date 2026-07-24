"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProvablyFairPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Provably Fair
        </h1>
        <p className="text-sm text-muted">
          Verify server seeds, client seeds, and nonce outcomes
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard hover={false} className="space-y-4">
          <Input id="server" label="Server seed (hashed)" defaultValue="a9f3...c21e" />
          <Input id="client" label="Client seed" defaultValue="neonace-42" />
          <Input id="nonce" label="Nonce" defaultValue="88421" />
          <Button>Verify roll</Button>
        </GlassCard>
        <GlassCard hover={false}>
          <h3 className="font-semibold">How it works</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Server commits to a hashed seed before the round</li>
            <li>2. Your client seed + nonce combine into the result</li>
            <li>3. After reveal, anyone can recompute the outcome</li>
            <li>4. UNO shuffles use the same commit-reveal pipeline</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
