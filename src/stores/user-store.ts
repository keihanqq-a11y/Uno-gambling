"use client";

import { create } from "zustand";
import { CURRENT_USER, MOCK_TRANSACTIONS } from "@/data/mock";
import {
  calcDepositFee,
  calcWithdrawFee,
  netDepositCredit,
  netWithdrawPayout,
} from "@/lib/fees";
import type { CryptoAssetId, Transaction, UserProfile } from "@/types";

interface UserState {
  user: UserProfile;
  transactions: Transaction[];
  isAuthenticated: boolean;
  soundIn: (username?: string) => void;
  signOut: () => void;
  deposit: (amountUsd: number, asset: CryptoAssetId) => Transaction;
  withdraw: (amountUsd: number, asset: CryptoAssetId) => Transaction | null;
  adjustBalance: (delta: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: CURRENT_USER,
  transactions: MOCK_TRANSACTIONS,
  isAuthenticated: true,

  signIn: (username = "NeonAce") =>
    set({
      isAuthenticated: true,
      user: { ...CURRENT_USER, username },
    }),

  signOut: () => set({ isAuthenticated: false }),

  deposit: (amountUsd, asset) => {
    const fee = calcDepositFee(amountUsd);
    const net = netDepositCredit(amountUsd);
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      type: "deposit",
      amount: amountUsd,
      fee,
      net,
      asset,
      status: "completed",
      createdAt: new Date().toISOString(),
      note: `Crypto deposit (${asset.toUpperCase()}) · 1% fee`,
    };

    set((state) => ({
      user: { ...state.user, balance: state.user.balance + net },
      transactions: [tx, ...state.transactions],
    }));

    return tx;
  },

  withdraw: (amountUsd, asset) => {
    const { user } = get();
    if (amountUsd > user.balance || amountUsd <= 0) return null;

    const fee = calcWithdrawFee(amountUsd);
    const net = netWithdrawPayout(amountUsd);
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      type: "withdraw",
      amount: amountUsd,
      fee,
      net,
      asset,
      status: "pending",
      createdAt: new Date().toISOString(),
      note: `Crypto withdraw (${asset.toUpperCase()}) · 2% fee`,
    };

    set((state) => ({
      user: { ...state.user, balance: state.user.balance - amountUsd },
      transactions: [tx, ...state.transactions],
    }));

    return tx;
  },

  adjustBalance: (delta) =>
    set((state) => ({
      user: { ...state.user, balance: Math.max(0, state.user.balance + delta) },
    })),
}));
