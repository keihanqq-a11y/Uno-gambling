"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  MessageSquare,
  Volume2,
  VolumeX,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import { useUiStore } from "@/stores/ui-store";
import { setSoundEnabled, playSound } from "@/lib/sounds";
import { MOCK_NOTIFICATIONS } from "@/data/mock";

const links = [
  { href: "/uno", label: "UNO" },
  { href: "/casino", label: "Casino" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Ranks" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const soundEnabled = useUiStore((s) => s.soundEnabled);
  const setSound = useUiStore((s) => s.setSoundEnabled);
  const setSidebar = useUiStore((s) => s.setSidebarOpen);
  const setChat = useUiStore((s) => s.setChatOpen);
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0d0d0d]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-4 md:px-6">
        <button
          className="rounded-xl p-2 text-muted hover:bg-white/5 hover:text-white lg:hidden"
          onClick={() => setSidebar(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Link href="/" className="group flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple via-blue to-cyan font-[family-name:var(--font-oxanium)] text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition group-hover:scale-105">
            UX
          </span>
          <span className="font-[family-name:var(--font-oxanium)] text-xl font-bold tracking-wide text-gradient">
            UnoX
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => soundEnabled && playSound("hover")}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/8 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)]"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/wallet">
            <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
              <Wallet size={16} className="text-cyan" />
              <AnimatedCounter
                value={user.balance}
                className="font-[family-name:var(--font-oxanium)] text-sm font-semibold text-white"
              />
            </div>
          </Link>

          <Button
            size="icon"
            variant="ghost"
            sound="none"
            onClick={() => {
              const next = !soundEnabled;
              setSound(next);
              setSoundEnabled(next);
              if (next) playSound("click");
            }}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setChat(true)}
            aria-label="Open chat"
          >
            <MessageSquare size={18} />
          </Button>

          <Link href="/notifications" className="relative">
            <Button size="icon" variant="ghost" aria-label="Notifications">
              <Bell size={18} />
            </Button>
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple px-1 text-[10px] font-bold">
                {unread}
              </span>
            )}
          </Link>

          <Link href="/profile" className="ml-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple/80 to-cyan/70 text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.25)]">
              {user.avatar}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
