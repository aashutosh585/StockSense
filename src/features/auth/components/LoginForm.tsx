"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  googleSignInAction,
  loginAction,
  type AuthActionState,
} from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/features/auth/components/google-button";

const initialState: AuthActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="glow" className="w-full h-11 rounded-xl cursor-pointer" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5">
      <form action={formAction} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            className="form-input"
            aria-describedby="email-error"
          />
          {state.errors?.email ? (
            <p id="email-error" className="text-xs text-red-500 font-medium mt-1">
              {state.errors.email[0]}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className="form-input pr-11"
              aria-describedby="password-error"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {state.errors?.password ? (
            <p id="password-error" className="text-xs text-red-500 font-medium mt-1">
              {state.errors.password[0]}
            </p>
          ) : null}
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground select-none cursor-pointer">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-primary accent-primary"
          />
          Remember me
        </label>

        {state.message ? (
          <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400 font-medium">
            {state.message}
          </p>
        ) : null}

        <SubmitButton />
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={googleSignInAction}>
        <GoogleButton />
      </form>
    </div>
  );
}
