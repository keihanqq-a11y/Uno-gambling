import { GlassCard } from "@/components/ui/glass-card";

export default function ResponsibleGamblingPage() {
  return (
    <GlassCard hover={false} padding="lg" className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
        Responsible Gambling
      </h1>
      <p className="text-sm text-muted">
        UnoX is for adults 18+. Set deposit limits, take breaks, and never chase
        losses. If gambling stops being fun, seek help from local support
        organizations and use self-exclusion tools.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
        <li>Optional KYC and stronger checks for large withdrawals</li>
        <li>Session reminders and cool-down controls (production-ready hooks)</li>
        <li>Clear fee disclosure on every crypto transfer</li>
      </ul>
    </GlassCard>
  );
}
