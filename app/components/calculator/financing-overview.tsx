import type { VehicleOption } from "../../data";
import { fmt } from "../../lib/format";

type FinancingOverviewProps = {
  vehicle: VehicleOption;
};

export function FinancingOverview({ vehicle }: FinancingOverviewProps) {
  const hasLease = vehicle.leaseMonthly !== null;
  const hasLoan = vehicle.loanMonthly !== null;

  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">Financování</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th className="text-left py-2 pr-4 text-xs font-semibold text-[var(--muted)] uppercase">
                &nbsp;
              </th>
              <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)] uppercase">
                Hotovost
              </th>
              {hasLease && (
                <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)] uppercase">
                  Operativní leasing
                </th>
              )}
              {hasLoan && (
                <th className="text-right py-2 px-3 text-xs font-semibold text-[var(--muted)] uppercase">
                  Úvěr
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--line)]">
              <td className="py-2 pr-4 font-medium">Cena / splátka</td>
              <td className="py-2 px-3 text-right font-bold text-[var(--accent)]">
                {fmt(vehicle.cashPrice)}
              </td>
              {hasLease && (
                <td className="py-2 px-3 text-right font-bold text-[var(--accent)]">
                  {fmt(vehicle.leaseMonthly!)}/měs.
                </td>
              )}
              {hasLoan && (
                <td className="py-2 px-3 text-right font-bold text-[var(--accent)]">
                  {fmt(vehicle.loanMonthly!)}/měs.
                </td>
              )}
            </tr>

            <tr className="border-b border-[var(--line)]">
              <td className="py-2 pr-4 text-[var(--muted)]">Akontace</td>
              <td className="py-2 px-3 text-right text-[var(--muted)]">—</td>
              {hasLease && (
                <td className="py-2 px-3 text-right">
                  {vehicle.leaseDeposit > 0 ? fmt(vehicle.leaseDeposit) : "0 Kč"}
                </td>
              )}
              {hasLoan && (
                <td className="py-2 px-3 text-right">
                  {vehicle.loanDeposit > 0 ? fmt(vehicle.loanDeposit) : "0 Kč"}
                </td>
              )}
            </tr>

            <tr className="border-b border-[var(--line)]">
              <td className="py-2 pr-4 text-[var(--muted)]">Doba</td>
              <td className="py-2 px-3 text-right text-[var(--muted)]">—</td>
              {hasLease && (
                <td className="py-2 px-3 text-right">
                  {vehicle.leaseTerm} měsíců
                </td>
              )}
              {hasLoan && (
                <td className="py-2 px-3 text-right">
                  {vehicle.loanTerm} měsíců
                </td>
              )}
            </tr>

            <tr className="border-b border-[var(--line)]">
              <td className="py-2 pr-4 text-[var(--muted)]">Celkem</td>
              <td className="py-2 px-3 text-right text-[var(--muted)]">
                {fmt(vehicle.cashPriceWithDph)}
                <span className="block text-xs">s DPH</span>
              </td>
              {hasLease && (
                <td className="py-2 px-3 text-right text-[var(--muted)]">
                  {fmt(
                    vehicle.leaseMonthly! * (vehicle.leaseTerm ?? 60) +
                      vehicle.leaseDeposit,
                  )}
                </td>
              )}
              {hasLoan && (
                <td className="py-2 px-3 text-right text-[var(--muted)]">
                  {fmt(
                    vehicle.loanMonthly! * (vehicle.loanTerm ?? 60) +
                      vehicle.loanDeposit,
                  )}
                </td>
              )}
            </tr>

            <tr>
              <td className="py-2 pr-4 text-[var(--muted)]">Poznámka</td>
              <td className="py-2 px-3 text-xs text-[var(--muted)]">
                Celá částka najednou, žádné splátky.
              </td>
              {hasLease && (
                <td className="py-2 px-3 text-xs text-[var(--muted)]">
                  Zahrnuje servis, pojištění a gumy. Vůz se vrací.
                </td>
              )}
              {hasLoan && (
                <td className="py-2 px-3 text-xs text-[var(--muted)]">
                  Vůz po splacení přejde do vlastnictví. Servis a pojištění zvlášť.
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
