"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export default function KycPage() {
  const verified = useUserStore((s) => s.user.kycVerified);
  const pushToast = useUiStore((s) => s.pushToast);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
          KYC Verification
        </h1>
        <p className="text-sm text-muted">
          Optional for most play · may be required for larger withdrawals
        </p>
      </div>
      <GlassCard hover={false} className="space-y-4">
        <Badge tone={verified ? "success" : "warning"}>
          {verified ? "Verified" : "Not verified"}
        </Badge>
        <Input id="legal" label="Legal name" />
        <Input id="dob" label="Date of birth" type="date" />
        <Input id="country" label="Country" placeholder="United States" />
        <Button
          onClick={() => {
            playSound("success");
            pushToast({
              tone: "info",
              title: "KYC submitted",
              description: "Documents queued for review",
            });
          }}
        >
          Submit for review
        </Button>
      </GlassCard>
    </div>
  );
}
