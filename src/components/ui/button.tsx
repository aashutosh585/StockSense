import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "glow" | "glow-outline";
};

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline-primary",
  secondary:
    "border border-border bg-secondary text-secondary-foreground hover:bg-muted focus-visible:outline-ring",
  ghost:
    "text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-ring",
  glow:
    "glow-button font-bold shadow-lg hover:shadow-xl focus-visible:outline-primary",
  "glow-outline":
    "border border-primary/50 bg-transparent text-primary font-bold hover:bg-primary/10 hover:border-primary/80 transition-all duration-300 focus-visible:outline-primary",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
