import { actionPhases, legalNotes, sources } from "../data";
import { VisualTimeline } from "../components/visual-timeline";
import { PageCrossLinks } from "../components/page-cross-links";

const sourceCategories = ["Oddíl", "Dotace", "Automobilky", "Právní"] as const;

const groupedSources = sourceCategories.reduce<Record<string, typeof sources>>(
  (acc, cat) => {
    acc[cat] = sources.filter((s) => s.category === cat);
    return acc;
  },
  {},
);

export default function PodkladyPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
          Reference a podpora
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Zdroje a podklady</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Časová osa, praktické informace pro jednání s firmami a všechny
          oficiální odkazy. Tuhle stránku otevři, když potřebuješ oporu pro rozhodnutí.
        </p>
      </div>

      {/* Visual Timeline */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Časová osa</h2>
        <VisualTimeline phases={actionPhases} />
      </section>

      {/* Partner guide */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Jak to funguje pro partnera</h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Když jdete za firmou, potřebujete vědět tři věci: co nabídnete,
          jak to funguje daňově, a jak nastavit účetnictví. Tady je vše pohromadě.
        </p>
        <div className="space-y-4">
          {legalNotes.map((note) => (
            <div
              key={note.title}
              className="rounded-xl border border-[var(--line)] border-l-4 border-l-amber-400 bg-[var(--surface)] p-5"
            >
              <div className="text-base font-semibold">{note.title}</div>

              {/* Co říct partnerovi — výrazný box */}
              <div className="mt-3 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/20 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-wide text-[var(--accent)] mb-1">
                  Co říct partnerovi
                </div>
                <p className="text-sm font-medium">{note.forPartner}</p>
              </div>

              {/* Klíčové pravidlo */}
              <div className="mt-3 rounded-md bg-[var(--gold-soft)] px-3 py-1.5 text-sm font-medium text-[var(--gold)]">
                {note.keyRule}
              </div>

              {/* Detail — safe: content is hardcoded in data.ts, not user input */}
              <p
                className="mt-3 text-sm text-[var(--muted)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: note.text }}
              />

              <a
                href={note.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
              >
                {note.source.label}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Cross links */}
      <PageCrossLinks
        links={[
          { href: "/", label: "Zpět na průvodce" },
          { href: "/kalkulacka", label: "Náklady" },
        ]}
      />

      {/* Sources - grouped by category */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Všechny zdroje</h2>
        <div className="space-y-4">
          {sourceCategories.map((cat) => {
            const catSources = groupedSources[cat];
            if (!catSources || catSources.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-2">
                  {cat}
                </h3>
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)]">
                  {catSources.map((source) => (
                    <div key={source.url} className="px-4 py-3">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[var(--accent)] hover:underline"
                      >
                        {source.label}
                      </a>
                      <p className="mt-0.5 text-xs text-[var(--muted)]">{source.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
