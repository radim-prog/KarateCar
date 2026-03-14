import type { VehicleOption } from "../../data";

function fmt(value: number) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(value);
}

type RunningCostsProps = {
  vehicle: VehicleOption;
};

export function RunningCosts({ vehicle }: RunningCostsProps) {
  const costs = vehicle.runningCosts;
  const total =
    costs.insurance + costs.fuel + costs.service + costs.tires + costs.other;

  const items = [
    { label: "Pojištění", value: costs.insurance },
    { label: "Palivo", value: costs.fuel },
    { label: "Servis", value: costs.service },
    { label: "Gumy", value: costs.tires },
    { label: "Ostatní", value: costs.other },
  ];

  return (
    <div className="rounded-xl border border-[var(--line)] bg-white p-5">
      <h2 className="text-lg font-semibold mb-4">
        Měsíční provozní náklady
      </h2>

      <div className="space-y-2 mb-4">
        {items.map((item) => {
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
