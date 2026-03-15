export function PartnerInfoBox() {
  return (
    <div className="mt-4 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold-soft)] p-4">
      <h4 className="text-sm font-bold text-[var(--gold)] mb-2">
        Co říct partnerovi
      </h4>
      <ul className="space-y-1.5 text-sm leading-relaxed">
        <li>
          <strong>Daňově výhodné:</strong> Vaše podpora jde celá do nákladů firmy
          jako reklama — je to výhodnější než dar.
        </li>
        <li>
          <strong>Viditelnost:</strong> Logo na 9místném autě, webu oddílu,
          sociálních sítích a při soutěžích po celé ČR.
        </li>
        <li>
          <strong>Bez starostí:</strong> Pošleme smlouvu a fakturu — váš účetní
          to zaúčtuje jako náklad na reklamu.
        </li>
      </ul>
    </div>
  );
}
