"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Copy, Check } from "lucide-react";
import { CryptoMethodPicker } from "@/components/wallet/crypto-method-picker";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useUserStore } from "@/stores/user-store";
import { useUiStore } from "@/stores/ui-store";
import type { CryptoAsset } from "@/types";
import {
  WALLET_FEES,
  calcDepositFee,
  calcWithdrawFee,
  netDepositCredit,
  netWithdrawPayout,
} from "@/lib/fees";
import { formatCurrency } from "@/lib/utils";
import { playSound } from "@/lib/sounds";

type Mode = "deposit" | "withdraw";
type Step = "method" | "amount";

export function WalletPanel({ initialMode = "deposit" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>("method");
  const [asset, setAsset] = useState<CryptoAsset | null>(null);
  const [amount, setAmount] = useState("100");
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const user = useUserStore((s) => s.user);
  const deposit = useUserStore((s) => s.deposit);
  const withdraw = useUserStore((s) => s.withdraw);
  const transactions = useUserStore((s) => s.transactions);
  const pushToast = useUiStore((s) => s.pushToast);

  const amountNum = Number(amount) || 0;

  const fee = useMemo(
    () =>
      mode === "deposit"
        ? calcDepositFee(amountNum)
        : calcWithdrawFee(amountNum),
    [amountNum, mode],
  );

  const net = useMemo(
    () =>
      mode === "deposit"
        ? netDepositCredit(amountNum)
        : netWithdrawPayout(amountNum),
    [amountNum, mode],
  );

  const depositAddress = useMemo(() => {
    if (!asset) return "";
    const map: Record<string, string> = {
      btc: "bc1qunoxdemo7x9k2m4p8q1r5s0t3v6w9y2z",
      eth: "0xUnoXDemoEthAddress000000000000001",
      usdt: "0xUnoXDemoUsdtErc20Address00000002",
      usdc: "0xUnoXDemoUsdcErc20Address00000003",
      ltc: "ltc1qunoxdemolitecoinaddress0004",
      sol: "UnoXDemoSoLAddress1111111111111112",
    };
    return map[asset.id];
  }, [asset]);

  const onSelectAsset = (next: CryptoAsset) => {
    setAsset(next);
    setStep("amount");
  };

  const onConfirm = () => {
    if (!asset || amountNum <= 0) return;

    if (mode === "deposit") {
      const tx = deposit(amountNum, asset.id);
      playSound("deposit");
      pushToast({
        tone: "success",
        title: "Deposit credited",
        description: `+$${formatCurrency(tx.net)} after ${WALLET_FEES.depositPercent}% fee`,
      });
    } else {
      if (amountNum > user.balance) {
        playSound("error");
        pushToast({
          tone: "error",
          title: "Insufficient balance",
          description: "Reduce the withdrawal amount.",
        });
        return;
      }
      if (!address.trim()) {
        playSound("error");
        pushToast({
          tone: "error",
          title: "Wallet address required",
          description: "Paste your destination crypto address.",
        });
        return;
      }
      const tx = withdraw(amountNum, asset.id);
      if (!tx) return;
      playSound("withdraw");
      pushToast({
        tone: "info",
        title: "Withdrawal submitted",
        description: `Net payout $${formatCurrency(tx.net)} after ${WALLET_FEES.withdrawPercent}% fee`,
      });
    }

    setStep("method");
    setAsset(null);
    setAmount("100");
    setAddress("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <GlassCard gradient padding="lg" hover={false}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-[family-name:var(--font-oxanium)] text-3xl font-bold text-gradient">
              Wallet
            </h1>
            <p className="mt-1 text-sm text-muted">
              Crypto-only funding · transparent fees on every transfer
            </p>
          </div>
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
            {(
              [
                ["deposit", "Deposit", ArrowDownLeft],
                ["withdraw", "Withdraw", ArrowUpRight],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => {
                  setMode(key);
                  setStep("method");
                  setAsset(null);
                  playSound("click");
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  mode === key
                    ? "bg-gradient-to-r from-purple to-cyan text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Stat
            label="Available"
            value={<AnimatedCounter value={user.balance} className="text-xl font-bold" />}
          />
          <Stat
            label="Deposit fee"
            value={`${WALLET_FEES.depositPercent}%`}
            tone="success"
          />
          <Stat
            label="Withdraw fee"
            value={`${WALLET_FEES.withdrawPercent}%`}
            tone="warning"
          />
        </div>

        <AnimatePresence mode="wait">
          {step === "method" ? (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
            >
              <CryptoMethodPicker selected={asset} onSelect={onSelectAsset} />
            </motion.div>
          ) : (
            <motion.div
              key="amount"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-5"
            >
              <button
                onClick={() => {
                  setStep("method");
                  setAsset(null);
                }}
                className="text-sm text-muted hover:text-white"
              >
                ← Change method
              </button>

              {asset && (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                    style={{ background: asset.color }}
                  >
                    {asset.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{asset.name}</p>
                      {asset.networkLabel && (
                        <Badge tone="muted">{asset.networkLabel}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted">
                      ≈ ${formatCurrency(asset.priceUsd)} · min{" "}
                      {mode === "deposit" ? asset.minDeposit : asset.minWithdraw}{" "}
                      {asset.symbol}
                    </p>
                  </div>
                </div>
              )}

              <Input
                id="amount"
                label="Amount (USD)"
                type="number"
                min={1}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {mode === "withdraw" && (
                <Input
                  id="address"
                  label="Destination address"
                  placeholder="Paste your crypto wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}

              {mode === "deposit" && asset && (
                <div className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-muted">
                    Deposit address
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="scrollbar-thin flex-1 overflow-x-auto rounded-xl bg-black/30 px-3 py-2 text-xs text-cyan">
                      {depositAddress}
                    </code>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={async () => {
                        await navigator.clipboard.writeText(depositAddress);
                        setCopied(true);
                        playSound("success");
                        setTimeout(() => setCopied(false), 1500);
                      }}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Send only {asset.symbol}
                    {asset.networkLabel ? ` on ${asset.networkLabel}` : ""}. Wrong
                    network deposits may be lost.
                  </p>
                </div>
              )}

              <div className="gradient-border space-y-2 rounded-2xl p-4">
                <Row
                  label="Gross amount"
                  value={`$${formatCurrency(amountNum)}`}
                />
                <Row
                  label={`${mode === "deposit" ? "Deposit" : "Withdraw"} fee (${
                    mode === "deposit"
                      ? WALLET_FEES.depositPercent
                      : WALLET_FEES.withdrawPercent
                  }%)`}
                  value={`-$${formatCurrency(fee)}`}
                  tone="warning"
                />
                <div className="border-t border-white/10 pt-2">
                  <Row
                    label={mode === "deposit" ? "Credited to wallet" : "You receive"}
                    value={`$${formatCurrency(net)}`}
                    tone="success"
                    strong
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                glow
                sound={mode === "deposit" ? "deposit" : "withdraw"}
                onClick={onConfirm}
                disabled={amountNum <= 0}
              >
                {mode === "deposit" ? "Confirm deposit" : "Request withdrawal"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      <div className="space-y-4">
        <GlassCard hover={false}>
          <h3 className="font-[family-name:var(--font-oxanium)] text-lg font-bold">
            Fee policy
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>• Deposits: flat {WALLET_FEES.depositPercent}% network+platform fee</li>
            <li>• Withdrawals: flat {WALLET_FEES.withdrawPercent}% processing fee</li>
            <li>• Fees are calculated on the USD amount before conversion</li>
            <li>• Pending withdrawals can require KYC for larger amounts</li>
          </ul>
        </GlassCard>

        <GlassCard hover={false} className="max-h-[420px] overflow-hidden">
          <h3 className="mb-3 font-[family-name:var(--font-oxanium)] text-lg font-bold">
            Recent activity
          </h3>
          <div className="scrollbar-thin max-h-[340px] space-y-2 overflow-y-auto pr-1">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium capitalize">{tx.type}</p>
                  <p className="text-xs text-muted">
                    {tx.note ?? tx.status}
                    {tx.fee > 0 ? ` · fee $${formatCurrency(tx.fee)}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      tx.type === "withdraw" || tx.type === "bet"
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {tx.type === "withdraw" || tx.type === "bet" ? "-" : "+"}$
                    {formatCurrency(Math.abs(tx.net))}
                  </p>
                  <Badge
                    tone={
                      tx.status === "completed"
                        ? "success"
                        : tx.status === "pending"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "success" | "warning";
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <div
        className={`mt-1 font-[family-name:var(--font-oxanium)] ${
          tone === "success"
            ? "text-success"
            : tone === "warning"
              ? "text-warning"
              : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
  strong,
}: {
  label: string;
  value: string;
  tone?: "success" | "warning";
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted">{label}</span>
      <span
        className={`${strong ? "text-base font-bold" : "font-medium"} ${
          tone === "success"
            ? "text-success"
            : tone === "warning"
              ? "text-warning"
              : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
