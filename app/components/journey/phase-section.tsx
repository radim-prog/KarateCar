"use client";

import { useState } from "react";
import type { PhaseConfig, DecisionNode, Lead, TemplateBlock, FundingSource } from "../../data";
import { useTreeState } from "../tree-state-provider";
import { useOutreachState } from "../outreach-state-provider";
import { PhaseNodeDetail } from "./phase-node-detail";
import { PipelineView } from "../pipeline-view";
import { PartnerInfoBox } from "./partner-info-box";
import type { LeadStatus } from "../../data";

// Fáze kde se jedná s firmami a partner-info-box dává smysl
const PARTNER_INFO_PHASES = new Set(["faze-3", "faze-4", "faze-5"]);

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  ceka: { label: "Čeká", color: "text-[var(--muted)]", bg: "bg-[var(--surface-raised)]" },
  osloveno: { label: "Osloveno", color: "text-blue-400", bg: "bg-blue-500/10" },
  odpoved: { label: "Odpověď", color: "text-[var(--accent)]", bg: "bg-[var(--accent-soft)]" },
  schuzka: { label: "Schůzka", color: "text-[var(--gold)]", bg: "bg-[var(--gold-soft)]" },
  dohodnuto: { label: "Dohodnuto", color: "text-[var(--green)]", bg: "bg-[var(--green-soft)]" },
  odmitli: { label: "Odmítli", color: "text-red-400", bg: "bg-red-500/10" },
};

const STATUS_ORDER: LeadStatus[] = ["ceka", "osloveno", "odpoved", "schuzka", "dohodnuto", "odmitli"];

type PhaseSectionProps = {
  phase: PhaseConfig;
  index: number;
  active: boolean;
  nodes: DecisionNode[];
  leads: Lead[];
  templates: TemplateBlock[];
  fundingSources: FundingSource[];
};

