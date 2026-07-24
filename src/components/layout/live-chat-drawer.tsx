"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { useState } from "react";
import { useUiStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/sounds";

const seed = [
  { user: "Aurora", text: "Who's queuing ranked 1v1?", tone: "text-pink" },
  { user: "Blitz", text: "Jackpot about to pop 👀", tone: "text-cyan" },
  { user: "VoltQueen", text: "gg that stack was filthy", tone: "text-purple-bright" },
];

export function LiveChatDrawer() {
  const open = useUiStore((s) => s.chatOpen);
  const setOpen = useUiStore((s) => s.setChatOpen);
  const [messages, setMessages] = useState(seed);
  const [text, setText] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[70] flex w-[min(100vw,380px)] flex-col border-l border-white/10 bg-[#111118]/95 backdrop-blur-2xl"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-white/8 p-4">
              <div>
                <h3 className="font-[family-name:var(--font-oxanium)] text-lg font-bold">
                  Global Chat
                </h3>
                <p className="text-xs text-muted">Live · emoji & GIF ready</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-muted hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={`${m.user}-${i}`} className="glass rounded-xl p-3">
                  <p className={`text-xs font-semibold ${m.tone}`}>{m.user}</p>
                  <p className="mt-1 text-sm text-white/90">{m.text}</p>
                </div>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-white/8 p-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!text.trim()) return;
                setMessages((prev) => [
                  ...prev,
                  { user: "You", text, tone: "text-cyan" },
                ]);
                setText("");
                playSound("notify");
              }}
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Say something..."
                className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-purple/50"
              />
              <Button size="icon" type="submit" aria-label="Send">
                <Send size={16} />
              </Button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
