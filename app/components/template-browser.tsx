"use client";

import { useState } from "react";

import type { TemplateBlock } from "../data";
import { PipelineView } from "./pipeline-view";

type TemplateBrowserProps = {
  templates: TemplateBlock[];
};

export function TemplateBrowser({ templates }: TemplateBrowserProps) {
  const [selectedId, setSelectedId] = useState(templates[0]?.id ?? "");
  const [copied, setCopied] = useState<string | null>(null);

  const active = templates.find((t) => t.id === selectedId) ?? templates[0];

  async function handleCopy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  }

  if (!active) return null;

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {templates.map((t) => {
          const isActive = t.id === active.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Template content */}
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-semibold">{active.summary}</h2>
            {active.subject && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Předmět: <span className="font-medium text-[var(--foreground)]">{active.subject}</span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {active.subject && (
              <button
                type="button"
                onClick={() => handleCopy(`${active.id}-subject`, active.subject ?? "")}
                className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium hover:border-[var(--accent)] transition"
              >
                {copied === `${active.id}-subject` ? "Zkopírováno!" : "Kopírovat předmět"}
              </button>
            )}
            <button
              type="button"
              onClick={() => handleCopy(`${active.id}-body`, active.body)}
              className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition"
            >
              {copied === `${active.id}-body` ? "Zkopírováno!" : "Kopírovat text"}
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Body */}
          <div className="rounded-lg bg-[var(--background)] p-4">
            <pre className="whitespace-pre-wrap text-sm leading-7 text-[var(--foreground)] font-[family-name:var(--font-outfit)]">
              {active.body}
            </pre>
          </div>

          {/* Usage tips */}
          <div className="rounded-lg border border-[var(--line)] p-4">
            <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wide mb-3">
              Jak použít
            </h3>
            <ul className="space-y-2 text-sm text-[var(--foreground)] leading-relaxed">
              {active.usage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pipeline */}
        {active.pipeline.length > 0 && (
          <PipelineView steps={active.pipeline} />
        )}
      </div>
    </div>
  );
}
