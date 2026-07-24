export type OnlineStatus = "online" | "away" | "in-game" | "offline";

export type VipTier =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"
  | "Legend";

export type TransactionType =
  | "deposit"
  | "withdraw"
  | "bet"
  | "win"
  | "reward"
  | "promo"
  | "affiliate"
  | "refund";

export type TransactionStatus = "pending" | "completed" | "failed" | "cancelled";

export type CryptoNetwork =
  | "BTC"
  | "ETH"
  | "ERC20"
  | "LTC"
  | "SOL"
  | "TRC20"
  | "BEP20";

export type CryptoAssetId =
  | "btc"
  | "eth"
  | "usdt"
  | "usdc"
  | "ltc"
  | "sol";

export interface CryptoAsset {
  id: CryptoAssetId;
  name: string;
  symbol: string;
  network?: CryptoNetwork;
  networkLabel?: string;
  priceUsd: number;
  icon: string;
  color: string;
  minDeposit: number;
  minWithdraw: number;
  confirmations: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  balance: number;
  xp: number;
  level: number;
  vip: VipTier;
  referralCode: string;
  friends: number;
  wins: number;
  losses: number;
  totalWagered: number;
  kycVerified: boolean;
  status: OnlineStatus;
  joinedAt: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  fee: number;
  net: number;
  asset?: CryptoAssetId;
  status: TransactionStatus;
  createdAt: string;
  note?: string;
}

export type UnoMode = "casual" | "ranked" | "private" | "tournament";
export type UnoPlayerCount = 2 | 3 | 4 | 5 | 6;

export type CardColor = "red" | "yellow" | "green" | "blue" | "wild";
export type CardValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "skip"
  | "reverse"
  | "draw2"
  | "wild"
  | "wild4";

export interface UnoCard {
  id: string;
  color: CardColor;
  value: CardValue;
}

export interface LobbyPlayer {
  id: string;
  username: string;
  avatar: string;
  ready: boolean;
  vip: VipTier;
  level: number;
}

export interface UnoLobby {
  id: string;
  name: string;
  mode: UnoMode;
  players: LobbyPlayer[];
  maxPlayers: UnoPlayerCount;
  bet: number;
  houseRules: string[];
  inviteCode?: string;
  isPublic: boolean;
  status: "waiting" | "starting" | "in-progress";
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "reward" | "friend" | "game" | "wallet" | "system";
  read: boolean;
  createdAt: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  xp: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  value: number;
  vip: VipTier;
  level: number;
}
