"use client";

import { motion } from "framer-motion";
import { CRYPTO_ASSETS } from "@/data/crypto";
import type { CryptoAsset } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { playSound } from "@/lib/sounds";

export function CryptoMethodPicker({
  selected,
  onSelect,
}: {
  selected?: CryptoAsset | null;
  onSelect: (asset: CryptoAsset) => void;
}) {
  return (
    <div>
      <h2 className="mb-1 text-center font-[family-name:var(--font-oxanium)] text-2xl font-bold text-white md:text-3xl">
        Select your method
      </h2>
      <p className="mb-8 text-center text-sm text-muted">
        Instant crypto rails · Deposit fee 1% · Withdraw fee 2%
      </p>

      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted">
        CRYPTO
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CRYPTO_ASSETS.map((asset, i) => {
          const active = selected?.id === asset.id;
          return (
            <motion.button
              key={asset.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                playSound("click");
                onSelect(asset);
              }}
              className={cn(
                "group flex items-center gap-3 rounded-2xl border bg-[#15151d]/90 p-4 text-left transition",
                active
                  ? "border-purple/60 shadow-[0_0_28px_rgba(139,92,246,0.25)]"
                  : "border-white/8 hover:border-white/20 hover:bg-[#1a1a24]",
              )}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${asset.color}, ${asset.color}99)`,
                  boxShadow: `0 0 18px ${asset.color}55`,
                }}
              >
                {asset.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white">{asset.name}</span>
                  {asset.networkLabel && (
                    <Badge tone="muted" className="uppercase tracking-wide">
                      {asset.networkLabel}
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  ~ ${formatCurrency(asset.priceUsd)}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted">
          CARD / BANK
        </p>
        <div className="glass rounded-2xl border border-dashed border-white/15 p-5 text-sm text-muted">
          Card & bank rails coming soon. Crypto is the primary funding method on
          UnoX.
        </div>
      </div>
    </div>
  );
}
