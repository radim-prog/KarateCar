import type { PhaseConfig, DecisionNode } from "../../data";
import { useTreeState } from "../tree-state-provider";

type JourneyProgressProps = {
  phases: PhaseConfig[];
  nodesById: Map<string, DecisionNode>;
};

export function JourneyProgress({ phases, nodesById }: JourneyProgressProps) {
  const { state } = useTreeState();

  const totalNodes = phases.reduce((sum, p) => sum + p.nodeIds.length, 0);
  const evaluated = phases.reduce(
    (sum, p) => sum + p.nodeIds.filter((id) => state.outcomes[id] && state.outcomes[id] !== "pending").length,
    0,
  );
  const anoCount = Object.values(state.outcomes).filter((o) => o === "ano").length;
  const neCount = Object.values(state.outcomes).filter((o) => o === "ne").length;
  const podminkaCount = Object.values(state.outcomes).filter((o) => o === "podminka").length;

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="font-semibold">Průzkum strategií</span>
        <span className="text-[var(--muted)]">{evaluated} z {totalNodes} prověřeno</span>
      </div>

      {/* Segmented bar by phase */}
      <div className="flex h-2 rounded-full overflow-hidden bg-[var(--line)] gap-px">
        {phases.map((phase) => {
          const phaseTotal = phase.nodeIds.length;
          const phaseEval = phase.nodeIds.filter((id) => state.outcomes[id] && state.outcomes[id] !== "pending").length;
          const pct = (phaseTotal / totalNodes) * 100;
          const fillPct = phaseTotal > 0 ? (phaseEval / phaseTotal) * 100 : 0;
          return (
            <div key={phase.id} className="relative" style={{ width: `${pct}%` }}>
              <div
                className="h-full rounded-sm transition-all"
                style={{
                  width: `${fillPct}%`,
                  backgroundColor: phase.color,
                  opacity: fillPct > 0 ? 1 : 0.15,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {evaluated > 0 && (
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          {anoCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
              Ano: {anoCount}
            </span>
          )}
          {podminkaCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              Podmínka: {podminkaCount}
            </span>
          )}
          {neCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4a4d5a]" />
              Ne: {neCount}
            </span>
          )}
          <span className="text-[var(--muted)]">Zbývá: {totalNodes - evaluated}</span>
        </div>
      )}
    </div>
  );
}
