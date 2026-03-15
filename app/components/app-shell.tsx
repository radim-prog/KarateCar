import type { ReactNode } from "react";

import { updatedAt } from "../data";
import { SiteNav } from "./site-nav";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-black text-[var(--background)]">
                SK
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold tracking-tight">
                  SHIN-KYO
                </div>
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider">
                  Plán mobility
                </div>
              </div>
            </div>

            {/* Nav */}
            <SiteNav />

            {/* Meta */}
            <div className="hidden md:flex items-center gap-3 text-[10px] text-[var(--muted)]">
              <span>{updatedAt}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
