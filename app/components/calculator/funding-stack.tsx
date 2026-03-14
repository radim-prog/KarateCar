"use client";

import { decisionNodes, fundingSources } from "../../data";
import { useTreeState } from "../tree-state-provider";

function fmt(value: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(value);
}

const typeColors: Record<string, string> = {
  corporate: "bg-blue-500",
  grant: "bg-[var(--green)]",
  partners: "bg-[var(--accent)]",
  crowdfunding: "bg-[var(--gold)]",
  own: "bg-gray-400",
};

const typeLabels: Record<string, string> = {
  corporate: "Firma",
  grant: "Dotace/Grant",
  partners: "Partneři",
  crowdfunding: "Sbírka",
  own: "Vlastní",
};

type FundingStackProps = {
  targetPrice: number;
};

export function FundingStack({ targetPrice }: FundingStackProps) {
  const { state } = useTreeState();

  const activeSources = fundingSources.filter((fs) => {
    const outcome = state.outcomes[fs.linkedNodeId];
    return outcome === "ano" || outcome === "podminka";
  });

  const totalMin = activeSources.reduce((sum, fs) => sum + fs.estimatedMin, 0);
  const totalMax = activeSources.reduce((sum, fs) => sum + fs.estimatedMax, 0);

  if (activeSources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line)] bg-white p-5 text-center">
        <h2 className="text-lg font-semibold mb-2">Odkud peníze?</h2>
        <p className="text-sm text-[var(--muted)]">
          Vraťte se na hlavní stránku a označte strategie jako ANO nebo
          PODMÍNKA. Pak se tady ukáže, z jakých zdrojů se dá financování
          složit.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-white p-5">
      <h2 className="text-lg font-semibold mb-4">Odkud peníze?</h2>

      {/* Segmented bar */}
      <div className="h-6 rounded-full bg-[var(--line)] overflow-hidden flex mb-4">
        {activeSources.map((fs) => {
          const pct =
            targetPrice > 0
              ? Math.max(
                  ((fs.estimatedMin + fs.estimatedMax) / 2 / targetPrice) * 100,
                  3,
                )
              : 0;
          return (
            <div
              key={fs.id}
              className={`h-full ${typeColors[fs.type] ?? "bg-gray-400"} transition-all`}
              style={{ width: `${Math.min(pct, 100)}%` }}
              title={`${fs.label}: ${fmt(fs.estimatedMin)} - ${fmt(fs.estimatedMax)}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-2 mb-4">
        {activeSources.map((fs) => {
          const outcome = state.outcomes[fs.linkedNodeId];
          return (
            <div
              key={fs.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${typeColors[fs.type] ?? "bg-gray-400"}`}
                />
                <span>{fs.label}</span>
                <span
                  className={`text-xs rounded px-1.5 py-0.5 font-medium ${
                    outcome === "ano"
                      ? "bg-[var(--green-soft)] text-[var(--green)]"
                      : "bg-[var(--gold-soft)] text-[var(--gold)]"
                  }`}
                >
                  {outcome === "ano" ? "ANO" : "PODM."}
                </span>
              </div>
              <span className="font-medium text-[var(--muted)]">
                {fmt(fs.estimatedMin)} - {fmt(fs.estimatedMax)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="border-t border-[var(--line)] pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Odhad min.</span>
          <span className="font-semibold">{fmt(totalMin)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Odhad max.</span>
          <span className="font-semibold">{fmt(totalMax)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Cílová cena vozu</span>
          <span className="font-bold text-[var(--accent)]">
            {fmt(targetPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
