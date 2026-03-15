import type { PipelineStep } from "../data";

type PipelineViewProps = {
  steps: PipelineStep[];
};

export function PipelineView({ steps }: PipelineViewProps) {
  if (steps.length === 0) return null;

  return (
    <div className="mt-5 rounded-lg border border-[var(--line)] p-4">
      <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-4">
        Postup po odeslání
      </h3>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-start gap-0">
        {steps.map((step, i) => (
          <div key={step.order} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                  {step.order}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-[var(--line)]" />
                )}
              </div>
              <div className="mt-2 pr-3">
                <div className="text-xs font-semibold">{step.label}</div>
                <div className="text-xs text-[var(--muted)]">{step.timing}</div>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="sm:hidden space-y-3">
        {steps.map((step, i) => (
          <div key={step.order} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                {step.order}
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 w-0.5 bg-[var(--line)] mt-1" />
              )}
            </div>
            <div className="pb-3">
              <div className="text-sm font-semibold">{step.label}</div>
              <div className="text-xs text-[var(--muted)]">{step.timing}</div>
              <p className="text-xs text-[var(--muted)] mt-0.5 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
