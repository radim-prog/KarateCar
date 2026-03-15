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

      {/* Zdroje a odkazy */}
      {node.sources && node.sources.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
            Zdroje a odkazy
          </h4>
          <div className="flex flex-wrap gap-2">
            {node.sources.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent-soft)] transition"
                title={src.note}
              >
                <span className="opacity-60">&nearr;</span>
                {src.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Co se stane — vždy viditelné */}
      <div className="mt-5 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
          Co se stane dál
        </h4>
        <div
          className={`rounded-lg px-4 py-3 border text-sm leading-relaxed cursor-pointer transition ${
            outcome === "ano"
              ? "bg-[var(--green-soft)] border-[var(--green)]/30 ring-2 ring-[var(--green)]/30"
              : "bg-[var(--green-soft)]/40 border-[var(--line)] hover:border-[var(--green)]/30"
          }`}
          onClick={() => setOutcome(node.id, "ano")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOutcome(node.id, "ano")}
        >
          <span className="text-xs font-bold text-[var(--green)] uppercase">Vyjde to →</span>{" "}
          {node.nextMoveOnAno}
        </div>
        <div
          className={`rounded-lg px-4 py-3 border text-sm leading-relaxed cursor-pointer transition ${
            outcome === "ne"
              ? "bg-[var(--surface-raised)] border-[var(--line-strong)] ring-2 ring-[var(--muted)]/30"
              : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line-strong)]"
          }`}
          onClick={() => setOutcome(node.id, "ne")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOutcome(node.id, "ne")}
        >
          <span className="text-xs font-bold text-[var(--muted)] uppercase">Nevyjde →</span>{" "}
          {node.nextMoveOnNe}
        </div>
        <div
          className={`rounded-lg px-4 py-3 border text-sm leading-relaxed cursor-pointer transition ${
            outcome === "podminka"
              ? "bg-[var(--gold-soft)] border-[var(--gold)]/30 ring-2 ring-[var(--gold)]/30"
              : "bg-[var(--gold-soft)]/40 border-[var(--line)] hover:border-[var(--gold)]/30"
          }`}
          onClick={() => setOutcome(node.id, "podminka")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setOutcome(node.id, "podminka")}
        >
          <span className="text-xs font-bold text-[var(--gold)] uppercase">S podmínkou →</span>{" "}
          {node.nextMoveOnPodminka}
        </div>
      </div>

      {/* Poznámka */}
      <NoteField
        value={state.notes[node.id] ?? ""}
        onChange={(v) => setNote(node.id, v)}
      />

      {/* Reset */}
      {outcome !== "pending" && (
        <div className="mt-3">
          <button type="button" onClick={() => resetNode(node.id)} className="bracket-btn-ghost text-xs">
            Resetovat volbu
          </button>
        </div>
      )}
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
