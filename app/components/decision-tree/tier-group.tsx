"use client";

import type { DecisionNode } from "../../data";
import { NodeCard } from "./node-card";

const tierLabels: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Tier 1 — Nejlepší scénář", subtitle: "Auto zdarma od partnera" },
  2: {
    title: "Tier 2 — Zvýhodněné pořízení",
    subtitle: "Leasing, grant nebo dotace",
  },
  3: {
    title: "Tier 3 — Budování základny",
    subtitle: "Partneři, neziskovka, kombinované financování",
  },
  4: {
    title: "Tier 4 — Záložní plán",
    subtitle: "Crowdfunding nebo vlastní úvěr",
  },
};

type TierGroupProps = {
  tier: number;
  nodes: DecisionNode[];
  active: boolean;
};

export function TierGroup({ tier, nodes, active }: TierGroupProps) {
  const info = tierLabels[tier] ?? {
    title: `Tier ${tier}`,
    subtitle: "",
  };

  return (
    <div className="relative">
      {/* Tier header */}
      <div className="mb-3">
        <h2
          className={`text-sm font-bold uppercase tracking-wide ${
            active ? "text-[var(--accent)]" : "text-[var(--muted)]"
          }`}
        >
          {info.title}
        </h2>
        <p className="text-xs text-[var(--muted)]">{info.subtitle}</p>
      </div>

      {/* Cards grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {nodes
          .sort((a, b) => a.order - b.order)
          .map((node) => (
            <NodeCard key={node.id} node={node} tierActive={active} />
          ))}
      </div>
    </div>
  );
}