export function PhaseSection({ phase, index, active, nodes, leads, templates, fundingSources }: PhaseSectionProps) {
  const { state } = useTreeState();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null;

  const evaluated = nodes.filter((n) => state.outcomes[n.id] && state.outcomes[n.id] !== "pending").length;
  const hasAno = nodes.some((n) => state.outcomes[n.id] === "ano");

  function toggleSection(key: string) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleCopy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch { setCopied(null); }
  }

  // Locked phase
  if (!active) {
    return (
      <div id={phase.id} className="phase-section phase-locked" style={{ "--phase-color": phase.color } as React.CSSProperties}>
        <div className="phase-header">
          <div className="flex items-center gap-3">
            <span className="phase-label" style={{ color: phase.color }}>{phase.label}</span>
            <span className="text-sm font-semibold text-[var(--muted)]">{phase.name}</span>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1 opacity-50">
            Odemkne se po označení předchozí fáze
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id={phase.id} className="phase-section" style={{ "--phase-color": phase.color } as React.CSSProperties}>
      {/* Header */}
      <div className="phase-header">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="phase-label" style={{ color: phase.color }}>{phase.label}</span>
            <span className="text-base font-semibold">{phase.name}</span>
            {hasAno && (
              <span className="text-xs font-bold text-[var(--green)] bg-[var(--green-soft)] px-2 py-0.5 rounded">
                POTVRZENO
              </span>
            )}
          </div>
          <span className="text-xs text-[var(--muted)]">
            {evaluated}/{nodes.length} prověřeno
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] mt-1">{phase.description}</p>
      </div>

      {/* Node cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {nodes.map((node) => {
          const outcome = state.outcomes[node.id] ?? "pending";
          const isSelected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
              className={`bracket-card ${outcome} ${isSelected ? "selected" : ""}`}
            >
              <div className="bracket-card-row">
                {outcome !== "pending" && <span className={`bracket-card-dot ${outcome}`} />}
                <span className="bracket-card-name">{node.label}</span>
              </div>
              <span className="bracket-card-value">{node.estimatedValue}</span>
              <span className="bracket-card-time">{node.estimatedTimeframe}</span>
            </button>
          );
        })}
      </div>

      {/* Selected node detail */}
      {selectedNode && (
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold">{selectedNode.label}</h3>
            <button
              type="button"
              onClick={() => setSelectedNodeId(null)}
              className="shrink-0 w-8 h-8 rounded-lg border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition text-lg leading-none"
            >
              &times;
            </button>
          </div>
          <PhaseNodeDetail node={selectedNode} />
        </div>
      )}

      {/* Leads section */}
      {leads.length > 0 && (
        <CollapsibleSection
          title={`Koho oslovit (${leads.length})`}
          sectionKey="leads"
          expanded={expandedSections.leads ?? false}
          onToggle={() => toggleSection("leads")}
        >
          <div className="space-y-2">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Partner info */}
      {PARTNER_INFO_PHASES.has(phase.id) && leads.length > 0 && <PartnerInfoBox />}

      {/* Templates section */}
      {templates.length > 0 && (
        <CollapsibleSection
          title={`Šablony (${templates.length})`}
          sectionKey="templates"
          expanded={expandedSections.templates ?? false}
          onToggle={() => toggleSection("templates")}
        >
          <div className="space-y-4">
            {templates.map((t) => (
              <div key={t.id} className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-sm font-semibold">{t.label}</div>
                    <div className="text-xs text-[var(--muted)]">{t.summary}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(t.id, t.body)}
                    className="shrink-0 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--accent-hover)] transition"
                  >
                    {copied === t.id ? "Zkopírováno!" : "Kopírovat"}
                  </button>
                </div>
                {t.pipeline.length > 0 && <PipelineView steps={t.pipeline} />}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Funding section */}
      {fundingSources.length > 0 && (
        <CollapsibleSection
          title="Financování"
          sectionKey="funding"
          expanded={expandedSections.funding ?? false}
          onToggle={() => toggleSection("funding")}
        >
          <div className="space-y-2">
            {fundingSources.map((fs) => {
              const outcome = state.outcomes[fs.linkedNodeId] ?? "pending";
              return (
                <div key={fs.id} className="flex items-center justify-between text-sm rounded-lg border border-[var(--line)] px-4 py-2.5">
                  <div>
                    <span className="font-medium">{fs.label}</span>
                    <span className="text-xs text-[var(--muted)] ml-2">{fs.note}</span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-xs font-semibold text-[var(--accent)]">
                      {(fs.estimatedMin / 1000).toFixed(0)}–{(fs.estimatedMax / 1000).toFixed(0)} tis. Kč
                    </div>
                    {outcome !== "pending" && (
                      <span className={`text-xs ${outcome === "ano" ? "text-[var(--green)]" : outcome === "podminka" ? "text-[var(--gold)]" : "text-[var(--muted)]"}`}>
                        {outcome === "ano" ? "Potvrzeno" : outcome === "podminka" ? "S podmínkou" : "Zamítnuto"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

function CollapsibleSection({ title, sectionKey, expanded, onToggle, children }: {
  title: string; sectionKey: string; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border border-[var(--line)] overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition bg-[var(--surface)]"
      >
        {title}
        <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>&#9660;</span>
      </button>
      {expanded && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const { statuses, setLeadStatus } = useOutreachState();
  const current = statuses[lead.name] ?? "ceka";
  const config = STATUS_CONFIG[current];

  function cycleStatus() {
    const idx = STATUS_ORDER.indexOf(current);
    setLeadStatus(lead.name, STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]);
  }

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3">
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-sm font-semibold">{lead.name}</span>
        <button
          type="button"
          onClick={cycleStatus}
          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
          title="Klikněte pro změnu stavu"
        >
          {config.label}
        </button>
      </div>
      <p className="text-xs text-[var(--muted)] leading-relaxed">{lead.angle}</p>
      <p className="text-xs mt-1"><span className="font-medium">Požádat o:</span> {lead.ask}</p>
    </div>
  );
}
