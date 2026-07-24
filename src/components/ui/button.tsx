"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/sounds";
import { useUiStore } from "@/stores/ui-store";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success" | "outline";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  sound?: "click" | "success" | "deposit" | "withdraw" | "coin" | "none";
  glow?: boolean;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-purple via-blue to-cyan text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:brightness-110",
  secondary:
    "bg-white/8 text-white border border-white/10 hover:bg-white/12 hover:border-purple/40",
  ghost: "bg-transparent text-muted hover:text-white hover:bg-white/5",
  danger:
    "bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25",
  success:
    "bg-success/15 text-success border border-success/30 hover:bg-success/25",
  outline:
    "bg-transparent border border-purple/40 text-white hover:bg-purple/15 hover:border-cyan/50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-7 text-base rounded-2xl",
  icon: "h-10 w-10 rounded-xl",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  sound = "click",
  glow = false,
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const soundEnabled = useUiStore((s) => s.soundEnabled);

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium transition-colors overflow-hidden disabled:opacity-45 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        glow && "neon-glow",
        className,
      )}
      disabled={disabled}
      onClick={(e) => {
        if (soundEnabled && sound !== "none") playSound(sound);
        onClick?.(e);
      }}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.18),transparent_40%)]" />
      {children}
    </motion.button>
  );
}
