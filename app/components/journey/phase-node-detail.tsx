"use client";

import { useState } from "react";
import type { DecisionNode, NodeOutcome } from "../../data";
import { useTreeState } from "../tree-state-provider";

const diffLabel = { low: "Snadné", medium: "Střední", high: "Náročné" };
const probLabel = { low: "Nízká", medium: "Střední", high: "Vysoká" };

export function PhaseNodeDetail({ node }: { node: DecisionNode }) {
  const { state, setOutcome, setNote, resetNode } = useTreeState();
  const outcome = state.outcomes[node.id] ?? "pending";

  return (
    <div className="phase-detail">
      <p className="text-sm text-[var(--muted)] mt-1">{node.headline}</p>
      <p className="text-sm leading-relaxed mt-3">{node.description}</p>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mt-3 text-xs">
        <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1 font-medium">
          {node.estimatedTimeframe}
        </span>
        <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1 font-medium">
          {node.estimatedValue}
        </span>
        <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1">
          Obtížnost: {diffLabel[node.difficulty]}
        </span>
        <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1">
          Šance: {probLabel[node.probability]}
        </span>
      </div>

      {/* Kroky + Rizika */}
      <div className="grid gap-5 md:grid-cols-2 mt-5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
            Konkrétní kroky
          </h4>
          <ol className="space-y-2">
            {node.steps.map((s, idx) => (
              <li key={s} className="flex gap-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-2">
            Rizika
          </h4>
          <ul className="space-y-1.5 text-sm text-[var(--muted)]">
            {node.risks.map((r) => (
              <li key={r} className="leading-relaxed">{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Další postup */}
      {outcome !== "pending" && (
        <div
          className={`rounded-lg p-4 mt-4 ${
            outcome === "ano"
              ? "bg-[var(--green-soft)] border border-[var(--green)]/20"
              : outcome === "ne"
                ? "bg-[var(--surface)] border border-[var(--line-strong)]"
                : "bg-[var(--gold-soft)] border border-[var(--gold)]/20"
          }`}
        >
          <h4 className="text-xs font-bold uppercase tracking-wide mb-1">Další postup</h4>
          <p className="text-sm leading-relaxed">
            {outcome === "ano" && node.nextMoveOnAno}
            {outcome === "ne" && node.nextMoveOnNe}
            {outcome === "podminka" && node.nextMoveOnPodminka}
          </p>
        </div>
      )}

      {/* Poznámka */}
      <NoteField
        value={state.notes[node.id] ?? ""}
        onChange={(v) => setNote(node.id, v)}
      />

      {/* Akce */}
      <div className="flex flex-wrap gap-2 mt-4">
        <ActionBtn label="ANO" active={outcome === "ano"} onClick={() => setOutcome(node.id, "ano")} variant="ano" />
        <ActionBtn label="NE" active={outcome === "ne"} onClick={() => setOutcome(node.id, "ne")} variant="ne" />
        <ActionBtn label="PODMÍNKA" active={outcome === "podminka"} onClick={() => setOutcome(node.id, "podminka")} variant="podminka" />
        {outcome !== "pending" && (
          <button type="button" onClick={() => resetNode(node.id)} className="bracket-btn-ghost">
            Resetovat
          </button>
        )}
      </div>
    </div>
  );
}

function NoteField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(value.length > 0);
  return (
    <div className="mt-3">
      {open ? (
        <textarea
          className="w-full rounded-lg border border-[var(--line)] p-3 text-sm resize-none focus:border-[var(--accent)] focus:outline-none bg-transparent"
          rows={2}
          placeholder="Vaše poznámka k této strategii..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition">
          + Přidat poznámku
        </button>
      )}
    </div>
  );
}

function ActionBtn({ label, active, onClick, variant }: {
  label: string; active: boolean; onClick: () => void; variant: "ano" | "ne" | "podminka";
}) {
  const ringColors = { ano: "ring-[var(--green)]", ne: "ring-gray-400", podminka: "ring-[var(--gold)]" };
  const styles = {
    ano: "bracket-action-btn bg-[var(--green)] hover:bg-[var(--green)]/90 text-white",
    ne: "bracket-action-btn bg-[var(--surface-raised)] hover:bg-[var(--muted)] text-[var(--foreground)]",
    podminka: "bracket-action-btn bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-white",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles[variant]} ${active ? `ring-2 ring-offset-2 ${ringColors[variant]}` : ""}`}
    >
      {label}
    </button>
  );
}
