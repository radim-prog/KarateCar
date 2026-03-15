"use client";

import { useState, type ReactNode } from "react";

import type { Lead, LeadStatus } from "../data";
import { OutreachStateProvider, useOutreachState } from "./outreach-state-provider";

type LeadGroup = {
  id: string;
  label: string;
  summary: string;
  leads: Lead[];
};

type LeadTabsProps = {
  groups: LeadGroup[];
};

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  ceka: { label: "Čeká", color: "text-[var(--muted)]", bg: "bg-[var(--surface-raised)]" },
  osloveno: { label: "Osloveno", color: "text-blue-400", bg: "bg-blue-500/10" },
  odpoved: { label: "Odpověď", color: "text-[var(--accent)]", bg: "bg-[var(--accent-soft)]" },
  schuzka: { label: "Schůzka", color: "text-[var(--gold)]", bg: "bg-[var(--gold-soft)]" },
  dohodnuto: { label: "Dohodnuto", color: "text-[var(--green)]", bg: "bg-[var(--green-soft)]" },
  odmitli: { label: "Odmítli", color: "text-red-400", bg: "bg-red-500/10" },
};

const STATUS_ORDER: LeadStatus[] = ["ceka", "osloveno", "odpoved", "schuzka", "dohodnuto", "odmitli"];

function linkifyContact(text: string): ReactNode {
  const emailRe = /[\w.+-]+@[\w.-]+\.\w+/g;
  const phoneRe = /\+?\d[\d\s]{7,}/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  const matches: { index: number; length: number; value: string; type: "email" | "phone" }[] = [];

  for (const m of text.matchAll(emailRe)) {
    matches.push({ index: m.index, length: m[0].length, value: m[0], type: "email" });
  }
  for (const m of text.matchAll(phoneRe)) {
    matches.push({ index: m.index, length: m[0].length, value: m[0].trim(), type: "phone" });
  }
  matches.sort((a, b) => a.index - b.index);

  for (const match of matches) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match.type === "email") {
      parts.push(
        <a key={match.index} href={`mailto:${match.value}`} className="font-medium text-[var(--accent)] hover:underline">
          {match.value}
        </a>
      );
    } else {
      const digits = match.value.replace(/\s/g, "");
      parts.push(
        <a key={match.index} href={`tel:${digits}`} className="font-medium text-[var(--accent)] hover:underline">
          {match.value}
        </a>
      );
    }
    lastIndex = match.index + match.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function StatusBadge({ name }: { name: string }) {
  const { statuses, setLeadStatus } = useOutreachState();
  const current = statuses[name] ?? "ceka";
  const config = STATUS_CONFIG[current];

  function cycleStatus() {
    const currentIndex = STATUS_ORDER.indexOf(current);
    const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
    setLeadStatus(name, STATUS_ORDER[nextIndex]);
  }

  return (
    <button
      type="button"
      onClick={cycleStatus}
      className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition ${config.bg} ${config.color} hover:opacity-80`}
      title="Klikněte pro změnu stavu"
    >
      {config.label}
    </button>
  );
}

function LeadTabsInner({ groups }: LeadTabsProps) {
  const [selectedId, setSelectedId] = useState(groups[0]?.id ?? "");
  const active = groups.find((g) => g.id === selectedId) ?? groups[0];

  if (!active) return null;

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {groups.map((group) => {
          const isActive = group.id === active.id;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setSelectedId(group.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {group.label}
              <span className="ml-1.5 text-xs opacity-70">
                ({group.leads.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--muted)]">{active.summary}</p>

      {/* Lead list */}
      <div className="space-y-3">
        {active.leads.map((lead) => (
          <div
            key={`${active.id}-${lead.name}`}
            className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="text-base font-semibold">{lead.name}</h3>
                  <span className="text-xs text-[var(--muted)]">{lead.kind}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge name={lead.name} />
                <a
                  href={lead.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  {lead.source.label}
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div>
                <div className="font-semibold text-[var(--muted)] text-xs uppercase mb-1">
                  Proč
                </div>
                <p className="leading-relaxed">{lead.angle}</p>
              </div>
              <div>
                <div className="font-semibold text-[var(--muted)] text-xs uppercase mb-1">
                  O co požádat
                </div>
                <p className="leading-relaxed">{lead.ask}</p>
              </div>
              <div>
                <div className="font-semibold text-[var(--muted)] text-xs uppercase mb-1">
                  Kontakt
                </div>
                <p className="leading-relaxed">{linkifyContact(lead.contact)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LeadTabs(props: LeadTabsProps) {
  return (
    <OutreachStateProvider>
      <LeadTabsInner {...props} />
    </OutreachStateProvider>
  );
}
