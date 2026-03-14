"use client";

import { useState } from "react";

import type { DecisionNode, NodeOutcome } from "../../data";
import { useTreeState } from "../tree-state-provider";

const difficultyLabel = { low: "Snadné", medium: "Střední", high: "Náročné" };
const probabilityLabel = { low: "Nízká", medium: "Střední", high: "Vysoká" };

type NodeCardProps = {
  node: DecisionNode;
  tierActive: boolean;
};

export function NodeCard({ node, tierActive }: NodeCardProps) {
  const { state, setOutcome, setNote, resetNode } = useTreeState();
  const outcome = state.outcomes[node.id] ?? "pending";
  const noteText = state.notes[node.id] ?? "";
  const [expanded, setExpanded] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const cardStyles = getCardStyles(outcome, tierActive);

  return (
    <div
      className={`rounded-xl border-2 transition-all duration-300 ${cardStyles.border} ${cardStyles.bg} ${cardStyles.opacity}`}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4 md:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <OutcomeBadge outcome={outcome} />
              <span className="text-xs text-[var(--muted)]">
                {node.estimatedValue}
              </span>
            </div>
            <h3
              className={`text-base font-semibold ${outcome === "ne" ? "line-through text-[var(--muted)]" : ""}`}
            >
              {node.label}
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
              {node.headline}
            </p>
          </div>
          <span
            className={`shrink-0 text-lg transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            &#9662;
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-5 md:px-5 space-y-4 border-t border-[var(--line)]">
          <p className="pt-4 text-sm leading-relaxed">{node.description}</p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-[var(--background)] px-2 py-1">
              {node.estimatedTimeframe}
            </span>
            <span className="rounded-md bg-[var(--background)] px-2 py-1">
              Obtížnost: {difficultyLabel[node.difficulty]}
            </span>
            <span className="rounded-md bg-[var(--background)] px-2 py-1">
              Pravděpodobnost: {probabilityLabel[node.probability]}
            </span>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
              Kroky
            </h4>
            <ol className="space-y-1.5">
              {node.steps.map((step, i) => (
                <li key={step} className="flex gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent)]">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Risks */}
          <div className="rounded-lg bg-[var(--accent-soft)] p-3">
            <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-1.5">
              Rizika
            </h4>
            <ul className="space-y-1 text-sm">
              {node.risks.map((risk) => (
                <li key={risk} className="leading-relaxed">
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Next moves based on outcome */}
          {outcome !== "pending" && (
            <div
              className={`rounded-lg p-3 ${
                outcome === "ano"
                  ? "bg-[var(--green-soft)]"
                  : outcome === "ne"
                    ? "bg-gray-100"
                    : "bg-[var(--gold-soft)]"
              }`}
            >
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1">
                Další postup
              </h4>
              <p className="text-sm leading-relaxed">
                {outcome === "ano" && node.nextMoveOnAno}
                {outcome === "ne" && node.nextMoveOnNe}
                {outcome === "podminka" && node.nextMoveOnPodminka}
              </p>
            </div>
          )}

          {/* Note */}
          {showNote && (
            <textarea
              className="w-full rounded-lg border border-[var(--line)] p-3 text-sm resize-none focus:border-[var(--accent)] focus:outline-none"
              rows={2}
              placeholder="Vaše poznámka..."
              value={noteText}
              onChange={(e) => setNote(node.id, e.target.value)}
            />
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <OutcomeButton
              label="ANO"
              active={outcome === "ano"}
              onClick={() => setOutcome(node.id, "ano")}
              className="bg-[var(--green)] text-white hover:bg-[var(--green)]/90"
              activeClass="ring-2 ring-[var(--green)] ring-offset-2"
            />
            <OutcomeButton
              label="NE"
              active={outcome === "ne"}
              onClick={() => setOutcome(node.id, "ne")}
              className="bg-gray-400 text-white hover:bg-gray-500"
              activeClass="ring-2 ring-gray-400 ring-offset-2"
            />
            <OutcomeButton
              label="PODMÍNKA"
              active={outcome === "podminka"}
              onClick={() => setOutcome(node.id, "podminka")}
              className="bg-[var(--gold)] text-white hover:bg-[var(--gold)]/90"
              activeClass="ring-2 ring-[var(--gold)] ring-offset-2"
            />
            <button
              type="button"
              onClick={() => setShowNote((v) => !v)}
              className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--muted)] hover:border-[var(--accent)] transition"
            >
              {showNote ? "Skrýt poznámku" : "Poznámka"}
            </button>
            {outcome !== "pending" && (
              <button
                type="button"
                onClick={() => resetNode(node.id)}
                className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition"
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

function getCardStyles(
  outcome: NodeOutcome,
  tierActive: boolean,
): { border: string; bg: string; opacity: string } {
  if (outcome === "ano") {
    return {
      border: "border-l-4 border-l-[var(--green)] border-[var(--green)]/30",
      bg: "bg-[var(--green-soft)]",
      opacity: "",
    };
  }
  if (outcome === "ne") {
    return {
      border: "border-gray-200",
      bg: "bg-gray-50",
      opacity: "opacity-40",
    };
  }
  if (outcome === "podminka") {
    return {
      border: "border-l-4 border-l-[var(--gold)] border-[var(--gold)]/30",
      bg: "bg-[var(--gold-soft)]",
      opacity: "",
    };
  }
  if (!tierActive) {
    return {
      border: "border-dashed border-[var(--line)]",
      bg: "bg-white",
      opacity: "opacity-60",
    };
  }
  return {
    border: "border-[var(--line)]",
    bg: "bg-white",
    opacity: "",
  };
}

function OutcomeBadge({ outcome }: { outcome: NodeOutcome }) {
  if (outcome === "pending") return null;
  const styles = {
    ano: "bg-[var(--green-soft)] text-[var(--green)]",
    ne: "bg-gray-100 text-gray-500",
    podminka: "bg-[var(--gold-soft)] text-[var(--gold)]",
  };
  const labels = { ano: "ANO", ne: "NE", podminka: "PODMÍNKA" };
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-xs font-bold ${styles[outcome]}`}
    >
      {labels[outcome]}
    </span>
  );
}

function OutcomeButton({
  label,
  active,
  onClick,
  className,
  activeClass,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className: string;
  activeClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-xs font-bold transition min-h-[44px] ${className} ${active ? activeClass : ""}`}
    >
      {label}
    </button>
  );
}
