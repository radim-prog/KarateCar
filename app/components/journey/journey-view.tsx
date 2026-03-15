"use client";

import { useMemo } from "react";
import { PHASE_CONFIG, decisionNodes, allLeads, leadsById, templatesById, documentTemplates, fundingSources } from "../../data";
import type { DecisionNode, Lead, TemplateBlock, FundingSource } from "../../data";
import { useTreeState } from "../tree-state-provider";
import { JourneyProgress } from "./journey-progress";
import { PhaseSection } from "./phase-section";
import { JourneySummary } from "./journey-summary";

const nodesById = new Map(decisionNodes.map((n) => [n.id, n]));

export function JourneyView() {
  const { state } = useTreeState();

  // All phases are always visible and accessible
  function isPhaseActive(_index: number): boolean {
    return true;
  }

  // Resolve data for each phase
  const phasesData = useMemo(() => {
    return PHASE_CONFIG.map((phase, index) => {
      const nodes = phase.nodeIds
        .map((id) => nodesById.get(id))
        .filter((n): n is DecisionNode => n !== undefined);

      // Collect unique lead IDs from all nodes in this phase
      const leadIds = new Set<string>();
      for (const node of nodes) {
        if (node.relatedLeadIds) {
          for (const lid of node.relatedLeadIds) leadIds.add(lid);
        }
      }
      const leads = Array.from(leadIds)
        .map((id) => leadsById.get(id))
        .filter((l): l is Lead => l !== undefined);

      // Collect unique template IDs from all nodes in this phase
      const templateIds = new Set<string>();
      for (const node of nodes) {
        if (node.relatedTemplateIds) {
          for (const tid of node.relatedTemplateIds) templateIds.add(tid);
        }
      }
      const templates = Array.from(templateIds)
        .map((id) => templatesById.get(id))
        .filter((t): t is TemplateBlock => t !== undefined);

      // Collect funding sources linked to this phase's nodes
      const phaseFunding = fundingSources.filter((fs) =>
        phase.nodeIds.includes(fs.linkedNodeId),
      );

      return { phase, index, nodes, leads, templates, fundingSources: phaseFunding };
    });
  }, []);

  return (
    <div className="space-y-6">
      <JourneyProgress phases={PHASE_CONFIG} nodesById={nodesById} />

      {/* Phase connector + sections */}
      {phasesData.map((pd, i) => (
        <div key={pd.phase.id}>
          {/* Connector between phases */}
          {i > 0 && (
            <div className={`phase-connector ${isPhaseActive(i) ? "lit" : ""}`}>
              <div className="phase-connector-line" />
              <span className="phase-connector-label">NE</span>
              <div className="phase-connector-line" />
            </div>
          )}

          <PhaseSection
            phase={pd.phase}
            index={pd.index}
            active={isPhaseActive(i)}
            nodes={pd.nodes}
            leads={pd.leads}
            templates={pd.templates}
            fundingSources={pd.fundingSources}
          />
        </div>
      ))}

      <JourneySummary allNodes={decisionNodes} />
    </div>
  );
}
