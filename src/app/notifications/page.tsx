"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { MOCK_NOTIFICATIONS } from "@/data/mock";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Notifications
        </h1>
        <p className="text-sm text-muted">Wallet, rewards, friends, and match alerts</p>
      </div>
      <div className="space-y-3">
        {MOCK_NOTIFICATIONS.map((n) => (
          <GlassCard
            key={n.id}
            hover={false}
            className={n.read ? "opacity-70" : "neon-glow"}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{n.title}</p>
                <p className="mt-1 text-sm text-muted">{n.body}</p>
              </div>
              <Badge tone={n.read ? "muted" : "cyan"}>{n.type}</Badge>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
