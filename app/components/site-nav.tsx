"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Strategie" },
  { href: "/kalkulacka", label: "Kalkulačka" },
  { href: "/outreach", label: "Kontakty" },
  { href: "/dokumenty", label: "Šablony" },
  { href: "/podklady", label: "Podklady" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0.5">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              active
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {item.label}
            {active && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[var(--accent)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
