import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create your account"
      description="Use a strong password or continue securely with Google."
      footerText="Already have an account?"
      footerHref="/login"
      footerLinkText="Log in"
    >
      <RegisterForm />
    </AuthCard>
  );
}
