import { documentTemplates } from "../data";
import { TemplateBrowser } from "../components/template-browser";
import { PageCrossLinks } from "../components/page-cross-links";

export default function DokumentyPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
          Připravené texty
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Šablony</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Vyber šablonu, zkopíruj text a uprav jen jméno, roli a kontakty.
          Jsou tu i follow-up skripty pro telefon.
        </p>
      </div>

      <TemplateBrowser templates={documentTemplates} />

      <PageCrossLinks
        links={[
          { href: "/outreach", label: "Kontakty a oslovení" },
          { href: "/", label: "Zpět na strategii" },
        ]}
      />
    </div>
  );
}
