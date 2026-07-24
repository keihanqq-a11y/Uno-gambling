"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  gradient?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export function GlassCard({
  className,
  children,
  gradient = false,
  hover = true,
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={
        hover
          ? { y: -3, transition: { type: "spring", stiffness: 300, damping: 22 } }
          : undefined
      }
      className={cn(
        "rounded-2xl",
        gradient ? "gradient-border" : "glass",
        paddings[padding],
        hover && "transition-shadow hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
