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
    description: "Oslovte automobilky, firmy, rodiče a partnery oddílu.",
    href: "/outreach",
  },
  {
    number: 4,
    label: "Šablony",
    description: "Hotové e-maily, skripty pro navázání a postup po odeslání.",
    href: "/dokumenty",
  },
  {
    number: 5,
    label: "Podklady",
    description: "Vizuální časová osa, daně a všechny zdroje na jednom místě.",
    href: "/podklady",
  },
];

export function PlanOverview() {
  const pathname = usePathname();

  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-4">
        Plán krok za krokem
      </h2>
      <div className="grid gap-3 sm:grid-cols-5">
        {planSteps.map((step) => {
          const active = pathname === step.href;
          return (
            <Link
              key={step.href}
              href={step.href}
              className={`group relative rounded-xl border p-4 transition-all block ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-glow)]"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold mb-2.5 ${
                  active
                    ? "bg-[var(--accent)] text-[var(--background)]"
                    : "bg-[var(--surface-raised)] text-[var(--muted)] group-hover:text-[var(--foreground)]"
                }`}
              >
                {step.number}
              </div>
              <div className={`text-sm font-semibold ${active ? "text-[var(--accent)]" : ""}`}>
                {step.label}
              </div>
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
