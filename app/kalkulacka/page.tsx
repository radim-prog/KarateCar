"use client";

import { useRef, useState } from "react";

import { fundingSources, vehicleOptions } from "../data";
import { TreeStateProvider, useTreeState } from "../components/tree-state-provider";
import { VehicleSelector } from "../components/calculator/vehicle-selector";
import { FinancingOverview } from "../components/calculator/financing-overview";
import { RunningCosts } from "../components/calculator/running-costs";
import { FundingStack } from "../components/calculator/funding-stack";
import { MonthlyBalance } from "../components/calculator/monthly-balance";
import { PageCrossLinks } from "../components/page-cross-links";

function Calculator() {
  const [selectedId, setSelectedId] = useState(vehicleOptions[0]?.id ?? "");
  const [runningTotal, setRunningTotal] = useState(0);
  const { state } = useTreeState();

  const selected =
    vehicleOptions.find((v) => v.id === selectedId) ?? vehicleOptions[0];

  // Compute monthly funding from active sources (only recurring ones)
  const monthlyFundingSources = fundingSources.filter((fs) => {
    const outcome = state.outcomes[fs.linkedNodeId];
    return (
      (outcome === "ano" || outcome === "podminka") &&
      fs.type === "partners"
    );
  });
  const monthlyFunding = monthlyFundingSources.reduce(
    (sum, fs) => sum + (fs.estimatedMin + fs.estimatedMax) / 2 / 12,
    0,
  );

  // Use ref to avoid re-render loop from onTotalChange callback
  const runningTotalRef = useRef(0);
  const handleRunningTotalChange = (total: number) => {
    if (total !== runningTotalRef.current) {
      runningTotalRef.current = total;
      setRunningTotal(total);
    }
  };

  if (!selected) return null;

  // Use the best available monthly payment for balance
  const monthlyPayment = selected.leaseMonthly ?? selected.loanMonthly ?? 0;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
          Financování a náklady
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Kolik to bude stát</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Vyberte auto a uvidíte všechny varianty financování i měsíční provoz
          na jednom místě. Zdroje se napojují na rozhodovací strom — čím víc
          strategií označíte, tím víc zdrojů se promítne do bilance.
        </p>
      </div>

      {/* Vehicle selection */}
      <VehicleSelector
        vehicles={vehicleOptions}
        selectedId={selected.id}
        onSelect={setSelectedId}
      />

      {/* Financing overview + running costs side by side on desktop */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FinancingOverview vehicle={selected} />
        <RunningCosts
          vehicle={selected}
          onTotalChange={handleRunningTotalChange}
        />
      </div>

      {/* Monthly balance */}
      {monthlyPayment > 0 && (
        <MonthlyBalance
          monthlyPayment={monthlyPayment}
          runningCosts={runningTotal}
          monthlyFunding={monthlyFunding}
        />
      )}

      {/* Funding stack */}
      <FundingStack targetPrice={selected.cashPrice} />

      {/* Cross links */}
      <PageCrossLinks
        links={[
          { href: "/", label: "Zpět na průvodce" },
          { href: "/podklady", label: "Zdroje a podklady" },
        ]}
      />

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
