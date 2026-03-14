"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Pavouk", icon: "1" },
  { href: "/kalkulacka", label: "Kalkulačka", icon: "2" },
  { href: "/outreach", label: "Kontakty", icon: "3" },
  { href: "/dokumenty", label: "Šablony", icon: "4" },
  { href: "/podklady", label: "Zdroje", icon: "5" },
];

type SiteNavProps = {
  compact?: boolean;
};

export function SiteNav({ compact = false }: SiteNavProps) {
  const pathname = usePathname();

  if (compact) {
    return (
      <nav className="flex gap-1.5 overflow-x-auto -mx-1 px-1 pb-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                : "text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--foreground)]"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                active
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--line)] text-[var(--muted)]"
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
