"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const toneStyles = {
  default: "border-white/10",
  success: "border-success/40",
  error: "border-danger/40",
  warning: "border-warning/40",
  info: "border-cyan/40",
};

export function ToastViewport() {
  const toasts = useUiStore((s) => s.toasts);
  const dismiss = useUiStore((s) => s.dismissToast);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(92vw,360px)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            tone={toast.tone ?? "default"}
            onDismiss={() => dismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  id,
  title,
  description,
  tone,
  onDismiss,
}: {
  id: string;
  title: string;
  description?: string;
  tone: keyof typeof toneStyles;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4200);
    return () => clearTimeout(t);
  }, [id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      className={cn(
        "pointer-events-auto glass-strong rounded-2xl border p-4 shadow-2xl",
        toneStyles[tone],
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && (
            <p className="mt-1 text-xs text-muted">{description}</p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="rounded-lg p-1 text-muted hover:bg-white/5 hover:text-white"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}
