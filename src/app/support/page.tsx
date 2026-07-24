"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Support
        </h1>
        <p className="text-sm text-muted">
          Live chat, tickets, FAQ, and Discord integration
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "FAQ",
            desc: "Fees, wallet rails, fair play, and account help",
            href: "/support/faq",
          },
          {
            title: "Tickets",
            desc: "Open a support ticket for wallet or KYC issues",
            href: "/support/tickets",
          },
          {
            title: "Contact",
            desc: "Reach the UnoX team directly",
            href: "/support/contact",
          },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <GlassCard gradient className="h-full">
              <h3 className="font-[family-name:var(--font-oxanium)] text-xl font-bold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
      <GlassCard hover={false} className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium">Discord community</p>
          <p className="text-sm text-muted">Live mods, events, and announcements</p>
        </div>
        <Button variant="secondary">Open Discord</Button>
      </GlassCard>
    </div>
  );
}
