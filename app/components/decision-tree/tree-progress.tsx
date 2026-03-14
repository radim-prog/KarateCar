"use client";

import { decisionNodes } from "../../data";
import { useTreeState } from "../tree-state-provider";

export function TreeProgress() {
  const { state } = useTreeState();
  const total = decisionNodes.length;
  const explored = Object.values(state.outcomes).filter(
    (o) => o !== "pending",
  ).length;
  const anoCount = Object.values(state.outcomes).filter(
    (o) => o === "ano",
  ).length;
  const neCount = Object.values(state.outcomes).filter(
    (o) => o === "ne",
  ).length;
  const podminkaCount = Object.values(state.outcomes).filter(
    (o) => o === "podminka",
  ).length;
  const pct = total > 0 ? Math.round((explored / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-[var(--line)] bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">Postup průzkumu</h2>
        <span className="text-sm font-bold text-[var(--accent)]">
          {explored}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 rounded-full bg-[var(--line)] mb-3 overflow-hidden flex">
        {anoCount > 0 && (
          <div
            className="h-full bg-[var(--green)] transition-all"
            style={{ width: `${(anoCount / total) * 100}%` }}
          />
        )}
        {podminkaCount > 0 && (
          <div
            className="h-full bg-[var(--gold)] transition-all"
            style={{ width: `${(podminkaCount / total) * 100}%` }}
          />
        )}
        {neCount > 0 && (
          <div
            className="h-full bg-gray-300 transition-all"
            style={{ width: `${(neCount / total) * 100}%` }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-[var(--muted)]">
        {anoCount > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--green)]" />
            ANO: {anoCount}
          </span>
        )}
        {podminkaCount > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
            Podmínka: {podminkaCount}
          </span>
        )}
        {neCount > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            NE: {neCount}
          </span>
        )}
        {total - explored > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
            Zbývá: {total - explored}
          </span>
        )}
      </div>
    </div>
  );
}
