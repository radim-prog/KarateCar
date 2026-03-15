import type { ReactNode } from "react";

import { updatedAt } from "../data";
import { SiteNav } from "./site-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-[1400px] min-h-screen">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-[var(--line)] bg-white p-5 lg:flex lg:flex-col">
          <div>
            <div className="text-lg font-bold text-[var(--foreground)]">
              Plán mobility
            </div>
            <div className="mt-0.5 text-sm text-[var(--muted)]">
              SHIN-KYO Rychnov nad Kněžnou
            </div>
          </div>

          <nav className="mt-6 flex-1">
            <SiteNav />
          </nav>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--background)] p-4">
            <div className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide">
              Cíl
            </div>
            <p className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">
              9místné auto do 3-6 měsíců
            </p>
            <a
              href="/podklady"
              className="mt-2 block text-xs font-medium text-[var(--accent)] hover:underline"
            >
              Časová osa projektu
            </a>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Aktualizováno {updatedAt}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Mobile header */}
          <header className="sticky top-0 z-10 border-b border-[var(--line)] bg-white/95 backdrop-blur px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold">Plán mobility</div>
                <div className="text-xs text-[var(--muted)]">SHIN-KYO Rychnov</div>
              </div>
              <div className="text-xs text-[var(--muted)]">{updatedAt}</div>
            </div>
            <div className="mt-3">
              <SiteNav compact />
            </div>
          </header>

          <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
