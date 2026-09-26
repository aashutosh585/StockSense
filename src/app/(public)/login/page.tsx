import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Log in with your email and password, or continue with Google."
      footerText="New to StockSense?"
      footerHref="/register"
      footerLinkText="Create an account"
    >
      <LoginForm />
    </AuthCard>
  );
}
