import type { VehicleOption } from "../../data";
import type { FinancingTab } from "./financing-tabs";
import { fmt } from "../../lib/format";

type RunningCostsProps = {
  vehicle: VehicleOption;
  financingType: FinancingTab;
  onTotalChange?: (total: number) => void;
};

export function RunningCosts({ vehicle, financingType, onTotalChange }: RunningCostsProps) {
  const costs = vehicle.runningCosts;
  const isLease = financingType === "lease";

  const items = [
    { label: "Pojištění", value: costs.insurance, includedInLease: true },
    { label: "Palivo", value: costs.fuel, includedInLease: false },
    { label: "Servis", value: costs.service, includedInLease: true },
    { label: "Gumy", value: costs.tires, includedInLease: true },
    { label: "Ostatní", value: costs.other, includedInLease: false },
  ];

  const visibleItems = items.filter((item) => !(isLease && item.includedInLease));
  const total = visibleItems.reduce((sum, item) => sum + item.value, 0);

  if (onTotalChange) {
    onTotalChange(total);
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">
        Měsíční provozní náklady
      </h2>

      {isLease && (
        <div className="mb-4 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-xs text-[var(--accent)] font-medium">
          Pojištění, servis a gumy jsou zahrnuty v leasingové splátce.
        </div>
      )}

      <div className="space-y-2 mb-4">
        {visibleItems.map((item) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-[var(--muted)]">{item.label}</span>
                <span className="font-medium">{fmt(item.value)}</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--line)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--line)] pt-3">
        <span className="text-sm font-semibold">Celkem měsíčně</span>
        <span className="text-lg font-bold text-[var(--accent)]">
          {fmt(total)}
        </span>
      </div>
    </div>
  );
}
