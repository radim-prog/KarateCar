"use client";

import Link from "next/link";

import { checklistGroups, decisionNodes } from "./data";
import { ProgressChecklist } from "./components/progress-checklist";
import { TreeStateProvider, useTreeState } from "./components/tree-state-provider";
import { TierGroup } from "./components/decision-tree/tier-group";
import { TreeProgress } from "./components/decision-tree/tree-progress";
import { TreeSummary } from "./components/decision-tree/tree-summary";

function DecisionTree() {
  const { state } = useTreeState();

  const tiers = [1, 2, 3, 4] as const;
  const nodesByTier = (tier: number) =>
    decisionNodes.filter((n) => n.tier === tier);

  function isTierActive(tier: number): boolean {
    if (tier === 1 || tier === 4) return true;
    const previousTiers = tiers.filter((t) => t < tier);
    return previousTiers.some((t) =>
      nodesByTier(t).some((n) => state.outcomes[n.id] === "ne"),
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Hero */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Rozhodovací strom
        </h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Postupujte od nejlepších scénářů po záložní plány. U každé
          strategie zvolte ANO / NE / PODMÍNKA — uvidíte, co funguje a kam
          se posunout dál.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/kalkulacka"
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)] transition"
          >
            Spočítat náklady
          </Link>
          <Link
            href="/outreach"
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--accent)] transition"
          >
            Kontakty
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      <TreeProgress />

      {/* Decision tree tiers */}
      <div className="space-y-8">
        {tiers.map((tier, i) => (
          <div key={tier}>
            {i > 0 && (
              <div className="flex justify-center py-2">
                <div className="w-px h-8 bg-[var(--line)]" />
              </div>
            )}
            <TierGroup
              tier={tier}
              nodes={nodesByTier(tier)}
              active={isTierActive(tier)}
            />
          </div>
        ))}
      </div>

      {/* Summary & recommendations */}
      <TreeSummary />

      {/* Checklist */}
      <ProgressChecklist groups={checklistGroups} />
    </div>
  );
}

export default function Home() {
  return (
    <TreeStateProvider>
      <DecisionTree />
    </TreeStateProvider>
  );
}
