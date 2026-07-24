"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

export function AnimatedCounter({
  value,
  prefix = "$",
  decimals = 2,
  className,
}: {
  value: number;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => `${prefix}${formatCurrency(v, decimals)}`);
  const [text, setText] = useState(`${prefix}${formatCurrency(value, decimals)}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return (
    <motion.span className={className} layout>
      {text}
    </motion.span>
  );
}
