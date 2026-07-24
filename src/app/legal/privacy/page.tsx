import { GlassCard } from "@/components/ui/glass-card";

export default function PrivacyPage() {
  return (
    <GlassCard hover={false} padding="lg" className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted">
        We collect account, session, and transactional data required to operate
        matchmaking, wallet rails, and fraud prevention. Data is encrypted in
        transit. KYC documents are processed only when verification is requested
        or required for withdrawals.
      </p>
    </GlassCard>
  );
}
