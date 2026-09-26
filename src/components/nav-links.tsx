"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/operations", label: "Operations" },
  { href: "/products", label: "Products" },
  { href: "/history", label: "Move History" },
  { href: "/settings", label: "Settings" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center space-x-1 text-sm font-medium">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-3 py-2 rounded-lg transition-colors font-semibold ${
              isActive
                ? "text-primary"
                : "text-foreground/70 hover:text-foreground hover:bg-primary/10"
            }`}
          >
            {link.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
