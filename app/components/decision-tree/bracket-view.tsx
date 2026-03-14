"use client";

import { useState } from "react";

import type { DecisionNode, NodeOutcome } from "../../data";
import { decisionNodes } from "../../data";
import { useTreeState } from "../tree-state-provider";

const tierMeta: Record<
  number,
  { label: string; name: string; color: string }
> = {
  1: { label: "TIER 1", name: "Auto zdarma", color: "var(--green)" },
  2: { label: "TIER 2", name: "Zvýhodněné pořízení", color: "var(--accent)" },
  3: { label: "TIER 3", name: "Budování základny", color: "var(--gold)" },
  4: { label: "TIER 4", name: "Záložní plán", color: "var(--muted)" },
};

const diffLabel = { low: "Snadné", medium: "Střední", high: "Náročné" };
const probLabel = { low: "Nízká", medium: "Střední", high: "Vysoká" };

export function BracketView() {
  const { state, setOutcome, setNote, resetNode } = useTreeState();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const tiers = [1, 2, 3, 4];
  const byTier = (tier: number) =>
    decisionNodes
      .filter((n) => n.tier === tier)
      .sort((a, b) => a.order - b.order);

  function isTierActive(tier: number) {
    if (tier === 1 || tier === 4) return true;
    for (let t = 1; t < tier; t++) {
      if (byTier(t).some((n) => state.outcomes[n.id] === "ne")) return true;
    }
    return false;
  }

  function isConnectorLit(toTier: number) {
    if (toTier === 4) return true;
    for (let t = 1; t < toTier; t++) {
      if (byTier(t).some((n) => state.outcomes[n.id] === "ne")) return true;
    }
    return false;
  }

  // Has any node in this tier been answered YES? (show success indicator)
  function tierHasAno(tier: number) {
    return byTier(tier).some((n) => state.outcomes[n.id] === "ano");
  }

  const selectedNode = selectedId
    ? decisionNodes.find((n) => n.id === selectedId) ?? null
    : null;

  return (
    <div className="space-y-6">
      {/* ── BRACKET ── */}
      <div className="bracket">
        {tiers.map((tier, i) => (
          <div key={tier} className="bracket-stage">
            {/* Connector arrow from previous tier */}
            {i > 0 && (
              <div
                className={`bracket-connector ${isConnectorLit(tier) ? "lit" : ""}`}
              >
                <div className="bracket-connector-track" />
                <svg
                  className="bracket-connector-chevron"
                  viewBox="0 0 10 18"
                  fill="none"
                >
                  <path
                    d="M1.5 1.5L8.5 9L1.5 16.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            {/* Column */}
            <div
              className={`bracket-column ${isTierActive(tier) ? "active" : "inactive"}`}
            >
              {/* Column header */}
              <div
                className="bracket-col-head"
                style={
                  { "--tier-color": tierMeta[tier].color } as React.CSSProperties
                }
              >
                <span className="bracket-col-tier">
                  {tierMeta[tier].label}
                </span>
                <span className="bracket-col-title">
                  {tierMeta[tier].name}
                </span>
                {tierHasAno(tier) && (
                  <span className="bracket-col-win">FUNGUJE</span>
                )}
              </div>

              {/* Node cards */}
              <div className="bracket-cards">
                {byTier(tier).map((node) => {
                  const outcome = state.outcomes[node.id] ?? "pending";
                  const selected = selectedId === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() =>
                        setSelectedId(selected ? null : node.id)
                      }
                      className={`bracket-card ${outcome} ${selected ? "selected" : ""}`}
                    >
                      <div className="bracket-card-row">
                        {outcome !== "pending" && (
                          <span className={`bracket-card-dot ${outcome}`} />
                        )}
                        <span className="bracket-card-name">
                          {node.label}
                        </span>
                      </div>
                      <span className="bracket-card-value">
                        {node.estimatedValue}
                      </span>
                      <span className="bracket-card-time">
                        {node.estimatedTimeframe}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DETAIL PANEL ── */}
      {selectedNode && (
        <div className="bracket-detail">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{selectedNode.label}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                {selectedNode.headline}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="shrink-0 w-8 h-8 rounded-lg border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition text-lg leading-none"
            >
              &times;
            </button>
          </div>

          <p className="text-sm leading-relaxed mt-3">
            {selectedNode.description}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="rounded-md bg-[var(--background)] px-2.5 py-1 font-medium">
              {selectedNode.estimatedTimeframe}
            </span>
            <span className="rounded-md bg-[var(--background)] px-2.5 py-1 font-medium">
              {selectedNode.estimatedValue}
            </span>
            <span className="rounded-md bg-[var(--background)] px-2.5 py-1">
              Obtížnost: {diffLabel[selectedNode.difficulty]}
            </span>
            <span className="rounded-md bg-[var(--background)] px-2.5 py-1">
              Šance: {probLabel[selectedNode.probability]}
            </span>
          </div>

          {/* Steps + Risks */}
          <div className="grid gap-5 md:grid-cols-2 mt-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
                Konkrétní kroky
              </h4>
              <ol className="space-y-2">
                {selectedNode.steps.map((s, idx) => (
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
                {selectedNode.risks.map((r) => (
                  <li key={r} className="leading-relaxed">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next move if outcome set */}
          {(state.outcomes[selectedNode.id] ?? "pending") !== "pending" && (
            <div
              className={`rounded-lg p-4 mt-4 ${
                state.outcomes[selectedNode.id] === "ano"
                  ? "bg-[var(--green-soft)] border border-[var(--green)]/20"
                  : state.outcomes[selectedNode.id] === "ne"
                    ? "bg-gray-50 border border-gray-200"
                    : "bg-[var(--gold-soft)] border border-[var(--gold)]/20"
              }`}
            >
              <h4 className="text-xs font-bold uppercase tracking-wide mb-1">
                Další postup
              </h4>
              <p className="text-sm leading-relaxed">
                {state.outcomes[selectedNode.id] === "ano" &&
                  selectedNode.nextMoveOnAno}
                {state.outcomes[selectedNode.id] === "ne" &&
                  selectedNode.nextMoveOnNe}
                {state.outcomes[selectedNode.id] === "podminka" &&
                  selectedNode.nextMoveOnPodminka}
              </p>
            </div>
          )}

          {/* Note textarea */}
          <NoteField
            value={state.notes[selectedNode.id] ?? ""}
            onChange={(v) => setNote(selectedNode.id, v)}
          />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <ActionBtn
              label="ANO"
              active={state.outcomes[selectedNode.id] === "ano"}
              onClick={() => setOutcome(selectedNode.id, "ano")}
              variant="ano"
            />
            <ActionBtn
              label="NE"
              active={state.outcomes[selectedNode.id] === "ne"}
              onClick={() => setOutcome(selectedNode.id, "ne")}
              variant="ne"
            />
            <ActionBtn
              label="PODMÍNKA"
              active={state.outcomes[selectedNode.id] === "podminka"}
              onClick={() => setOutcome(selectedNode.id, "podminka")}
              variant="podminka"
            />
            {(state.outcomes[selectedNode.id] ?? "pending") !== "pending" && (
              <button
                type="button"
                onClick={() => resetNode(selectedNode.id)}
                className="bracket-btn-ghost"
              >
                Resetovat
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NoteField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(value.length > 0);
  return (
    <div className="mt-3">
      {open ? (
        <textarea
          className="w-full rounded-lg border border-[var(--line)] p-3 text-sm resize-none focus:border-[var(--accent)] focus:outline-none"
          rows={2}
          placeholder="Vaše poznámka k této strategii..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition"
        >
          + Přidat poznámku
        </button>
      )}
    </div>
  );
}

function ActionBtn({
  label,
  active,
  onClick,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant: "ano" | "ne" | "podminka";
}) {
  const base = "bracket-action-btn";
  const ringColors = {
    ano: "ring-[var(--green)]",
    ne: "ring-gray-400",
    podminka: "ring-[var(--gold)]",
  };
  const styles = {
    ano: `${base} bg-[var(--green)] hover:bg-[var(--green)]/90 text-white`,
    ne: `${base} bg-gray-400 hover:bg-gray-500 text-white`,
    podminka: `${base} bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-white`,
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
