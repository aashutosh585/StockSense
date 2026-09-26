import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 relative">
      <div className="ambient-grid" />

      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-[130px]" />

      <div className="glass-panel w-full max-w-lg p-8 sm:p-10 text-center relative z-10 space-y-6">
        <div className="space-y-2">
          <span className="inline-flex items-center text-xs font-bold uppercase tracking-[0.25em] text-primary">
            StockSense
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Smart Market Intelligence
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Secure authentication platform powered by NextAuth v5 & PostgreSQL.
          </p>
        </div>

        {session?.user ? (
          <div className="space-y-4 pt-2">
            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-left space-y-1">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Signed in as
              </p>
              <p className="text-sm font-bold text-foreground">
                {session.user.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {session.user.email}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
              >
                Go to Dashboard
              </Link>
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:bg-muted transition"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
