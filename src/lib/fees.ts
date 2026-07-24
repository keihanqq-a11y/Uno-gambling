/** Platform fee configuration for crypto wallet flows */
export const WALLET_FEES = {
  depositPercent: 1,
  withdrawPercent: 2,
} as const;

export function calcDepositFee(amount: number): number {
  return Number(((amount * WALLET_FEES.depositPercent) / 100).toFixed(8));
}

export function calcWithdrawFee(amount: number): number {
  return Number(((amount * WALLET_FEES.withdrawPercent) / 100).toFixed(8));
}

/** Net credited to wallet after deposit fee */
export function netDepositCredit(amount: number): number {
  return Number((amount - calcDepositFee(amount)).toFixed(8));
}

/** Net sent to user after withdraw fee */
export function netWithdrawPayout(amount: number): number {
  return Number((amount - calcWithdrawFee(amount)).toFixed(8));
}
