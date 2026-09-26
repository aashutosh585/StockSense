"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db/db";
import { loginSchema, registerSchema } from "@/features/auth/schemas/validation";

export type AuthActionState = { message?: string; errors?: Record<string, string[] | undefined> };

const value = (formData: FormData, key: string) => {
  const item = formData.get(key);
  return typeof item === "string" ? item : "";
};

export async function registerAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    loginId: value(formData, "loginId"),
    email: value(formData, "email"),
    password: value(formData, "password"),
    confirmPassword: value(formData, "confirmPassword"),
  });
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Please fix the highlighted fields." };

  const existingEmail = await db.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existingEmail) return { errors: { email: ["An account with this email already exists."] }, message: "Use a different email address or log in." };

  const existingLoginId = await db.user.findUnique({ where: { loginId: parsed.data.loginId }, select: { id: true } });
  if (existingLoginId) return { errors: { loginId: ["An account with this Login ID already exists."] }, message: "Use a different Login ID." };

  await db.user.create({
    data: {
      loginId: parsed.data.loginId,
      email: parsed.data.email,
      passwordHash: await bcrypt.hash(parsed.data.password, 10),
    },
  });
  await signIn("credentials", { loginId: parsed.data.loginId, password: parsed.data.password, redirectTo: "/dashboard" });
  return {};
}

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({ loginId: value(formData, "loginId"), password: value(formData, "password") });
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors, message: "Please fix the highlighted fields." };
  try {
    await signIn("credentials", { loginId: parsed.data.loginId, password: parsed.data.password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) return { message: "Invalid email or password." };
    throw error;
  }
  return {};
}


export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
