# UnoX

Premium multiplayer UNO + neon casino platform built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Design

- Deep charcoal base (`#0D0D0D`)
- Purple / electric blue / cyan accents
- Glassmorphism, aurora backgrounds, particles
- Smooth page transitions and micro-interactions
- Procedural premium sound effects for key actions

## Crypto wallet fees

| Action     | Fee |
| ---------- | --- |
| Deposit    | 1%  |
| Withdrawal | 2%  |

Supported demo assets: BTC, ETH (ERC20), USDT (ERC20), USDC (ERC20), LTC, SOL.

## Features (frontend demo)

- Auth screens (Email / Google / Discord)
- Profiles, VIP, XP, missions, achievements
- Crypto deposit & withdraw flows with live fee breakdown
- UNO hub, lobbies, animated table, tournaments, history
- Casino suite: coinflip, jackpot, cases, crash, roulette, dice, mines, plinko, towers
- Community, friends, notifications, support, admin shell
- Provably fair + legal pages

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Production note

A real-money launch still needs age verification, licensing/compliance, fraud detection, secure payment processing, hardened auth/session APIs, and responsible-gambling controls beyond this UI demo.
