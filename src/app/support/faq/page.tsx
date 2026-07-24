"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { WALLET_FEES } from "@/lib/fees";

const faqs = [
  {
    q: "What crypto can I deposit?",
    a: "Bitcoin, Ethereum (ERC20), USDT (ERC20), USDC (ERC20), Litecoin, and Solana.",
  },
  {
    q: "What are the wallet fees?",
    a: `Deposits incur a ${WALLET_FEES.depositPercent}% fee. Withdrawals incur a ${WALLET_FEES.withdrawPercent}% fee. Fees are shown before you confirm.`,
  },
  {
    q: "Is KYC required?",
    a: "KYC is optional for smaller withdrawals and may be required for larger cashouts or risk reviews.",
  },
  {
    q: "Are games provably fair?",
    a: "Yes — seeds and verification tooling are available on the Provably Fair page.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          FAQ
        </h1>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <GlassCard key={f.q} hover={false}>
            <h3 className="font-semibold">{f.q}</h3>
            <p className="mt-2 text-sm text-muted">{f.a}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
