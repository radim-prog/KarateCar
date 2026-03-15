"use client";

import type { VehicleOption } from "../../data";
import { fmt } from "../../lib/format";

type FinancingTab = "cash" | "lease" | "loan";

type FinancingTabsProps = {
  vehicle: VehicleOption;
  activeTab: FinancingTab;
  onTabChange: (tab: FinancingTab) => void;
};

export type { FinancingTab };

export function FinancingTabs({ vehicle, activeTab, onTabChange }: FinancingTabsProps) {
  const tab = activeTab;
  const setTab = onTabChange;

  const tabs: { id: FinancingTab; label: string; available: boolean }[] = [
    { id: "cash", label: "Hotovost", available: true },
    {
      id: "lease",
      label: "Operativní leasing",
      available: vehicle.leaseMonthly !== null,
    },
    {
      id: "loan",
      label: "Úvěr",
      available: vehicle.loanMonthly !== null,
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">Financování</h2>

      {/* Tab bar */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs
          .filter((t) => t.available)
          .map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)]"
              }`}
            >
              {t.label}
            </button>
          ))}
      </div>

      {/* Tab content */}
      {tab === "cash" && (
        <div className="space-y-3">
          <Row label="Cena bez DPH" value={fmt(vehicle.cashPrice)} bold />
          <Row
            label="Cena s DPH"
            value={fmt(vehicle.cashPriceWithDph)}
            muted
          />
          <p className="text-xs text-[var(--muted)] mt-3">
            Jednorázový nákup. Žádné měsíční splátky, ale nutnost mít celou
            částku k dispozici.
          </p>
        </div>
      )}

      {tab === "lease" && vehicle.leaseMonthly && (
        <div className="space-y-3">
          <Row
            label="Měsíční splátka"
            value={fmt(vehicle.leaseMonthly)}
            bold
            accent
          />
          <Row
            label="Doba leasingu"
            value={`${vehicle.leaseTerm} měsíců`}
          />
          <Row label="Akontace" value={fmt(vehicle.leaseDeposit)} />
          <Row
            label="Celkem za leasing"
            value={fmt(
              vehicle.leaseMonthly * (vehicle.leaseTerm ?? 60) +
                vehicle.leaseDeposit,
            )}
            muted
          />
          <p className="text-xs text-[var(--muted)] mt-3">
            Operativní leasing zahrnuje servis, pojištění a gumy. Na konci se
            vůz vrací.
          </p>
        </div>
      )}

      {tab === "loan" && vehicle.loanMonthly && (
        <div className="space-y-3">
          <Row
            label="Měsíční splátka"
            value={fmt(vehicle.loanMonthly)}
            bold
            accent
          />
          <Row label="Doba úvěru" value={`${vehicle.loanTerm} měsíců`} />
          <Row label="Akontace" value={fmt(vehicle.loanDeposit)} />
          <Row
            label="Celkem za úvěr"
            value={fmt(
              vehicle.loanMonthly * (vehicle.loanTerm ?? 60) +
                vehicle.loanDeposit,
            )}
            muted
          />
          <p className="text-xs text-[var(--muted)] mt-3">
            Klasický úvěr — vůz po splacení přejde do vlastnictví oddílu.
            Servis a pojištění hradíte zvlášť.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-[var(--muted)]" : ""}`}>
        {label}
      </span>
      <span
        className={`text-sm ${bold ? "font-bold" : "font-medium"} ${
          accent
            ? "text-[var(--accent)] text-lg"
            : muted
              ? "text-[var(--muted)]"
              : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
