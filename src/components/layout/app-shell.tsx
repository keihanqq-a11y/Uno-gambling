"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { LiveChatDrawer } from "@/components/layout/live-chat-drawer";
import { AuroraBackground } from "@/components/effects/aurora-background";
import { ParticleField } from "@/components/effects/particle-field";
import { PageTransition } from "@/components/effects/page-transition";
import { ToastViewport } from "@/components/ui/toast";
import { setSoundEnabled } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const soundEnabled = useUiStore((s) => s.soundEnabled);

  useEffect(() => {
    setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ParticleField />
      <Navbar />
      <div className="mx-auto flex max-w-[1500px]">
        <Sidebar />
        <main className="min-h-[calc(100vh-4rem)] flex-1 px-4 py-6 md:px-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <LiveChatDrawer />
      <ToastViewport />
      <footer className="border-t border-white/8 px-4 py-6 text-center text-xs text-muted md:px-6">
        <p>
          UnoX · Demo entertainment platform. Crypto deposits +1% fee · Withdrawals
          +2% fee. Play responsibly · 18+
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <a href="/legal/terms" className="hover:text-white">
            Terms
          </a>
          <a href="/legal/privacy" className="hover:text-white">
            Privacy
          </a>
          <a href="/legal/responsible-gambling" className="hover:text-white">
            Responsible Gambling
          </a>
          <a href="/provably-fair" className="hover:text-white">
            Provably Fair
          </a>
        </div>
      </footer>
    </div>
  );
}
