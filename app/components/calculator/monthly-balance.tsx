import { fmt } from "../../lib/format";

type MonthlyBalanceProps = {
  monthlyPayment: number;
  runningCosts: number;
  monthlyFunding: number;
};

export function MonthlyBalance({
  monthlyPayment,
  runningCosts,
  monthlyFunding,
}: MonthlyBalanceProps) {
  const totalMonthly = monthlyPayment + runningCosts;
  const diff = monthlyFunding - totalMonthly;

  return (
    <div className="rounded-xl border-2 border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-lg font-semibold mb-4">Měsíční bilance</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Měsíční splátka</span>
          <span className="font-medium">{fmt(monthlyPayment)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>+ Provozní náklady</span>
          <span className="font-medium">{fmt(runningCosts)}</span>
        </div>

        <div className="border-t border-[var(--line)] pt-2 flex justify-between text-sm font-semibold">
          <span>= Celkem měsíčně</span>
          <span className="text-base">{fmt(totalMonthly)}</span>
        </div>

        {monthlyFunding > 0 && (
          <>
            <div className="flex justify-between text-sm pt-1">
              <span>Pokryto ze zdrojů</span>
              <span className="font-medium">{fmt(monthlyFunding)}</span>
            </div>

            <div className="border-t border-[var(--line)] pt-2 flex justify-between text-sm font-bold">
              <span>{diff >= 0 ? "Přebytek" : "Schodek"}</span>
              <span
                className={`text-base ${
                  diff >= 0 ? "text-[var(--green)]" : "text-red-600"
                }`}
              >
                {diff >= 0 ? "+" : ""}
                {fmt(diff)}
              </span>
            </div>
          </>
        )}
      </div>

      {monthlyFunding === 0 && (
        <p className="mt-3 text-xs text-[var(--muted)]">
          Označte zdroje financování na hlavní stránce (ANO/PODMÍNKA), aby se
          zobrazilo pokrytí ze zdrojů.
        </p>
      )}
    </div>
  );
}
