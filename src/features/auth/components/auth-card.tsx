import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerHref: string;
  footerLinkText: string;
};

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerHref,
  footerLinkText,
}: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="ambient-grid" />
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-accent/15 blur-[120px]" />

      <section className="glass-panel w-full max-w-md p-6 sm:p-8 relative z-10 animate-fade-in">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8 space-y-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-primary"
          >
            StockSense
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            {title}
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link
            href={footerHref}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
}
