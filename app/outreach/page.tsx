import { automotiveLeads, localCompanyLeads, warmIntroLeads } from "../data";
import { LeadTabs } from "../components/lead-tabs";
import { PageCrossLinks } from "../components/page-cross-links";

const leadGroups = [
  {
    id: "automotive",
    label: "Automobilky",
    summary: "Výrobci, prodejci a finanční partneři. Tady se hledá 9místné auto.",
    leads: automotiveLeads,
  },
  {
    id: "local",
    label: "Lokální firmy",
    summary: "Regionální firmy pro měsíční partnerství nebo jednorázový příspěvek.",
    leads: localCompanyLeads,
  },
  {
    id: "warm",
    label: "Teplé kontakty",
    summary: "Kontakty přes oddíl, rodiče nebo stávající partnery. Osobní přístup, ne studený e-mail.",
    leads: warmIntroLeads,
  },
];

export default function OutreachPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">
          Oslovení partnerů
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Koho oslovit</h1>
        <p className="mt-3 text-base text-[var(--muted)] max-w-2xl leading-relaxed">
          Automobilky pro auto, lokální firmy pro měsíční příjem, teplé
          kontakty pro rychlé propojení. Ke každému je přímý kontakt.
        </p>
      </div>

      <LeadTabs groups={leadGroups} />

      <PageCrossLinks
        links={[
          { href: "/dokumenty", label: "Hotové šablony" },
          { href: "/", label: "Zpět na strategii" },
        ]}
      />
    </div>
  );
}
