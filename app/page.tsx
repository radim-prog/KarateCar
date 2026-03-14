"use client";

import Link from "next/link";

import { checklistGroups } from "./data";
import { ProgressChecklist } from "./components/progress-checklist";
import { TreeStateProvider } from "./components/tree-state-provider";
import { BracketView } from "./components/decision-tree/bracket-view";
import { TreeProgress } from "./components/decision-tree/tree-progress";
import { TreeSummary } from "./components/decision-tree/tree-summary";

function SpiderPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hero */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Jak získat auto pro oddíl
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
          Začněte nejlepší variantou vlevo. Když řeknou NE, otevře se další
          kolo alternativ. Klikněte na kartu, zvolte ANO / NE / PODMÍNKA.
          Vyřazené cesty zešednou, živé zůstanou.
        </p>
      </div>

      {/* Progress */}
      <TreeProgress />

      {/* THE BRACKET */}
      <BracketView />

      {/* Summary */}
      <TreeSummary />

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/kalkulacka"
          className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition"
        >
          Kalkulačka reálných aut
        </Link>
        <Link
          href="/outreach"
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)] transition"
        >
          Kontakty a oslovení
        </Link>
        <Link
          href="/dokumenty"
          className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold hover:border-[var(--accent)] transition"
        >
          Hotové šablony
        </Link>
      </div>

      {/* Checklist */}
      <ProgressChecklist groups={checklistGroups} />
    </div>
  );
}

export default function Home() {
  return (
    <TreeStateProvider>
      <SpiderPage />
    </TreeStateProvider>
  );
}
