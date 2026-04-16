"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/operativa", label: "Přehled" },
  { href: "/operativa/programy", label: "Programy" },
  { href: "/operativa/kontakty", label: "Kontakty" },
  { href: "/operativa/zadani", label: "Zadání" },
  { href: "/operativa/kalendar", label: "Kalendář" },
];

export function OperativaNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 h-11 overflow-x-auto">
      <span
        className="text-xs font-bold uppercase tracking-widest mr-3 shrink-0"
        style={{ color: "var(--accent)" }}
      >
        Operativa
      </span>
      {navItems.map((item) => {
        const active =
          item.href === "/operativa"
            ? pathname === "/operativa"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors shrink-0"
            style={{ color: active ? "var(--accent)" : "var(--muted)" }}
          >
            {item.label}
            {active && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
