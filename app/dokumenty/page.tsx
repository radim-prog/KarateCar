import { documentTemplates } from "../data";
import { TemplateBrowser } from "../components/template-browser";

export default function DokumentyPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Šablony</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Vyber šablonu, zkopíruj text a uprav jen jméno, roli a kontakty.
          Jsou tu i follow-up skripty pro telefon.
        </p>
      </div>

      <TemplateBrowser templates={documentTemplates} />
    </div>
  );
}
