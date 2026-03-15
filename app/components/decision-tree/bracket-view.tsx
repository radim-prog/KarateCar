"use client";

import { useState } from "react";

import { decisionNodes } from "../../data";
import { useTreeState } from "../tree-state-provider";

// ── Pavouk: 7 kol (ZAČÁTEK + FÁZE 1–6) ──

type SpiderLevel = {
  label: string;
  name: string;
  color: string;
  nodeIds: string[];
};

const SPIDER_LEVELS: SpiderLevel[] = [
  {
    label: "ZAČÁTEK",
    name: "Nejlepší varianta",
    color: "var(--green)",
    nodeIds: ["skoda-free"],
  },
  {
    label: "FÁZE 1",
    name: "Alternativy zdarma",
    color: "var(--green)",
    nodeIds: ["competitor-free", "skoda-foundation"],
  },
  {
    label: "FÁZE 2",
    name: "Dotace a granty",
    color: "var(--blue)",
    nodeIds: [
      "grant-city",
      "grant-region",
      "grant-nsa",
      "grant-eu",
      "grant-foundations",
    ],
  },
  {
    label: "FÁZE 3",
    name: "Zvýhodněné pořízení",
    color: "var(--accent)",
    nodeIds: ["automaker-program", "fleet-lease", "demo-car"],
  },
  {
    label: "FÁZE 4",
    name: "Kombinované financování",
    color: "var(--gold)",
    nodeIds: ["subsidized-lease", "new-nonprofit"],
  },
  {
    label: "FÁZE 5",
    name: "Vlastní příjmy",
    color: "var(--purple)",
    nodeIds: ["partner-club", "parent-donations", "crowdfunding"],
  },
  {
    label: "FÁZE 6",
    name: "Poslední záchrana",
    color: "var(--muted)",
    nodeIds: ["used-car", "own-loan"],
  },
];

const nodesById = new Map(decisionNodes.map((n) => [n.id, n]));

const diffLabel = { low: "Snadné", medium: "Střední", high: "Náročné" };
const probLabel = { low: "Nízká", medium: "Střední", high: "Vysoká" };

export function BracketView() {
  const { state, setOutcome, setNote, resetNode } = useTreeState();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Kolo N je aktivní, když kolo N-1 má alespoň jedno NE ──
  function isLevelActive(index: number): boolean {
    if (index === 0) return true;
    const prevLevel = SPIDER_LEVELS[index - 1];
    return prevLevel.nodeIds.some((id) => state.outcomes[id] === "ne");
  }

  function isConnectorLit(toIndex: number): boolean {
    return isLevelActive(toIndex);
  }

  function levelHasAno(level: SpiderLevel): boolean {
    return level.nodeIds.some((id) => state.outcomes[id] === "ano");
  }

  const selectedNode = selectedId ? nodesById.get(selectedId) ?? null : null;

  return (
    <div className="space-y-6">
      {/* ── PAVOUK ── */}
      <div className="bracket">
        {SPIDER_LEVELS.map((level, i) => (
          <div key={level.label} className="bracket-stage">
            {/* Spojka z předchozího kola */}
            {i > 0 && (
              <div
                className={`bracket-connector ${isConnectorLit(i) ? "lit" : ""}`}
              >
                <div className="bracket-arm bracket-arm-merge" />
                <div className="bracket-arm-bridge">
                  <span className="bracket-arm-label">NE</span>
                </div>
                <div className="bracket-arm bracket-arm-split" />
              </div>
            )}

            {/* Sloupec */}
            <div
              className={`bracket-column ${isLevelActive(i) ? "active" : "inactive"}`}
            >
              {/* Hlavička */}
              <div
                className="bracket-col-head"
                style={
                  { "--tier-color": level.color } as React.CSSProperties
                }
              >
                <span className="bracket-col-tier">{level.label}</span>
                <span className="bracket-col-title">{level.name}</span>
                {levelHasAno(level) && (
                  <span className="bracket-col-win">POTVRZENO</span>
                )}
              </div>

              {/* Karty */}
              <div className="bracket-cards">
                {level.nodeIds.map((id) => {
                  const node = nodesById.get(id);
                  if (!node) return null;
                  const outcome = state.outcomes[id] ?? "pending";
                  const selected = selectedId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() =>
                        setSelectedId(selected ? null : id)
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

      {/* ── DETAIL ── */}
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

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1 font-medium">
              {selectedNode.estimatedTimeframe}
            </span>
            <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1 font-medium">
              {selectedNode.estimatedValue}
            </span>
            <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1">
              Obtížnost: {diffLabel[selectedNode.difficulty]}
            </span>
            <span className="rounded-md bg-[var(--surface-raised)] px-2.5 py-1">
              Šance: {probLabel[selectedNode.probability]}
            </span>
          </div>

          {/* Kroky + Rizika */}
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

          {/* Další postup */}
          {(state.outcomes[selectedNode.id] ?? "pending") !== "pending" && (
            <div
              className={`rounded-lg p-4 mt-4 ${
                state.outcomes[selectedNode.id] === "ano"
                  ? "bg-[var(--green-soft)] border border-[var(--green)]/20"
                  : state.outcomes[selectedNode.id] === "ne"
                    ? "bg-[var(--surface)] border border-[var(--line-strong)]"
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

          {/* Poznámka */}
          <NoteField
            value={state.notes[selectedNode.id] ?? ""}
            onChange={(v) => setNote(selectedNode.id, v)}
          />

          {/* Akce */}
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
    ne: `${base} bg-[#4a4d5a] hover:bg-[#5a5d6a] text-[var(--foreground)]`,
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
