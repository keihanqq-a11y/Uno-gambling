"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const items = [
  { name: "Neon Card Back", rarity: "Epic", type: "Cosmetic" },
  { name: "Aurora Emote Pack", rarity: "Rare", type: "Emotes" },
  { name: "VIP Case Key", rarity: "Legendary", type: "Consumable" },
  { name: "Clan Banner", rarity: "Rare", type: "Clan" },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          Inventory
        </h1>
        <p className="text-sm text-muted">Cosmetics, keys, emotes, and clan items</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <GlassCard key={item.name} gradient>
            <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-purple/30 to-cyan/20" />
            <h3 className="font-semibold">{item.name}</h3>
            <div className="mt-2 flex gap-2">
              <Badge tone="purple">{item.rarity}</Badge>
              <Badge tone="muted">{item.type}</Badge>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
