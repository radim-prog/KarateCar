"use client";

import Link from "next/link";

import { decisionNodes } from "../../data";
import { useTreeState } from "../tree-state-provider";

export function TreeSummary() {
  const { state, resetAll } = useTreeState();
  const outcomes = state.outcomes;

  const anoNodes = decisionNodes.filter((n) => outcomes[n.id] === "ano");
  const podminkaNodes = decisionNodes.filter(
    (n) => outcomes[n.id] === "podminka",
  );
  const pendingNodes = decisionNodes.filter(
    (n) => !outcomes[n.id] || outcomes[n.id] === "pending",
  );
  const neNodes = decisionNodes.filter((n) => outcomes[n.id] === "ne");

  const hasAnyOutcome = Object.keys(outcomes).length > 0;

  if (!hasAnyOutcome) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--line)] bg-white p-5 text-center">
        <p className="text-sm text-[var(--muted)]">
          Začněte klikáním na karty výše a volbou ANO / NE / PODMÍNKA. Tento
          panel ukáže doporučené další kroky.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Doporučené další kroky</h2>
        <button
          type="button"
          onClick={resetAll}
          className="text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition"
        >
          Resetovat vše
        </button>
      </div>

      {/* ANO nodes — show next moves */}
      {anoNodes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--green)] mb-2">
            Funguje ({anoNodes.length})
          </h3>
          <div className="space-y-2">
            {anoNodes.map((node) => (
              <div
                key={node.id}
                className="rounded-lg bg-[var(--green-soft)] p-3"
              >
                <div className="text-sm font-semibold">{node.label}</div>
                <p className="text-sm text-[var(--muted)] mt-1">
                  {node.nextMoveOnAno}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PODMINKA nodes */}
      {podminkaNodes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--gold)] mb-2">
            S podmínkou ({podminkaNodes.length})
          </h3>
          <div className="space-y-2">
            {podminkaNodes.map((node) => (
              <div
                key={node.id}
                className="rounded-lg bg-[var(--gold-soft)] p-3"
              >
                <div className="text-sm font-semibold">{node.label}</div>
                <p className="text-sm text-[var(--muted)] mt-1">
                  {node.nextMoveOnPodminka}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending suggestion */}
      {pendingNodes.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
            Ještě neprověřeno ({pendingNodes.length})
          </h3>
          <p className="text-sm text-[var(--muted)]">
            {pendingNodes
              .slice(0, 3)
              .map((n) => n.label)
              .join(", ")}
            {pendingNodes.length > 3 &&
              ` a dalších ${pendingNodes.length - 3}`}
          </p>
        </div>
      )}

      {/* Link to calculator */}
      {anoNodes.length > 0 && (
        <Link
          href="/kalkulacka"
          className="inline-block rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition"
        >
          Spočítat náklady v kalkulačce
        </Link>
      )}
    </div>
  );
}
