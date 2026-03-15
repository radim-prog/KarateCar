import { automotiveLeads, localCompanyLeads, communityLeads } from "../data";
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
    id: "community",
    label: "Rodiče a oddíl",
    summary: "Osobní oslovení rodičů, členů a stávajících partnerů oddílu.",
    leads: communityLeads,
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
          Automobilky pro auto, lokální firmy pro měsíční příjem, rodiče a oddíl
          pro osobní propojení. Ke každému je přímý kontakt a sledování stavu.
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
