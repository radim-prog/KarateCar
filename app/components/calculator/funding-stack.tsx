"use client";

import { fundingSources } from "../../data";
import { useTreeState } from "../tree-state-provider";
import { fmt } from "../../lib/format";

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

  const diffMin = totalMin - targetPrice;
  const diffMax = totalMax - targetPrice;

  if (activeSources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-5 text-center">
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
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">Odkud peníze?</h2>

      {/* Sources list */}
      <div className="space-y-2 mb-4">
        {activeSources.map((fs) => {
          const outcome = state.outcomes[fs.linkedNodeId];
          return (
            <div
              key={fs.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-[var(--muted)] shrink-0 w-20">
                  {typeLabels[fs.type] ?? fs.type}
                </span>
                <span className="truncate">{fs.label}</span>
                <span
                  className={`text-xs rounded px-1.5 py-0.5 font-medium shrink-0 ${
                    outcome === "ano"
                      ? "bg-[var(--green-soft)] text-[var(--green)]"
                      : "bg-[var(--gold-soft)] text-[var(--gold)]"
                  }`}
                >
                  {outcome === "ano" ? "ANO" : "PODM."}
                </span>
              </div>
              <span className="font-medium text-[var(--muted)] shrink-0 ml-2">
                {fmt(fs.estimatedMin)} – {fmt(fs.estimatedMax)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="border-t border-[var(--line)] pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Celkem zdroje (min – max)</span>
          <span className="font-semibold">
            {fmt(totalMin)} – {fmt(totalMax)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Cílová cena vozu</span>
          <span className="font-bold text-[var(--accent)]">
            {fmt(targetPrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span>{diffMax >= 0 ? "Přebytek / Schodek" : "Schodek / Přebytek"}</span>
          <span className="flex gap-2">
            <span className={diffMin >= 0 ? "text-[var(--green)]" : "text-red-600"}>
              {diffMin >= 0 ? "+" : ""}{fmt(diffMin)}
            </span>
            <span className="text-[var(--muted)]">–</span>
            <span className={diffMax >= 0 ? "text-[var(--green)]" : "text-red-600"}>
              {diffMax >= 0 ? "+" : ""}{fmt(diffMax)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
