"use client";

import Link from "next/link";

import { TreeStateProvider } from "./components/tree-state-provider";
import { OutreachStateProvider } from "./components/outreach-state-provider";
import { JourneyView } from "./components/journey/journey-view";

function GuidePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 md:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent" />
        <div className="relative">
          <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
            SHIN-KYO Rychnov nad Kněžnou
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Jak získat auto pro oddíl
          </h1>
          <p className="mt-3 text-base text-[var(--muted)] max-w-xl leading-relaxed">
            Postupujte od nejlepší varianty dolů. U každé fáze najdete koho
            oslovit, jakou šablonou a jaký je postup. Když strategie nevyjde,
            označte ji jako NE a otevře se další fáze.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/kalkulacka"
              className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--background)] hover:bg-[var(--accent-hover)] transition"
            >
              Spočítat náklady
            </Link>
            <Link
              href="/podklady"
              className="rounded-lg border border-[var(--line-strong)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
            >
              Podklady a zdroje
            </Link>
          </div>
        </div>
      </div>

      {/* Journey */}
      <JourneyView />
    </div>
  );
}

export default function Home() {
  return (
    <TreeStateProvider>
      <OutreachStateProvider>
        <GuidePage />
      </OutreachStateProvider>
    </TreeStateProvider>
  );
}
