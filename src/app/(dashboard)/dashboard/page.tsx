import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { LogoutButton } from "@/features/auth/components/logout-button";
import Link from "next/link";
import { User, Shield, Calendar, ArrowLeft } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      accounts: {
        select: { provider: true },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-12 relative overflow-hidden">
      <div className="ambient-grid" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-accent/10 blur-[130px]" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        {/* Header bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <LogoutButton />
        </div>

        {/* Welcome Banner */}
        <div className="glass-panel p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div className="flex items-center gap-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary">
                  <User className="h-8 w-8" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-tight font-heading">
                  Welcome, {user.name || "User"}!
                </h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Authenticated
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 space-y-1">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-primary" />
                Role
              </span>
              <p className="text-sm font-bold capitalize">{user.role}</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 space-y-1">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Member Since
              </span>
              <p className="text-sm font-bold">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Login Provider
              </span>
              <p className="text-sm font-bold capitalize">
                {user.accounts.length > 0
                  ? user.accounts.map((a) => a.provider).join(", ")
                  : "Email & Password"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">
              Authentication Status:
            </p>
            <p>
              Your session is securely encrypted via JWT with NextAuth v5 and
              synced with PostgreSQL on Neon.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
