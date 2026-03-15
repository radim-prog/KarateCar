import type { VehicleOption } from "../../data";
import { fmt } from "../../lib/format";

type RunningCostsProps = {
  vehicle: VehicleOption;
  onTotalChange?: (total: number) => void;
};

export function RunningCosts({ vehicle, onTotalChange }: RunningCostsProps) {
  const costs = vehicle.runningCosts;

  const items = [
    { label: "Pojištění", value: costs.insurance, includedInLease: true },
    { label: "Palivo", value: costs.fuel, includedInLease: false },
    { label: "Servis", value: costs.service, includedInLease: true },
    { label: "Gumy", value: costs.tires, includedInLease: true },
    { label: "Ostatní", value: costs.other, includedInLease: false },
  ];

  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (onTotalChange) {
    onTotalChange(total);
  }

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">
        Měsíční provozní náklady
      </h2>

      <div className="space-y-2 mb-4">
        {items.map((item) => {
          const pct = total > 0 ? (item.value / total) * 100 : 0;
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className={item.includedInLease ? "text-[var(--muted)]/50" : "text-[var(--muted)]"}>
                  {item.label}
                  {item.includedInLease && (
                    <span className="ml-1.5 text-xs opacity-60">
                      (v leasingu zahrnuto)
                    </span>
                  )}
                </span>
                <span className={`font-medium ${item.includedInLease ? "text-[var(--muted)]/50" : ""}`}>
                  {fmt(item.value)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[var(--line)]">
                <div
                  className={`h-full rounded-full transition-all ${item.includedInLease ? "bg-[var(--muted)]/30" : "bg-[var(--accent)]"}`}
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
