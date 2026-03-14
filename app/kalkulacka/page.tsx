"use client";

import { useState } from "react";

import { vehicleOptions } from "../data";
import { TreeStateProvider } from "../components/tree-state-provider";
import { VehicleSelector } from "../components/calculator/vehicle-selector";
import { FinancingTabs } from "../components/calculator/financing-tabs";
import { RunningCosts } from "../components/calculator/running-costs";
import { FundingStack } from "../components/calculator/funding-stack";

function Calculator() {
  const [selectedId, setSelectedId] = useState(vehicleOptions[0]?.id ?? "");
  const selected =
    vehicleOptions.find((v) => v.id === selectedId) ?? vehicleOptions[0];

  if (!selected) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kalkulačka</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Vyberte konkrétní vůz, porovnejte financování a zjistěte reálné
          měsíční náklady. Zdroje financování se napojují na rozhodovací strom
          z hlavní stránky.
        </p>
      </div>

      {/* Vehicle selection */}
      <VehicleSelector
        vehicles={vehicleOptions}
        selectedId={selected.id}
        onSelect={setSelectedId}
      />

      {/* Financing + running costs side by side on desktop */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FinancingTabs vehicle={selected} />
        <RunningCosts vehicle={selected} />
      </div>

      {/* Funding stack */}
      <FundingStack targetPrice={selected.cashPrice} />

      {/* Source link */}
      <div className="text-xs text-[var(--muted)]">
        Zdroj:{" "}
        <a
          href={selected.source.url}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          {selected.source.label}
        </a>
        {" — "}
        {selected.source.note}
      </div>
    </div>
  );
}

export default function KalkulackaPage() {
  return (
    <TreeStateProvider>
      <Calculator />
    </TreeStateProvider>
  );
}
