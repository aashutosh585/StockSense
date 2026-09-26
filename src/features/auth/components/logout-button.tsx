import { LogOut } from "lucide-react";

import { logoutAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="secondary" className={`cursor-pointer ${compact ? "h-10" : ""}`}>
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Logout
      </Button>
    </form>
  );
}
