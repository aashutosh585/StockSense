"use client";

type PasswordStrengthProps = {
  password: string;
};

function getScore(password: string) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const score = getScore(password);
  const label = score <= 2 ? "Weak" : score <= 4 ? "Medium" : "Strong";
  const width = password.length === 0 ? "0%" : `${(score / 5) * 100}%`;
  const color =
    score <= 2
      ? "bg-red-500"
      : score <= 4
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="space-y-2" aria-live="polite">
      <div className="h-2 rounded-full bg-secondary">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width }}
        />
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        Password strength: {password.length === 0 ? "Start typing" : label}
      </p>
    </div>
  );
}
