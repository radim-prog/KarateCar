"use client";

import type { VehicleOption } from "../../data";
import { fmt } from "../../lib/format";

type VehicleSelectorProps = {
  vehicles: VehicleOption[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function VehicleSelector({
  vehicles,
  selectedId,
  onSelect,
}: VehicleSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Vyberte vůz</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {vehicles.map((v) => {
          const active = v.id === selectedId;
          const conditionLabel =
            v.condition === "new"
              ? "Nový"
              : v.condition === "demo"
                ? "Předváděcí"
                : "Ojetý";
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              className={`text-left rounded-xl border-2 p-4 transition ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[var(--muted)] uppercase">
                  {v.brand} &middot; {v.capacity}
                </span>
                <span
                  className={`text-xs rounded-md px-2 py-0.5 font-medium ${
                    v.condition === "used"
                      ? "bg-[var(--gold-soft)] text-[var(--gold)]"
                      : "bg-[var(--green-soft)] text-[var(--green)]"
                  }`}
                >
                  {conditionLabel}
                </span>
              </div>
              <h3 className="text-base font-semibold">{v.label}</h3>
              <p className="mt-2 text-lg font-bold text-[var(--accent)]">
                {fmt(v.cashPrice)}{" "}
                <span className="text-xs font-normal text-[var(--muted)]">
                  bez DPH
                </span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
