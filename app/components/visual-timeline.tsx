"use client";

import { useState, useEffect } from "react";
import type { ActionPhase } from "../data";

const STORAGE_KEY = "karate-car-timeline";

type VisualTimelineProps = {
  phases: ActionPhase[];
};

export function VisualTimeline({ phases }: VisualTimelineProps) {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompleted(JSON.parse(stored));
    } catch {}
  }, []);

  function toggleStep(index: number) {
    setCompleted((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden lg:block overflow-x-auto pb-2">
        <div className="flex items-start min-w-[900px]">
          {phases.map((phase, i) => {
            const done = !!completed[i];
            return (
              <div key={phase.title} className="flex items-start flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <button
                      type="button"
                      onClick={() => toggleStep(i)}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        done
                          ? "bg-[var(--green)] text-white"
                          : "bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                      }`}
                      title={done ? "Označit jako nedokončené" : "Označit jako hotové"}
                    >
                      {done ? "\u2713" : i + 1}
                    </button>
                    {i < phases.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 transition-colors ${
                          done ? "bg-[var(--green)]" : "bg-[var(--line)]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="mt-2 pr-2">
                    <div className={`text-xs font-semibold ${done ? "text-[var(--green)]" : ""}`}>
                      {phase.title}
                    </div>
                    <div className="text-xs text-[var(--muted)]">{phase.window}</div>
                    <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="lg:hidden space-y-1">
        {phases.map((phase, i) => {
          const done = !!completed[i];
          return (
            <div key={phase.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => toggleStep(i)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    done
                      ? "bg-[var(--green)] text-white"
                      : "bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                  }`}
                  title={done ? "Označit jako nedokončené" : "Označit jako hotové"}
                >
                  {done ? "\u2713" : i + 1}
                </button>
                {i < phases.length - 1 && (
                  <div
                    className={`flex-1 w-0.5 mt-1 transition-colors ${
                      done ? "bg-[var(--green)]" : "bg-[var(--line)]"
                    }`}
                  />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${done ? "text-[var(--green)]" : ""}`}>
                    {phase.title}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{phase.window}</span>
                </div>
                <p className="text-sm text-[var(--muted)] mt-0.5 leading-relaxed">
                  {phase.outcome}
                </p>
                <ul className="mt-1.5 space-y-1 text-xs text-[var(--muted)]">
                  {phase.actions.map((action) => (
                    <li key={action} className="leading-relaxed">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
