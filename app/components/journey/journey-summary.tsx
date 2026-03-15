import Link from "next/link";
import type { DecisionNode } from "../../data";
import { useTreeState } from "../tree-state-provider";

type JourneySummaryProps = {
  allNodes: DecisionNode[];
};

export function JourneySummary({ allNodes }: JourneySummaryProps) {
  const { state, resetAll } = useTreeState();

  const anoNodes = allNodes.filter((n) => state.outcomes[n.id] === "ano");
  const podminkaNodes = allNodes.filter((n) => state.outcomes[n.id] === "podminka");
  const pendingNodes = allNodes.filter((n) => !state.outcomes[n.id] || state.outcomes[n.id] === "pending");
  const hasAnyOutcome = anoNodes.length > 0 || podminkaNodes.length > 0;

  if (!hasAnyOutcome && pendingNodes.length === allNodes.length) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line-strong)] p-6 text-center">
        <p className="text-sm text-[var(--muted)]">
          Začněte od první fáze — klikněte na kartu strategie a zvolte ANO / NE / PODMÍNKA.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 space-y-4">
      <h2 className="text-lg font-semibold">Souhrn</h2>

      {anoNodes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--green)] mb-2">
            Funguje ({anoNodes.length})
          </h3>
          <div className="space-y-2">
            {anoNodes.map((n) => (
              <div key={n.id} className="rounded-lg bg-[var(--green-soft)] border border-[var(--green)]/20 px-4 py-2.5">
                <div className="text-sm font-semibold">{n.label}</div>
                <p className="text-xs text-[var(--muted)] mt-0.5">{n.nextMoveOnAno}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {podminkaNodes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--gold)] mb-2">
            S podmínkou ({podminkaNodes.length})
          </h3>
          <div className="space-y-2">
            {podminkaNodes.map((n) => (
              <div key={n.id} className="rounded-lg bg-[var(--gold-soft)] border border-[var(--gold)]/20 px-4 py-2.5">
                <div className="text-sm font-semibold">{n.label}</div>
                <p className="text-xs text-[var(--muted)] mt-0.5">{n.nextMoveOnPodminka}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {pendingNodes.length > 0 && (
        <p className="text-xs text-[var(--muted)]">
          Zbývá prověřit: {pendingNodes.slice(0, 5).map((n) => n.label).join(", ")}
          {pendingNodes.length > 5 && ` a dalších ${pendingNodes.length - 5}`}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {anoNodes.length > 0 && (
          <Link
            href="/kalkulacka"
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--background)] hover:bg-[var(--accent-hover)] transition"
          >
            Spočítat náklady
          </Link>
        )}
        {hasAnyOutcome && (
          <button
            type="button"
            onClick={resetAll}
            className="bracket-btn-ghost"
          >
            Resetovat vše
          </button>
        )}
      </div>
    </div>
  );
}
