"use client";

import type { ReactNode } from "react";

import { updatedAt } from "../data";
import { SiteNav } from "./site-nav";
import { useTheme } from "./theme-provider";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { theme, toggle } = useTheme();

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-xs font-black text-white">
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

            {/* Nav + theme toggle */}
            <div className="flex items-center gap-2">
              <SiteNav />

              <button
                type="button"
                onClick={toggle}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--line-strong)] transition"
                title={theme === "dark" ? "Světlé zobrazení" : "Tmavé zobrazení"}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>

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
