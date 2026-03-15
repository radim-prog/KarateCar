"use client";

import { useEffect, useRef, useState } from "react";

import { fundingSources, vehicleOptions } from "../data";
import { TreeStateProvider, useTreeState } from "../components/tree-state-provider";
import { VehicleSelector } from "../components/calculator/vehicle-selector";
import { FinancingTabs } from "../components/calculator/financing-tabs";
import type { FinancingTab } from "../components/calculator/financing-tabs";
import { RunningCosts } from "../components/calculator/running-costs";
import { FundingStack } from "../components/calculator/funding-stack";
import { MonthlyBalance } from "../components/calculator/monthly-balance";
import { PageCrossLinks } from "../components/page-cross-links";

function getMonthlyPayment(
  vehicle: (typeof vehicleOptions)[number],
  tab: FinancingTab,
): number {
  if (tab === "lease" && vehicle.leaseMonthly) return vehicle.leaseMonthly;
  if (tab === "loan" && vehicle.loanMonthly) return vehicle.loanMonthly;
  return 0;
}

function Calculator() {
  const [selectedId, setSelectedId] = useState(vehicleOptions[0]?.id ?? "");
  const [financingTab, setFinancingTab] = useState<FinancingTab>("lease");
  const [runningTotal, setRunningTotal] = useState(0);
  const { state } = useTreeState();

  const selected =
    vehicleOptions.find((v) => v.id === selectedId) ?? vehicleOptions[0];

  // Reset financing tab when vehicle changes
  useEffect(() => {
    if (!selected) return;
    if (selected.leaseMonthly) {
      setFinancingTab("lease");
    } else if (selected.loanMonthly) {
      setFinancingTab("loan");
    } else {
      setFinancingTab("cash");
    }
  }, [selected?.id]);

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

  const monthlyPayment = getMonthlyPayment(selected, financingTab);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kalkulačka</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Vyberte vůz, zvolte typ financování a uvidíte reálné měsíční náklady.
          Zdroje financování se napojují na rozhodovací strom z hlavní stránky —
          čím víc strategií označíte jako ANO, tím víc zdrojů se promítne do
          bilance.
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
        <FinancingTabs
          vehicle={selected}
          activeTab={financingTab}
          onTabChange={setFinancingTab}
        />
        <RunningCosts
          vehicle={selected}
          financingType={financingTab}
          onTotalChange={handleRunningTotalChange}
        />
      </div>

      {/* Monthly balance */}
      {financingTab !== "cash" && (
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
          { href: "/outreach", label: "Kontakty a oslovení" },
          { href: "/dokumenty", label: "Hotové šablony" },
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
