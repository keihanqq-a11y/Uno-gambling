import { GlassCard } from "@/components/ui/glass-card";
import { WALLET_FEES } from "@/lib/fees";

export default function TermsPage() {
  return (
    <GlassCard hover={false} padding="lg" className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
        Terms of Service
      </h1>
      <p className="text-sm text-muted">
        UnoX is provided as a premium gaming platform demo. By using the service
        you agree to account security requirements, fair play rules, and wallet
        fee disclosures. Crypto deposits include a {WALLET_FEES.depositPercent}%
        fee and withdrawals include a {WALLET_FEES.withdrawPercent}% fee.
      </p>
      <p className="text-sm text-muted">
        Real-money launches require age verification, jurisdictional compliance,
        fraud detection, licensed payment processing, and responsible gambling
        controls.
      </p>
    </GlassCard>
  );
}
