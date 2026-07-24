"use client";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export function Input({ className, label, hint, id, ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-1.5" htmlFor={id}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
      )}
      <input
        id={id}
        className={cn(
          "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-purple/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)]",
          className,
        )}
        {...props}
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}
