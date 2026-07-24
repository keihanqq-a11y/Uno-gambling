import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "purple",
}: {
  children: React.ReactNode;
  className?: string;
  tone?:
    | "purple"
    | "cyan"
    | "blue"
    | "pink"
    | "success"
    | "warning"
    | "danger"
    | "muted";
}) {
  const tones = {
    purple: "bg-purple/15 text-purple-bright border-purple/30",
    cyan: "bg-cyan/15 text-cyan border-cyan/30",
    blue: "bg-blue/15 text-blue-300 border-blue/30",
    pink: "bg-pink/15 text-pink border-pink/30",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-danger/15 text-danger border-danger/30",
    muted: "bg-white/5 text-muted border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
