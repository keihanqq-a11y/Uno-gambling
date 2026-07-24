"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUiStore } from "@/stores/ui-store";
import { setSoundEnabled, playSound } from "@/lib/sounds";
import { useUserStore } from "@/stores/user-store";

export default function SettingsPage() {
  const soundEnabled = useUiStore((s) => s.soundEnabled);
  const setSound = useUiStore((s) => s.setSoundEnabled);
  const user = useUserStore((s) => s.user);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Settings
        </h1>
        <p className="text-sm text-muted">
          Profile, sound, streamer mode, and security
        </p>
      </div>

      <GlassCard hover={false} className="space-y-4">
        <Input id="username" label="Username" defaultValue={user.username} />
        <Input id="email" label="Email" defaultValue={user.email} />
        <Button
          onClick={() => {
            playSound("success");
          }}
        >
          Save profile
        </Button>
      </GlassCard>

      <GlassCard hover={false} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Sound effects</p>
            <p className="text-sm text-muted">UI, cards, wins, wallet actions</p>
          </div>
          <Button
            variant={soundEnabled ? "primary" : "secondary"}
            onClick={() => {
              const next = !soundEnabled;
              setSound(next);
              setSoundEnabled(next);
              if (next) playSound("click");
            }}
          >
            {soundEnabled ? "On" : "Off"}
          </Button>
        </div>
        <div className="flex items-center justify-between border-t border-white/8 pt-4">
          <div>
            <p className="font-medium">Streamer mode</p>
            <p className="text-sm text-muted">Hide balances and private codes</p>
          </div>
          <Button variant="secondary">Enable</Button>
        </div>
      </GlassCard>
    </div>
  );
}
