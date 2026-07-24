"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export default function ContactPage() {
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Contact
        </h1>
        <p className="text-sm text-muted">Partnerships, press, and general inquiries</p>
      </div>
      <GlassCard hover={false} className="space-y-4">
        <Input id="name" label="Name" />
        <Input id="email" label="Email" type="email" />
        <label className="block text-xs uppercase tracking-wider text-muted">
          Message
          <textarea className="mt-1.5 min-h-32 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-purple/50" />
        </label>
        <Button
          onClick={() => {
            playSound("success");
            pushToast({ tone: "success", title: "Message sent" });
          }}
        >
          Send message
        </Button>
      </GlassCard>
    </div>
  );
}
