"use client";

import Link from "next/link";

import { TreeStateProvider } from "./components/tree-state-provider";
import { BracketView } from "./components/decision-tree/bracket-view";
import { TreeProgress } from "./components/decision-tree/tree-progress";
import { TreeSummary } from "./components/decision-tree/tree-summary";
import { PlanOverview } from "./components/plan-overview";

function SpiderPage() {
  return (
    <div className="space-y-10 max-w-5xl">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent" />
        <div className="relative">
          <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
            SHIN-KYO Rychnov nad Kněžnou
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Jak získat auto pro oddíl
          </h1>
          <p className="mt-3 text-base text-[var(--muted)] max-w-xl leading-relaxed">
            Postupujte od nejlepší varianty. Když řeknou NE, otevře se
            další kolo alternativ. Klikněte na kartu a zvolte ANO / NE / PODMÍNKA.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/kalkulacka"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--background)] hover:bg-[var(--accent-hover)] transition"
            >
              Spočítat náklady
            </Link>
            <Link
              href="/outreach"
              className="rounded-lg border border-[var(--line-strong)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
            >
              Koho oslovit
            </Link>
          </div>
        </div>
      </div>

      {/* Plan overview */}
      <PlanOverview />

      {/* Section: Rozhodovací strom */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
            Rozhodovací strom
          </h2>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        {/* Progress */}
        <TreeProgress />

        {/* THE BRACKET */}
        <BracketView />

        {/* Summary */}
        <TreeSummary />
      </div>
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
