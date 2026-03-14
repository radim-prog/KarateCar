"use client";

import { useEffect, useState } from "react";

import type { ChecklistGroup } from "../data";

const STORAGE_KEY = "karate-car-checklist";

type ProgressChecklistProps = {
  groups: ChecklistGroup[];
};

export function ProgressChecklist({ groups }: ProgressChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const totalItems = groups.reduce((sum, group) => sum + group.items.length, 0);
  const completedItems = groups.reduce(
    (sum, group) => sum + group.items.filter((item) => checked[item.id]).length,
    0,
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Checklist</h2>
        <span className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
          {completedItems}/{totalItems}
        </span>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-[var(--line)] bg-white p-4"
          >
            <div className="mb-3">
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <p className="text-xs text-[var(--muted)] mt-0.5">{group.summary}</p>
            </div>

            <div className="space-y-2">
              {group.items.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--line)] px-3 py-2.5 hover:bg-[var(--background)] transition"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded accent-[var(--accent)]"
                    checked={Boolean(checked[item.id])}
                    onChange={() =>
                      setChecked((current) => ({
                        ...current,
                        [item.id]: !current[item.id],
                      }))
                    }
                  />
                  <span
                    className={`text-sm leading-relaxed ${
                      checked[item.id] ? "text-[var(--muted)] line-through" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
