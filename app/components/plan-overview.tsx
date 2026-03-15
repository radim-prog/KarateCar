"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const planSteps = [
  {
    number: 1,
    label: "Strategie",
    description: "Projděte rozhodovací strom a zvolte cestu k autu.",
    href: "/",
  },
  {
    number: 2,
    label: "Náklady",
    description: "Spočítejte pořízení, splátky a měsíční provoz.",
    href: "/kalkulacka",
  },
  {
    number: 3,
    label: "Kontakty",
    description: "Oslovte automobilky, firmy a teplé kontakty.",
    href: "/outreach",
  },
  {
    number: 4,
    label: "Šablony",
    description: "Vezměte hotové e-maily a skripty pro jednání.",
    href: "/dokumenty",
  },
  {
    number: 5,
    label: "Podklady",
    description: "Časová osa, instituce, daně a zdroje na jednom místě.",
    href: "/podklady",
  },
];

export function PlanOverview() {
  const pathname = usePathname();

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Plán krok za krokem</h2>
      <div className="grid gap-2 sm:grid-cols-5">
        {planSteps.map((step) => {
          const active = pathname === step.href;
          return (
            <Link
              key={step.href}
              href={step.href}
              className={`rounded-xl border-2 p-4 transition block ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-white hover:border-[var(--accent)]/50"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold mb-2 ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--line)] text-[var(--muted)]"
                }`}
              >
                {step.number}
              </div>
              <div className="text-sm font-semibold">{step.label}</div>
              <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">
                {step.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
