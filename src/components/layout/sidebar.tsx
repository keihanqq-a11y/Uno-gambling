"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Boxes,
  Crown,
  Gamepad2,
  Gift,
  HelpCircle,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";

const items = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/uno", label: "UNO Arena", icon: Gamepad2 },
  { href: "/casino", label: "Casino", icon: Sparkles },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/vip", label: "VIP Club", icon: Crown },
  { href: "/missions", label: "Missions", icon: Award },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/affiliates", label: "Affiliates", icon: Users },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/provably-fair", label: "Provably Fair", icon: ShieldCheck },
  { href: "/support", label: "Support", icon: HelpCircle },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
];

export function Sidebar() {
  const open = useUiStore((s) => s.sidebarOpen);
  const setOpen = useUiStore((s) => s.setSidebarOpen);
  const pathname = usePathname();

  return (
    <>
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-white/8 bg-[#0d0d0d]/40 p-4 backdrop-blur-xl lg:block">
        <NavList pathname={pathname} />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[70] w-[280px] border-r border-white/10 bg-[#111118]/95 p-4 backdrop-blur-2xl lg:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-[family-name:var(--font-oxanium)] text-lg font-bold text-gradient">
                  UnoX
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 text-muted hover:bg-white/5 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
              active
                ? "bg-gradient-to-r from-purple/25 to-cyan/10 text-white shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)]"
                : "text-muted hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon size={18} className={active ? "text-cyan" : undefined} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
