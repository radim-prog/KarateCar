export type SourceLink = {
  label: string;
  url: string;
  note: string;
  category?: string;
};

export type ActionPhase = {
  title: string;
  window: string;
  outcome: string;
  actions: string[];
};

export type LeadStatus = "ceka" | "osloveno" | "odpoved" | "schuzka" | "dohodnuto" | "odmitli";

export type PipelineStep = {
  order: number;
  label: string;
  timing: string;
  description: string;
};

export type LegalNote = {
  title: string;
  keyRule: string;
  text: string;
  forPartner: string;
  source: SourceLink;
};

export type Lead = {
  id: string;
  name: string;
  kind: string;
  angle: string;
  ask: string;
  contact: string;
  source: SourceLink;
  status?: LeadStatus;
};

export type PhaseConfig = {
  id: string;
  label: string;
  name: string;
  color: string;
  nodeIds: string[];
  description: string;
};

export type TemplateBlock = {
  id: string;
  label: string;
  subject?: string;
  summary: string;
  body: string;
  usage: string[];
  pipeline: PipelineStep[];
};

// ── Decision Tree Types ──

export type NodeOutcome = "pending" | "ano" | "ne" | "podminka";

export type DecisionNode = {
  id: string;
  tier: number;
  order: number;
  label: string;
  headline: string;
  description: string;
  estimatedValue: string;
  estimatedTimeframe: string;
  difficulty: "low" | "medium" | "high";
  probability: "low" | "medium" | "high";
  complementaryIds: string[];
  steps: string[];
  risks: string[];
  nextMoveOnAno: string;
  nextMoveOnNe: string;
  nextMoveOnPodminka: string;
  relatedLeadIds?: string[];
  relatedTemplateIds?: string[];
};

export type VehicleOption = {
  id: string;
  label: string;
  brand: string;
  capacity: string;
  cashPrice: number;
  cashPriceWithDph: number;
  leaseMonthly: number | null;
  leaseTerm: number | null;
  leaseDeposit: number;
  loanMonthly: number | null;
  loanTerm: number | null;
  loanDeposit: number;
  condition: "new" | "demo" | "used";
  runningCosts: {
    insurance: number;
    fuel: number;
    service: number;
    tires: number;
    other: number;
  };
  source: SourceLink;
};

export type FundingSource = {
  id: string;
  label: string;
  type: "corporate" | "grant" | "partners" | "crowdfunding" | "own";
  estimatedMin: number;
  estimatedMax: number;
  probability: "low" | "medium" | "high";
  linkedNodeId: string;
  note: string;
};

export type TreeState = {
  outcomes: Record<string, NodeOutcome>;
  notes: Record<string, string>;
};

export const updatedAt = "14. března 2026";


export const sources: SourceLink[] = [
  {
    label: "SHIN-KYO: o nás",
    url: "https://www.shin-kyo.cz/o-nas/",
    note: "Historie oddílu a zázemí v Rychnově nad Kněžnou.",
    category: "Oddíl",
  },
  {
    label: "SHIN-KYO: partneři",
    url: "https://www.shin-kyo.cz/partneri/",
    note: "Veřejně uvedení partneři a podporovatelé oddílu.",
    category: "Oddíl",
  },
  {
    label: "Město Rychnov: dotace",
    url: "https://www.rychnov-city.cz/dotace-z-rozpoctu-mesta-na-rok-2025/d-18879",
    note: "Městská dotační agenda a zveřejňování podpory z rozpočtu města.",
    category: "Dotace",
  },
  {
    label: "Královéhradecký kraj: dotační portál",
    url: "https://dotace.kr-kralovehradecky.cz/",
    note: "Krajský vstupní bod pro dotační výzvy.",
    category: "Dotace",
  },
  {
    label: "NSA: rozcestník dotací",
    url: "https://nsa.gov.cz/rozcestnik-dotace/",
    note: "Oficiální přehled dotačních výzev Národní sportovní agentury.",
    category: "Dotace",
  },
  {
    label: "NSA: Můj klub 2026",
    url: "https://nsa.gov.cz/wp-content/uploads/2026/01/8_2026_Vyzva-MK26_dodatek-3.pdf",
    note: "Pravidla provozní podpory programu Můj klub pro rok 2026.",
    category: "Dotace",
  },
  {
    label: "Nadační fond Škoda Auto",
    url: "https://www.nfsa.cz/",
    note: "Nadační fond Škoda Auto a přehled jeho grantových aktivit.",
    category: "Dotace",
  },
  {
    label: "Hyundai i30 ceník MY26",
    url: "https://sub.hyundai.cz/files/download/model/i30-2017/cenik-i30-fl2-hatcback-my26.pdf",
    note: "Oficiální ceník s veřejně uvedeným modelem financování.",
    category: "Automobilky",
  },
  {
    label: "Hyundai flotilový prodej",
    url: "https://www.hyundai.com/cz/prodej/pro-firmy/fleetovy-prodej.html",
    note: "Flotilový prodej a zvýhodněné skupiny zákazníků Hyundai.",
    category: "Automobilky",
  },
  {
    label: "Toyota Proace Verso ceník",
    url: "https://pdf.sites.toyota.cz/cenik_novy_proace_verso_2026.pdf",
    note: "Oficiální ceník a vzorová KINTO ONE kalkulace.",
    category: "Automobilky",
  },
  {
    label: "Toyota KINTO ONE",
    url: "https://www.toyota.cz/kinto-one",
    note: "Operativní leasing Toyota pro firemní a další zákazníky.",
    category: "Automobilky",
  },
  {
    label: "Ford Tourneo Custom",
    url: "https://www.ford.cz/osobni-vozy/tourneo-custom",
    note: "Oficiální produktová stránka a veřejně uvedená zvýhodněná cena.",
    category: "Automobilky",
  },
  {
    label: "Volkswagen Užitkové vozy: Caravelle",
    url: "https://www.volkswagen-uzitkove.cz/modely/caravelle/caravelle",
    note: "Relevantní 9místná platforma ve skupině VW.",
    category: "Automobilky",
  },
  {
    label: "Škoda Auto: flotila a financování",
    url: "https://www.skoda-auto.cz/firmy-a-podnikatele/flotila",
    note: "Vstup do flotilních a finančních řešení Škoda.",
    category: "Automobilky",
  },
  {
    label: "Zákon o daních z příjmů",
    url: "https://www.zakonyprolidi.cz/cs/1992-586",
    note: "Pravidla pro odečet bezúplatných plnění a reklamní příjmy.",
    category: "Právní",
  },
];


export const actionPhases: ActionPhase[] = [
  {
    title: "Zmapování situace",
    window: "Týden 0",
    outcome: "Jasný přehled o tom, co oddíl potřebuje a jaké má zdroje.",
    actions: [
      "Sepsat posledních 12 měsíců výjezdů: počet akcí, počet lidí, kilometry.",
      "Zjistit aktuální rozpočet oddílu a volné prostředky.",
      "Stanovit tři cíle: 9místné auto, menší auto, záložní varianta ojetina.",
    ],
  },
  {
    title: "Příprava materiálů",
    window: "Týden 1",
    outcome: "Nabídkový materiál, profil oddílu a mobilitní shrnutí připravené k rozeslání.",
    actions: [
      "Připravit jednostránkový klubový profil s čísly a fotkami.",
      "Vytvořit dvoustránkové mobilitní shrnutí s konkrétními požadavky.",
      "Nachystat partnerské balíčky pro firmy (logo, viditelnost, vyúčtování).",
    ],
  },
  {
    title: "Oslovení Škoda Auto",
    window: "Týden 1–2",
    outcome: "Odeslaná žádost na Škoda Auto Kvasiny a Nadační fond Škoda Auto.",
    actions: [
      "Poslat e-mail regionálnímu vedení Škoda Auto Kvasiny.",
      "Oslovit Nadační fond Škoda Auto s grantovou žádostí.",
      "Navázat telefonicky do 2 dnů po odeslání.",
    ],
  },
  {
    title: "Oslovení konkurenčních automobilek",
    window: "Týden 2–3",
    outcome: "Rozeslané žádosti na Hyundai, Toyota, Ford a VW.",
    actions: [
      "Poslat přizpůsobený e-mail na flotilová centra Hyundai, Toyota, Ford.",
      "Zdůraznit příležitost viditelnosti v regionu Škoda.",
      "Shromáždit první reakce a nabídky.",
    ],
  },
  {
    title: "Oslovení lokálních firem",
    window: "Týden 2–4",
    outcome: "Nabídky partnerství rozeslané regionálním firmám.",
    actions: [
      "Obvolat a napsat lokální firmy s nabídkou měsíčního partnerství.",
      "Nabízet konkrétní balíčky (1 000 / 2 500 / 5 000 Kč měsíčně).",
      "Sledovat reakce a plánovat osobní schůzky.",
    ],
  },
  {
    title: "Rozhovor s městem a krajem",
    window: "Týden 3–4",
    outcome: "Potvrzení dostupných dotací a veřejných podpor.",
    actions: [
      "Domluvit schůzku s odborem sportu města Rychnov.",
      "Zjistit možnosti krajských dotací pro sport a mládež.",
      "Potvrdit, jaké veřejné podpory lze skládat vedle auta.",
    ],
  },
  {
    title: "Kampaň mezi rodiči a oddílem",
    window: "Týden 3–5",
    outcome: "Zapojení rodičů a členů do podpory a sbírání kontaktů.",
    actions: [
      "Rozeslat letáky a zprávy do rodičovských skupin.",
      "Osobně oslovit rodiče na trénincích.",
      "Sbírat kontakty na firmy a jednatele přes osobní doporučení.",
    ],
  },
  {
    title: "Porovnání nabídek",
    window: "Týden 6–8",
    outcome: "Přehled všech nabídek a zdrojů financování na jednom místě.",
    actions: [
      "Shromáždit závazné nabídky od minimálně 3 značek.",
      "Porovnat: cena, nájezd, servis, pojištění, sankce za km, odkup.",
      "Dopočítat měsíční zátěž proti skutečně podepsaným partnerstvím.",
    ],
  },
  {
    title: "Rozhodnutí o modelu a financování",
    window: "Týden 8–10",
    outcome: "Vybraný vůz a potvrzený model financování.",
    actions: [
      "Vybrat mezi novým vozem, leasingem a předváděcí variantou.",
      "Potvrdit servisní rezervu a měsíční příjmy od partnerů.",
      "Rozhodnout, jestli klub spouští rovnou i menší auto.",
    ],
  },
  {
    title: "Podpis a rozjezd",
    window: "Týden 10+",
    outcome: "Auto je na cestě a partneři vědí, jak bude jejich podpora vidět.",
    actions: [
      "Podepsat smlouvu na auto až po potvrzení servisní rezervy.",
      "Nastavit kvartální report pro partnery: akce, najeté km, fotky.",
      "Připravit druhou vlnu pro menší auto nebo obnovu za 2–3 roky.",
    ],
  },
];

export const legalNotes: LegalNote[] = [
  {
    title: "Dar vs. sponzoring — v čem je rozdíl",
    keyRule: "Dar = odpočet max 10 % základu daně. Sponzoring = celá částka jde do nákladů firmy.",
    text: "<strong>Dar:</strong> Firma dá peníze bez protiplnění. Může si odečíst max 10 % základu daně (minimum 2 000 Kč/rok). Pozor: je to odpočet od základu, ne sleva na dani — reálná úspora je cca 19 % z daru. Když firma daruje 10 000 Kč, ušetří na dani asi 1 900 Kč.<br/><br/><strong>Sponzoring/reklama:</strong> Firma platí za protiplnění (logo na autě, zmínky na webu). Celá částka jde do nákladů → snižuje základ daně 1:1. Když firma zaplatí 10 000 Kč za reklamu, ušetří na dani cca 1 900 Kč, ALE navíc jí to snižuje zisk, takže účetně je to čistší a přirozenější. <strong>Pro pravidelnou měsíční podporu je sponzoring jednoznačně lepší varianta.</strong>",
    forPartner: "Vaše podpora půjde celá do nákladů firmy jako reklama — je to pro vás výhodnější než dar.",
    source: sources[14],
  },
  {
    title: "Co firma za podporu získá",
    keyRule: "Logo na 9místném autě, webu, sociálních sítích + kvartální report o využití.",
    text: "Konkrétní protiplnění pro partnera:<br/>• <strong>Logo na vozidle</strong> — auto jezdí po celé ČR na soutěže, viditelnost v regionu i mimo něj<br/>• <strong>Zmínka na webu oddílu</strong> s odkazem na firmu<br/>• <strong>Prezentace na sociálních sítích</strong> oddílu při výjezdech a soutěžích<br/>• <strong>Banner na domácích soutěžích</strong> a akcích oddílu<br/>• <strong>Kvartální přehled:</strong> kolik akcí, kolik km, výsledky, fotky<br/>• Na přání: zmínka v médiích při úspěších oddílu<br/><br/>Protiplnění se specifikuje ve smlouvě a lze přizpůsobit podle přání partnera.",
    forPartner: "Za měsíční podporu dostanete viditelnost na autě, webu a akcích oddílu — s kvartálním reportem.",
    source: sources[0],
  },
  {
    title: "Jak to účetně nastavit",
    keyRule: "Klub pošle smlouvu a fakturu. Firma zaúčtuje jako náklad na reklamu.",
    text: "Praktický postup krok za krokem:<br/>1. Klub a firma podepíšou <strong>reklamní/sponzorskou smlouvu</strong> (ne darovací).<br/>2. Smlouva specifikuje: co klub poskytuje (logo, zmínky) a kolik firma platí měsíčně.<br/>3. Klub vystaví fakturu → firma ji zaplatí a zaúčtuje jako <strong>náklad na reklamu/propagaci</strong>.<br/>4. Pro firmu: celá částka jde do nákladů (snižuje základ daně).<br/>5. Pro klub: příjem z reklamy, zdaníme standardně.<br/>6. Účetní na straně partnera to zvládne — stačí mu dodat smlouvu a fakturu.<br/><br/><strong>Ze strany klubu tohle máme pod kontrolou a připravíme vše potřebné.</strong>",
    forPartner: "Pošleme vám jednoduchou smlouvu a fakturu. Váš účetní to zaúčtuje jako náklad na reklamu.",
    source: sources[14],
  },
  {
    title: "Dotace Můj klub 2026 — jen na provoz, ne na auto",
    keyRule: "Nelze koupit majetek nad 60 000 Kč ani leasing osobních aut.",
    text: "Program Můj klub 2026 od Národní sportovní agentury <strong>neumožňuje přímý nákup vozidla</strong> — mezi nezpůsobilými náklady je majetek nad 60 000 Kč bez DPH a finanční leasing osobních automobilů. Ale dá se použít jako <strong>provozní polštář</strong>: pokryje provozní náklady oddílu (nájmy, vybavení, cestovné), čímž uvolní peníze z rozpočtu klubu na splátky auta.",
    forPartner: "Tato dotace se týká jen klubu, ne partnerů.",
    source: sources[5],
  },
];

export const automotiveLeads: Lead[] = [
  {
    id: "skoda-auto",
    name: "Škoda Auto / flotila a financování",
    kind: "Automobilový partner",
    angle: "Lokální příběh přes Kvasiny a silná regionální relevance.",
    ask: "Regionální mobilitní partnerství nebo výrazně zvýhodněná 9místná varianta přes skupinu VW.",
    contact: "Flotilní a finanční vstup pro další navázání.",
    source: sources[13],
  },
  {
    id: "nfsa",
    name: "Nadační fond Škoda Auto",
    kind: "Nadace",
    angle: "Veřejně viditelná regionální podpora a logický vstup do vyjednávání.",
    ask: "Ověřit, zda je možný grantový nebo individuální rámec pro mobilitu mládežnického sportu.",
    contact: "Nadační fond a přehled programů.",
    source: sources[6],
  },
  {
    id: "hyundai",
    name: "Hyundai flotilové centrum",
    kind: "Flotila a zvýhodněné skupiny",
    angle: "Oficiálně komunikují flotilové centrum a zvýhodněné skupiny.",
    ask: "Individuální neziskový nabídka pro 9místný vůz nebo levnější druhé auto.",
    contact: "Flotilové obchodní centrum / kontaktní formulář.",
    source: sources[8],
  },
  {
    id: "toyota",
    name: "Toyota / KINTO ONE",
    kind: "Financování a vůz",
    angle: "Toyota zveřejňuje Proace Verso i vzorovou kalkulaci financování.",
    ask: "Konkrétní nabídka Proace Verso Kombi 9 míst na 60 měsíců s vyšším ročním nájezdem.",
    contact: "Toyota prodejce nebo Toyota Financial Services.",
    source: sources[9],
  },
  {
    id: "ford",
    name: "Ford Tourneo Custom",
    kind: "Vozidlo a srovnání",
    angle: "Veřejná cena dává dobrý srovnávací rámec.",
    ask: "Nabídka 9místného Tourneo se servisem a pojištěním.",
    contact: "Oficiální produkt a nabídka od prodejce.",
    source: sources[11],
  },
  {
    id: "autoin",
    name: "AUTO IN Group",
    kind: "Prodejce a operativní leasing",
    angle: "Praktický partner pro konkrétní nabídky aut a leasingových variant.",
    ask: "Rychlá regionální nabídka na operák nebo podnikatelský leasing pro spolek.",
    contact: "Kontakty a pobočky AUTO IN.",
    source: {
      label: "AUTO IN kontakty",
      url: "https://www.autoin.cz/kontakty/",
      note: "Kontakty a pobočky AUTO IN Group.",
    },
  },
];

export const localCompanyLeads: Lead[] = [
  {
    id: "matrix",
    name: "MATRIX a.s.",
    kind: "Lokální firma",
    angle: "Skupina sídlí v Rychnově a sama pracuje i s automotive a Škoda Auto.",
    ask: "Měsíční partnerství nebo jednorázový příspěvek na akontaci s regionální viditelností.",
    contact: "Oficiální kontakt: asistentka@matrix-as.cz, tel. +420 777 712 702.",
    source: {
      label: "MATRIX kontakt",
      url: "https://matrix-as.cz/kontakt/",
      note: "Oficiální kontaktní stránka MATRIX a.s.",
    },
  },
  {
    id: "bednar",
    name: "BEDNAR FMT",
    kind: "Lokální firma",
    angle: "Významná výrobní firma z Rychnova nad Kněžnou se silnou regionální stopou.",
    ask: "Roční nebo měsíční podpora mobility mládeže, případně příspěvek na servisní rezervu.",
    contact: "Oficiální kontakt: info@bednar.com.",
    source: {
      label: "BEDNAR kontakty",
      url: "https://www.bednar.com/kontakty/",
      note: "Oficiální kontakty BEDNAR FMT včetně adresy v Rychnově nad Kněžnou.",
    },
  },
  {
    id: "assa-abloy",
    name: "ASSA ABLOY Opening Solutions CZ",
    kind: "Lokální firma",
    angle: "Silný zaměstnavatel v Rychnově, vhodný kandidát na regionální společenskou odpovědnost nebo partnerství.",
    ask: "Měsíční partnerství nebo podpora konkrétního dětského dopravního cíle.",
    contact: "Oficiální kontaktní stránka ASSA ABLOY, konkrétní Rychnov kontakt je potřeba potvrdit při prvním navázáníu.",
    source: {
      label: "ASSA ABLOY contact",
      url: "https://www.assaabloy.com/cz/cs/contact-us",
      note: "Oficiální kontaktní stránka ASSA ABLOY pro ČR.",
    },
  },
  {
    id: "genesisrk",
    name: "GenesisRK",
    kind: "Lokální firma",
    angle: "Firma má provozovnu a sklad přímo v Rychnově a už je veřejně vidět mezi podporovateli oddílu.",
    ask: "Navýšit stávající podporu do měsíčního partnerství nebo příspěvku na akontaci.",
    contact: "Oficiální kontakt: info@genesisrk.cz, tel. +420 732 253 366.",
    source: {
      label: "GenesisRK kontakty",
      url: "https://genesisrk.cz/stranka/kontakty",
      note: "Oficiální kontaktní stránka GenesisRK s rychnovskou provozovnou.",
    },
  },
  {
    id: "poda",
    name: "PODA",
    kind: "Regionální firma",
    angle: "Silná značka s veřejnými kontakty a zároveň veřejně uvedený partner oddílu.",
    ask: "Měsíční partnerství nebo převzetí části kampaně a provozních nákladů.",
    contact: "Oficiální centrální kontakt: tel. +420 730 430 430, kontaktní formulář na webu.",
    source: {
      label: "PODA kontakty",
      url: "https://www.poda.cz/kontakty/",
      note: "Oficiální kontaktní stránka PODA.",
    },
  },
];

export const communityLeads: Lead[] = [
  {
    id: "parents-network",
    name: "Rodiče a členové s vlastní firmou",
    kind: "Osobní kontakt",
    angle: "Nejsnazší vstup — oddíl už má vztah a důvěru. Přes rodiče se dostanete k jednatelům a majitelům firem.",
    ask: "500 až 2 500 Kč měsíčně nebo propojení na jednatele a majitele firem v okolí.",
    contact: "Řešit přes interní leták a osobní oslovení na trénincích, ne jen veřejným postem.",
    source: {
      label: "Interní linka oddílu",
      url: "https://www.shin-kyo.cz/o-nas/",
      note: "Oddíl má vlastní komunitu, která je první vrstvou pro osobní doporučení.",
    },
  },
  {
    id: "existing-partners",
    name: "GenesisRK, PODA, Hájek-Cargo",
    kind: "Partner oddílu",
    angle: "Stávající partneři uvedení na webu oddílu. Mají pozitivní vztah, nejde o studený kontakt.",
    ask: "Převést obecnou podporu na jasný balíček: servisní rezerva, měsíční splátka nebo spoluúčast na akontaci.",
    contact: "Nejdřív využít interní vztah a teprve potom dohledávat konkrétní oddělení.",
    source: sources[1],
  },
  {
    id: "personal-referrals",
    name: "Osobní doporučení přes rodiče",
    kind: "Osobní kontakt",
    angle: "Nejlepší cesta k jednateli nebo správci vozového parku bývá přes osobní doporučení, ne přes recepci.",
    ask: "Vyžádat kontakt na rozhodovací osobu a poslat krátký osobní zprávu s doporučením.",
    contact: "Řešit interním letákem, členským e-mailem a osobně na tréninku.",
    source: sources[0],
  },
];

export const documentTemplates: TemplateBlock[] = [
  {
    id: "automotive-skoda",
    label: "Pro Škodu a NFSA",
    subject: "Regionální mobilitní partnerství pro SHIN-KYO Rychnov nad Kněžnou",
    summary: "První kontakt pro Škodu Auto a Nadační fond Škoda Auto — důraz na regionální vazbu Kvasiny.",
    body: `Dobrý den,\n\nobracím se za karate oddíl SHIN-KYO Rychnov nad Kněžnou. Pro děti, mládež a reprezentaci oddílu řešíme dlouhodobou mobilitu na soutěže a soustředění po celé ČR a podle možností i do zahraničí.\n\nSídlíme necelých 15 kilometrů od závodu v Kvasinách a vaše značka je pro náš region přirozeným symbolem. Podpora místního mládežnického sportu od Škoda Auto by měla silný regionální dopad.\n\nHledáme partnera pro 9místné vozidlo, ideálně formou:\n- zvýhodněné dlouhodobé zápůjčky,\n- individuálních flotilových podmínek,\n- nebo příspěvku na akontaci a rozjezd financování.\n\nNejde nám o luxusní výbavu. Potřebujeme spolehlivé a nákladově rozumné auto, které bude pravidelně vozit sportovce na akce a zároveň dává smysl i z hlediska regionálního a reputačního dopadu.\n\nZa partnerství nabízíme:\n- jasně viditelnou regionální vazbu,\n- prezentaci partnera na webu a při komunikaci oddílu,\n- průběžné vyúčtování o využití vozu,\n- konkrétní příběh podpory mládežnického sportu.\n\nPokud to pro vás dává smysl, pošlu stručné dvoustránkové shrnutí a rád navrhnu krátký hovor nebo osobní schůzku.\n\nDěkuji a zdravím\n[JMÉNO]\n[ROLE V ODDÍLU]\n[TELEFON]\n[E-MAIL]`,
    usage: [
      "Použít pro Škoda Auto Kvasiny a Nadační fond Škoda Auto.",
      "Do přílohy přidat jednostránkový profil oddílu a stručné mobilitní shrnutí.",
      "Zdůraznit blízkost ke Kvasinám — to je hlavní argument.",
    ],
    pipeline: [
      { order: 1, label: "Odeslat e-mail", timing: "Den 0", description: "Poslat e-mail s profilem oddílu v příloze." },
      { order: 2, label: "Zavolat", timing: "Den 2", description: "Krátký telefonát pro ověření, že se e-mail dostal ke správné osobě." },
      { order: 3, label: "Připomínkový e-mail", timing: "Den 5", description: "Pokud bez odpovědi: krátký připomínkový e-mail." },
      { order: 4, label: "Schůzka nebo hovor", timing: "Týden 2", description: "Osobní schůzka nebo videohovor k projednání možností." },
      { order: 5, label: "Konkrétní nabídka", timing: "Týden 3–4", description: "Dostat na stůl konkrétní nabídku podmínek." },
      { order: 6, label: "Porovnat a rozhodnout", timing: "Týden 4–6", description: "Porovnat s nabídkami od ostatních značek a rozhodnout." },
    ],
  },
  {
    id: "automotive-competition",
    label: "Pro konkurenční automobilky",
    subject: "Příležitost pro podporu mládežnického sportu v regionu Škoda Auto",
    summary: "Text pro Hyundai, Toyota, Ford a další — důraz na viditelnost v regionu, kde dominuje jedna značka.",
    body: `Dobrý den,\n\nobracím se za karate oddíl SHIN-KYO Rychnov nad Kněžnou. Pro děti, mládež a reprezentaci oddílu řešíme dlouhodobou mobilitu na soutěže a soustředění po celé ČR.\n\nNáš oddíl sídlí v regionu, kde dominuje jedna automobilová značka. Právě proto je vaše podpora místního sportu viditelná příležitost, jak se odlišit a ukázat, že vaší značce záleží na komunitách i mimo hlavní centra.\n\nHledáme partnera pro 9místné vozidlo, ideálně formou:\n- zvýhodněné dlouhodobé zápůjčky,\n- individuálních flotilových podmínek,\n- nebo příspěvku na akontaci a rozjezd financování.\n\nPotřebujeme spolehlivé a nákladově rozumné auto pro pravidelné výjezdy sportovců. Za partnerství nabízíme:\n- prezentaci partnera na voze, webu a při komunikaci oddílu,\n- průběžné vyúčtování o využití vozu,\n- konkrétní příběh podpory mládežnického sportu v regionu.\n\nPokud to pro vás dává smysl, pošlu stručné dvoustránkové shrnutí a rád navrhnu krátký hovor.\n\nDěkuji a zdravím\n[JMÉNO]\n[ROLE V ODDÍLU]\n[TELEFON]\n[E-MAIL]`,
    usage: [
      "Použít pro Hyundai, Toyota, Ford, VW a další konkurenční značky.",
      "Hlavní argument: viditelnost v regionu, kde dominuje Škoda.",
      "Do přílohy přidat profil oddílu a mobilitní shrnutí.",
    ],
    pipeline: [
      { order: 1, label: "Odeslat e-mail", timing: "Den 0", description: "Poslat e-mail s profilem oddílu v příloze." },
      { order: 2, label: "Zavolat", timing: "Den 2", description: "Krátký telefonát pro navázání kontaktu." },
      { order: 3, label: "Připomínkový e-mail", timing: "Den 5", description: "Pokud bez odpovědi: krátký připomínkový e-mail." },
      { order: 4, label: "Schůzka nebo hovor", timing: "Týden 2", description: "Osobní schůzka nebo videohovor k projednání nabídky." },
      { order: 5, label: "Konkrétní nabídka", timing: "Týden 3–4", description: "Dostat na stůl konkrétní nabídku podmínek." },
      { order: 6, label: "Porovnat a rozhodnout", timing: "Týden 4–6", description: "Porovnat s ostatními nabídkami a rozhodnout." },
    ],
  },
  {
    id: "company",
    label: "Lokální firmě",
    subject: "Prosba o měsíční partnerství pro mobilitu dětí z karate oddílu",
    summary: "Krátký a civilní text pro regionální firmy.",
    body: `Dobrý den,\n\nobracím se na vás za karate oddíl SHIN-KYO Rychnov nad Kněžnou. Řešíme dopravu dětí a závodníků na soutěže a soustředění a skládáme dlouhodobý model, díky kterému oddíl zvládne provoz 9místného auta bez toho, aby všechno stálo jen na členských příspěvcích.\n\nHledáme několik regionálních partnerů, kteří by klub podpořili pravidelně měsíčně. I menší částka dává velký smysl, protože z více firem vznikne stabilní základ na splátky, pojištění a servis.\n\nNejjednodušší forma je partnerství v jedné z těchto hladin:\n- 1 000 Kč měsíčně\n- 2 500 Kč měsíčně\n- 5 000 Kč měsíčně\n\nRádi zašleme i konkrétní přehled, jak by byla podpora využita a jak může být partner veřejně uveden.\n\nPokud by pro vás bylo snazší jednorázové řešení, dává nám smysl i příspěvek na akontaci nebo servisní rezervu pro vůz.\n\nDěkuji za zvážení a rád pošlu krátké shrnutí celé akce.\n\nS pozdravem\n[JMÉNO]\n[ROLE V ODDÍLU]\n[TELEFON]\n[E-MAIL]`,
    usage: [
      "Poslat lokálním firmám a do 48 hodin navázat telefonem.",
      "V textu je lepší nechat jen jednu konkrétní prosbu, ne všechny varianty najednou.",
    ],
    pipeline: [
      { order: 1, label: "Odeslat e-mail", timing: "Den 0", description: "Poslat e-mail s krátkým shrnutím akce." },
      { order: 2, label: "Zavolat", timing: "Den 1–2", description: "Navázat telefonicky, odkázat na e-mail." },
      { order: 3, label: "Připomínka", timing: "Den 5", description: "Pokud bez reakce: krátká připomínka e-mailem." },
      { order: 4, label: "Osobní schůzka", timing: "Týden 2", description: "Domluvit krátkou schůzku s konkrétní nabídkou." },
      { order: 5, label: "Podpis partnerství", timing: "Týden 3–4", description: "Podepsat partnerskou smlouvu a nastavit platby." },
    ],
  },
  {
    id: "parents",
    label: "Rodičům",
    summary: "Vhodné na leták, WhatsApp skupinu, klubový e-mail i členskou schůzku.",
    body: `Pomozte nám dostat oddíl na vlastní kola.\n\nSHIN-KYO řeší dlouhodobou dopravu na soutěže, soustředění a další sportovní akce. Cílem je získat 9místné auto, které sníží tlak na rodiče, zjednoduší organizaci výjezdů a pomůže dětem i trenérům jezdit bezpečně a pravidelně.\n\nJak můžete pomoct:\n1. Měsíční podpora 200 / 500 / 1 000 Kč.\n2. Jednorázový příspěvek na akontaci nebo servisní rezervu.\n3. Propojení na firmu, která by mohla pomoci jako partner.\n4. Předání kontaktu na jednatele, majitele nebo správce vozového parku ve vaší firmě.\n\nI malá pravidelná částka má smysl. Když se nás sejde víc, vznikne stabilní základ pro provoz auta, které bude sloužit všem dětem v oddílu.\n\nPokud podnikáte nebo víte o firmě, která by mohla pomoci, ozvěte se prosím přímo trenérům nebo vedení oddílu.\n\nDěkujeme, že v tom jedete s námi.`,
    usage: [
      "Použít jako A5 leták, text do rodičovské skupiny i krátký klubový e-mail.",
      "Na papírové verzi doplnit QR kód na kontakt nebo formulář pro zájemce.",
    ],
    pipeline: [
      { order: 1, label: "Rozeslat leták", timing: "Den 0", description: "Rozeslat leták přes e-mail a WhatsApp skupiny." },
      { order: 2, label: "Osobní oslovení", timing: "Týden 1", description: "Na tréninku osobně oslovit rodiče a vysvětlit projekt." },
      { order: 3, label: "Sbírat kontakty", timing: "Týden 1–2", description: "Sbírat kontakty na firmy přes rodiče." },
      { order: 4, label: "Přehled stavu", timing: "Týden 3", description: "Sdílet aktuální stav sbírky a poděkovat přispěvatelům." },
    ],
  },
  {
    id: "navazani",
    label: "Skript pro navázání",
    summary: "Stručný skript pro navázání na odeslaný e-mail bez zbytečného vysvětlování.",
    body: `Dobrý den, tady [JMÉNO] z karate oddílu SHIN-KYO Rychnov nad Kněžnou.\n\nPosílali jsme krátký e-mail k mobilitě dětí a výjezdům na soutěže. Nevolám kvůli dlouhé prezentaci, jen chci ověřit, jestli se to dostalo ke správnému člověku a jestli má smysl poslat stručné dvoustránkové shrnutí.\n\nŘešíme 9místné auto pro oddíl a skládáme ho z jednoho silnějšího partnera a několika pravidelných partnerství. Pokud je ve firmě někdo, kdo řeší marketing, společenskou odpovědnost nebo podobné lokální podpory, budu rád za nasměrování.\n\nMůžu vám krátké shrnutí poslat ještě dnes.`,
    usage: [
      "Použít 1 až 2 dny po e-mailu, ne až po týdnu.",
      "Cíl hovoru není prodat všechno po telefonu, ale dostat se ke správné osobě nebo na krátkou schůzku.",
    ],
    pipeline: [
      { order: 1, label: "Zavolat", timing: "Den 1–2 po e-mailu", description: "Zavolat a ověřit, že e-mail dorazil ke správné osobě." },
      { order: 2, label: "Poslat shrnutí", timing: "Ihned po hovoru", description: "Pokud je zájem, poslat dvoustránkové shrnutí." },
      { order: 3, label: "Domluvit schůzku", timing: "Do týdne", description: "Navrhnout osobní schůzku nebo videohovor." },
    ],
  },
];

// ── Decision Tree Nodes ──

export const decisionNodes: DecisionNode[] = [
  // ── FÁZE 1: Auto zdarma ──
  {
    id: "skoda-free",
    tier: 1,
    order: 1,
    label: "Auto od Škoda Auto zdarma",
    headline: "Regionální mobilitní partnerství přes Kvasiny",
    description:
      "Nejlogičtější první dveře. Škoda Auto má závod v Kvasinách 15 km od Rychnova — podpora místního mládežnického sportu je přirozený CSR příběh.",
    estimatedValue: "Auto zdarma",
    estimatedTimeframe: "2–6 měsíců",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["partner-club"],
    steps: [
      "Připravit dvoustránkový nabídkový materiál s počtem výjezdů a dětí.",
      "Oslovit regionální vedení Škoda Auto Kvasiny.",
      "Nabídnout viditelnost značky na voze, webu a akcích oddílu.",
    ],
    risks: [
      "Interní procesy korporátu mohou trvat měsíce.",
      "Program nemusí být otevřený pro sportovní kluby.",
    ],
    nextMoveOnAno: "Dojednat konkrétní model vozu a podmínky zápůjčky/daru.",
    nextMoveOnNe: "Zkusit konkurenční automobilku nebo Nadační fond Škoda Auto.",
    nextMoveOnPodminka: "Zjistit konkrétní podmínky a připravit požadované dokumenty.",
    relatedLeadIds: ["skoda-auto"],
    relatedTemplateIds: ["automotive-skoda", "automotive-competition"],
  },
  {
    id: "competitor-free",
    tier: 1,
    order: 2,
    label: "Auto od konkurenční automobilky",
    headline: "Hyundai, Toyota nebo Ford jako alternativní CSR partner",
    description:
      "Pokud Škoda neodpoví, konkurenční značky mohou vidět příležitost v podpoře regionálního sportu — zvlášť pokud se o tom dozví.",
    estimatedValue: "Auto zdarma",
    estimatedTimeframe: "3–6 měsíců",
    difficulty: "high",
    probability: "low",
    complementaryIds: ["partner-club"],
    steps: [
      "Oslovit CSR oddělení Hyundai, Toyota a Ford.",
      "Prezentovat regionální příběh a počet dětí.",
      "Zmínit, že klub jedná i s dalšími značkami (vytváří urgenci).",
    ],
    risks: [
      "Bez osobního kontaktu je šance nízká.",
      "Menší regionální relevance než Škoda/Kvasiny.",
    ],
    nextMoveOnAno: "Dojednat podmínky a porovnat s případnou nabídkou Škoda.",
    nextMoveOnNe: "Pokračovat s Nadačním fondem Škoda nebo přejít na fázi 2 — dotace.",
    nextMoveOnPodminka: "Dodat požadované materiály a čekat na rozhodnutí.",
    relatedLeadIds: ["hyundai", "toyota", "ford"],
    relatedTemplateIds: ["automotive-skoda", "automotive-competition"],
  },
  {
    id: "skoda-foundation",
    tier: 1,
    order: 3,
    label: "Nadační fond Škoda Auto",
    headline: "Grant na mobilitu mládežnického sportu z NFSA",
    description:
      "Nadační fond Škoda Auto podporuje regionální projekty v okolí závodů. Grant 100–500k Kč může pokrýt akontaci nebo přímo auto.",
    estimatedValue: "100–500 000 Kč",
    estimatedTimeframe: "1–3 měsíce",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["skoda-free", "partner-club"],
    steps: [
      "Prověřit grantový kalendář Nadačního fondu Škoda Auto.",
      "Připravit žádost s rozpočtem a popisem dopadu na region.",
      "Zdůraznit vazbu na Kvasiny a místní mládežnický sport.",
    ],
    risks: [
      "Grantové cykly mají pevné termíny — můžete je minout.",
      "Podmínky mohou vyžadovat specifické výstupy nebo reporting.",
    ],
    nextMoveOnAno: "Použít grant na akontaci nebo první splátky leasingu.",
    nextMoveOnNe: "Přejít na fázi 2 — dotace a granty.",
    nextMoveOnPodminka: "Upravit žádost podle požadavků nadace a resubmit.",
    relatedLeadIds: ["nfsa"],
  },

  // ── FÁZE 2: Dotace a granty ──
  {
    id: "grant-city",
    tier: 2,
    order: 1,
    label: "Dotace od města Rychnov",
    headline: "Městská dotace na sportovní činnost mládeže",
    description:
      "Město Rychnov nad Kněžnou každoročně rozděluje dotace na sport. Přímo nezaplatí auto, ale uvolní klubový rozpočet na splátky.",
    estimatedValue: "20–80 000 Kč",
    estimatedTimeframe: "dle výzvy města",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["grant-region", "grant-nsa"],
    steps: [
      "Kontaktovat odbor sportu města Rychnov nad Kněžnou.",
      "Podat žádost o dotaci na sportovní činnost mládeže.",
      "Zdůraznit počet dětí a výjezdů na soutěže.",
    ],
    risks: [
      "Městské dotace jsou obvykle malé (desítky tisíc).",
      "Termíny podání žádostí mohou být již za námi.",
    ],
    nextMoveOnAno: "Uvolněné peníze z rozpočtu přesměrovat na splátky auta.",
    nextMoveOnNe: "Nevadí, zkusit kraj a NSA.",
    nextMoveOnPodminka: "Upravit žádost nebo počkat na další výzvu.",
  },
  {
    id: "grant-region",
    tier: 2,
    order: 2,
    label: "Dotace od Královéhradeckého kraje",
    headline: "Krajská dotace na sport a volnočasové aktivity",
    description:
      "Královéhradecký kraj vypisuje dotační programy na podporu sportu a volnočasových aktivit mládeže. Částky 30–150k Kč.",
    estimatedValue: "30–150 000 Kč",
    estimatedTimeframe: "dle výzvy kraje",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["grant-city", "grant-nsa"],
    steps: [
      "Sledovat dotační výzvy Královéhradeckého kraje pro sport.",
      "Podat žádost s důrazem na regionální dopad a počet dětí.",
      "Kontaktovat krajského radního pro sport.",
    ],
    risks: [
      "Konkurence o krajské dotace je vysoká.",
      "Způsobilé náklady se mění rok od roku.",
    ],
    nextMoveOnAno: "Uvolněné peníze přesměrovat na splátky nebo akontaci.",
    nextMoveOnNe: "Pokračovat s NSA a dalšími programy.",
    nextMoveOnPodminka: "Upravit žádost podle požadavků kraje.",
  },
  {
    id: "grant-nsa",
    tier: 2,
    order: 3,
    label: "NSA – program Můj klub",
    headline: "Provozní dotace z Národní sportovní agentury",
    description:
      "Program Můj klub je největší dotační program NSA pro sportovní kluby. Pokrývá provozní náklady, čímž uvolní rozpočet na auto.",
    estimatedValue: "50–200 000 Kč",
    estimatedTimeframe: "dle výzvy NSA",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["grant-city", "grant-region"],
    steps: [
      "Podat žádost o provozní dotaci Můj klub 2026.",
      "Připravit přehled členské základny a sportovní činnosti.",
      "Doložit hospodaření oddílu za minulý rok.",
    ],
    risks: [
      "Můj klub 2026 neumožňuje přímý nákup majetku nad 60 000 Kč.",
      "Administrativa a reporting mohou být náročné.",
    ],
    nextMoveOnAno: "Uvolněné provozní peníze přesměrovat na splátky auta.",
    nextMoveOnNe: "Zkusit EU programy a další nadace.",
    nextMoveOnPodminka: "Upravit žádost podle podmínek aktuální výzvy.",
  },
  {
    id: "grant-eu",
    tier: 2,
    order: 4,
    label: "EU dotace – Erasmus+ Sport",
    headline: "Evropské programy pro mobilitu mládežnického sportu",
    description:
      "Erasmus+ Sport podporuje mezinárodní sportovní projekty a mobilitu. Částky v řádu stovek tisíc Kč, ale administrativa je náročnější.",
    estimatedValue: "100–500 000 Kč",
    estimatedTimeframe: "3–9 měsíců",
    difficulty: "high",
    probability: "low",
    complementaryIds: ["new-nonprofit", "grant-nsa"],
    steps: [
      "Prostudovat aktuální výzvy Erasmus+ Sport.",
      "Najít zahraničního partnera (karate klub v jiné EU zemi).",
      "Připravit projekt zaměřený na mobilitu a mezinárodní soutěže.",
    ],
    risks: [
      "Administrativa EU projektů je výrazně náročnější.",
      "Délka schvalování může být 6–12 měsíců.",
    ],
    nextMoveOnAno: "Realizovat projekt a využít prostředky na mobilitu.",
    nextMoveOnNe: "Soustředit se na české nadace (ČEZ, O2).",
    nextMoveOnPodminka: "Hledat partnera a připravit projektový záměr.",
  },
  {
    id: "grant-foundations",
    tier: 2,
    order: 5,
    label: "Další nadace (ČEZ, O2 aj.)",
    headline: "Granty z firemních a nezávislých nadací",
    description:
      "Nadace ČEZ, Nadace O2, Nadace sportující mládeže a další vypisují granty pro sport a mládež. Částky 50–300k Kč.",
    estimatedValue: "50–300 000 Kč",
    estimatedTimeframe: "1–3 měsíce",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["partner-club", "grant-nsa"],
    steps: [
      "Zmapovat nadace zaměřené na sport a mládež (ČEZ, O2, sportovní nadace).",
      "Sledovat grantové kalendáře a termíny uzávěrek.",
      "Připravit žádost s rozpočtem a popisem dopadu.",
    ],
    risks: [
      "Grantové cykly mají pevné termíny — můžete je minout.",
      "Podmínky se liší nadace od nadace.",
    ],
    nextMoveOnAno: "Použít grant na akontaci nebo splátky leasingu.",
    nextMoveOnNe: "Přejít na fázi 3 — zvýhodněné pořízení.",
    nextMoveOnPodminka: "Upravit žádost podle požadavků konkrétní nadace.",
  },

  // ── FÁZE 3: Zvýhodněné pořízení ──
  {
    id: "automaker-program",
    tier: 3,
    order: 1,
    label: "Partnerský/zaměstnanecký program",
    headline: "Zvýhodněné podmínky přes partnerský program automobilky",
    description:
      "Automobilky nabízejí zvýhodněné podmínky pro neziskový sektor, sportovní organizace nebo přes zaměstnanecké programy. Sleva 10–30 % z ceníkové ceny.",
    estimatedValue: "Sleva 10–30 %",
    estimatedTimeframe: "2–4 týdny",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["partner-club", "fleet-lease"],
    steps: [
      "Oslovit obchodní oddělení automobilek s žádostí o partnerský program.",
      "Doložit neziskový status a účel pořízení (přeprava dětí na soutěže).",
      "Porovnat nabídky min. 3 značek (Toyota, Ford, VW).",
    ],
    risks: [
      "Partnerské programy bývají primárně pro firmy, ne spolky.",
      "Podmínky se mohou lišit region od regionu.",
    ],
    nextMoveOnAno: "Vybrat nejlepší nabídku a zajistit financování splátky.",
    nextMoveOnNe: "Zkusit flotilový leasing nebo předváděcí vůz.",
    nextMoveOnPodminka: "Dodat IČO, stanovy a výpis z rejstříku spolků.",
    relatedLeadIds: ["hyundai", "toyota", "ford", "autoin"],
    relatedTemplateIds: ["automotive-skoda", "automotive-competition"],
  },
  {
    id: "fleet-lease",
    tier: 3,
    order: 2,
    label: "Zvýhodněný flotilový leasing",
    headline: "Flotilové podmínky se slevou 20–40 % na měsíční splátku",
    description:
      "I malý spolek může získat flotilové podmínky, pokud jedná přes správného dealera. Sleva 20–40 % na měsíční splátku oproti standardu.",
    estimatedValue: "Úspora 3–8 000 Kč/měs.",
    estimatedTimeframe: "2–4 týdny",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["automaker-program", "partner-club"],
    steps: [
      "Vyžádat si flotilové nabídky: operativní leasing, úvěr, balón.",
      "Porovnat Toyota Proace Verso, Ford Tourneo a VW Caravelle.",
      "Vyjednat individuální podmínky pro neziskový subjekt.",
    ],
    risks: [
      "Flotilové podmínky bývají primárně pro firmy s větším odběrem.",
      "Nízký nájezd v nabídce nemusí stačit na soutěže po Evropě.",
    ],
    nextMoveOnAno: "Podepsat leasing a zajistit měsíční příjmy na splátky.",
    nextMoveOnNe: "Zkusit předváděcí nebo skladový vůz.",
    nextMoveOnPodminka: "Dodat IČO, stanovy a výpis z rejstříku spolků.",
    relatedLeadIds: ["hyundai", "toyota", "ford", "autoin"],
    relatedTemplateIds: ["automotive-skoda", "automotive-competition"],
  },
  {
    id: "demo-car",
    tier: 3,
    order: 3,
    label: "Předváděcí nebo skladový vůz",
    headline: "Téměř nové auto se slevou 15–30 % z ceníku",
    description:
      "Dealerství pravidelně prodávají předváděcí a skladové vozy se slevou. Vůz s 5–15 tis. km za výrazně nižší cenu než nový, s plnou zárukou.",
    estimatedValue: "Sleva 15–30 %",
    estimatedTimeframe: "1–4 týdny",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["partner-club", "crowdfunding"],
    steps: [
      "Obvolat autorizované dealery Toyota, Ford, VW v regionu.",
      "Sledovat nabídky předváděcích vozů na webech dealerů.",
      "Vyjednat dodatečnou slevu za neziskový účel.",
    ],
    risks: [
      "Výběr modelu a konfigurace je omezený na to, co je skladem.",
      "Předváděcí vůz může mít vyšší výbavu, než klub potřebuje.",
    ],
    nextMoveOnAno: "Zajistit financování (leasing/úvěr/hotovost) a koupit.",
    nextMoveOnNe: "Přejít na fázi 4 — kombinované financování.",
    nextMoveOnPodminka: "Nechat si vůz rezervovat a mezitím zajistit finance.",
    relatedLeadIds: ["autoin"],
  },

  // ── FÁZE 4: Kombinované financování ──
  {
    id: "subsidized-lease",
    tier: 4,
    order: 1,
    label: "Operativní leasing z kombinace",
    headline: "Splátky pokryté z více příjmových proudů",
    description:
      "Splátky operativního leasingu (cca 19 500 Kč/měs.) pokrývají partneři + dotace + členské příspěvky. Vůz zahrnuje servis a pojištění.",
    estimatedValue: "Splátky pokryté",
    estimatedTimeframe: "1–2 měsíce",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["partner-club", "grant-nsa"],
    steps: [
      "Mít potvrzených alespoň 10 měsíčních partnerů.",
      "Vyčíslit celkový měsíční příjem vs. splátka + provoz.",
      "Podepsat smlouvu až po potvrzení servisní rezervy.",
    ],
    risks: [
      "Pokud partneři odpadnou, splátka zůstává.",
      "Sankce za nadlimitní kilometry mohou být vysoké.",
    ],
    nextMoveOnAno: "Vybrat konkrétní auto a podepsat leasing.",
    nextMoveOnNe: "Zvážit založení účelové neziskovky.",
    nextMoveOnPodminka: "Dojednat delší splatnost nebo nižší akontaci.",
  },
  {
    id: "new-nonprofit",
    tier: 4,
    order: 2,
    label: "Založení účelové neziskovky",
    headline: "Nové z.s. nebo z.ú. pro přístup k dotacím a transparentnost",
    description:
      "Účelová neziskovka (zapsaný ústav) zaměřená na mobilitu mládežnického sportu může odemknout dotační programy a zvýšit důvěryhodnost pro dárce.",
    estimatedValue: "Přístup k dotacím",
    estimatedTimeframe: "4–8 týdnů",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["grant-nsa", "crowdfunding"],
    steps: [
      "Konzultovat s právníkem formu (z.s. vs. z.ú.).",
      "Registrovat u krajského soudu.",
      "Nastavit transparentní účetnictví a výroční zprávy.",
    ],
    risks: [
      "Administrativa navíc — reportování, účetnictví, valné hromady.",
      "Nemusí být nutné, pokud stávající spolek dokáže žádat sám.",
    ],
    nextMoveOnAno: "Začít žádat o dotace a granty pod novým subjektem.",
    nextMoveOnNe: "Přejít na fázi 5 — vlastní příjmy.",
    nextMoveOnPodminka: "Ověřit, zda stávající stanovy stačí pro potřebné programy.",
  },

  // ── FÁZE 5: Vlastní příjmy ──
  {
    id: "partner-club",
    tier: 5,
    order: 1,
    label: "Klub měsíčních partnerů",
    headline: "Opakovatelný měsíční příjem na splátky a provoz",
    description:
      "Motor celé akce. 15 partnerů po 2 000 Kč = 30 000 Kč měsíčně. To pokryje splátku auta, pojištění i servis. Bez tohoto pilíře je auto neudržitelné.",
    estimatedValue: "15–30 000 Kč/měsíc",
    estimatedTimeframe: "3–6 týdnů",
    difficulty: "medium",
    probability: "high",
    complementaryIds: ["skoda-free", "automaker-program", "subsidized-lease"],
    steps: [
      "Vytvořit tři balíčky: 1 000 / 2 500 / 5 000 Kč měsíčně.",
      "Připravit protiplnění: logo na webu, banneru, fotky z výjezdů.",
      "Obvolat lokální firmy a rodiče s firmou.",
      "Spustit veřejné počítadlo získaných partnerství.",
    ],
    risks: [
      "Obecná nabídka bez konkrétního protiplnění firmy odloží.",
      "U opakovaných podpor odlišit dar a reklamní plnění (účetně).",
    ],
    nextMoveOnAno: "Podepsat partnerské smlouvy a spustit pravidelné inkaso.",
    nextMoveOnNe: "Zkusit dary od rodičů nebo crowdfunding.",
    nextMoveOnPodminka: "Nabídnout zkušební 3měsíční období.",
    relatedLeadIds: ["matrix", "bednar", "assa-abloy", "genesisrk", "poda"],
    relatedTemplateIds: ["company"],
  },
  {
    id: "parent-donations",
    tier: 5,
    order: 2,
    label: "Dary od rodičů a členů",
    headline: "Jednorázové nebo pravidelné příspěvky od rodičů závodníků",
    description:
      "Rodiče mají přímý zájem na tom, aby děti měly dopravu na soutěže. Transparentní účet a jasný cíl pomůže získat příspěvky.",
    estimatedValue: "30–100 000 Kč",
    estimatedTimeframe: "2–4 týdny",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["partner-club", "crowdfunding"],
    steps: [
      "Uspořádat schůzku rodičů a prezentovat projekt.",
      "Nabídnout jednorázový příspěvek nebo měsíční dar (500–2 000 Kč).",
      "Zřídit transparentní účet s veřejným přehledem příjmů.",
    ],
    risks: [
      "Ne všichni rodiče si mohou dovolit přispět.",
      "Nesmí vytvářet tlak nebo nerovnost mezi dětmi.",
    ],
    nextMoveOnAno: "Spustit pravidelné příspěvky a transparentní přehled.",
    nextMoveOnNe: "Zkusit crowdfunding kampaň.",
    nextMoveOnPodminka: "Nastavit dobrovolnou úroveň bez minimální částky.",
    relatedLeadIds: ["parents-network", "existing-partners", "personal-referrals"],
    relatedTemplateIds: ["parents"],
  },
  {
    id: "crowdfunding",
    tier: 5,
    order: 3,
    label: "Crowdfunding kampaň",
    headline: "Veřejná sbírka s konkrétním cílem 150–300k Kč",
    description:
      "Lidé i firmy snáz přispějí na konkrétní cíl typu '250 000 Kč na rozjezd 9místného auta' než na obecný provoz. Transparentní počítadlo je klíč.",
    estimatedValue: "150–300 000 Kč",
    estimatedTimeframe: "4–8 týdnů",
    difficulty: "medium",
    probability: "medium",
    complementaryIds: ["partner-club", "parent-donations"],
    steps: [
      "Zvolit platformu (Donio, HitHit nebo vlastní transparentní účet).",
      "Nastavit jasný cíl, termín a vizuální počítadlo.",
      "Propagovat přes sociální sítě, rodiče a lokální média.",
      "Nabídnout odměny: jméno na autě, VIP pozvánka na soutěž.",
    ],
    risks: [
      "Bez silného příběhu a propagace kampaň tiše umře.",
      "Jednorázová sbírka neřeší dlouhodobé měsíční závazky.",
    ],
    nextMoveOnAno: "Použít na akontaci leasingu nebo přímý nákup ojetiny.",
    nextMoveOnNe: "Přejít na fázi 6 — poslední záchrana.",
    nextMoveOnPodminka: "Prodloužit kampaň nebo snížit cílovou částku.",
    relatedLeadIds: ["parents-network", "personal-referrals"],
    relatedTemplateIds: ["parents"],
  },

  // ── FÁZE 6: Poslední záchrana ──
  {
    id: "used-car",
    tier: 6,
    order: 1,
    label: "Ojetý nebo předváděcí vůz",
    headline: "Levnější alternativa — ojetina za 400–600k Kč",
    description:
      "Pokud žádný ze zdrojů nepokryje nový vůz, ojetý 9místný vůz za 400–600k Kč je realistická alternativa. Nižší pořizovací cena, ale vyšší riziko oprav.",
    estimatedValue: "400–600 000 Kč",
    estimatedTimeframe: "1–3 týdny",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["own-loan"],
    steps: [
      "Hledat na sauto.cz, tipcars.com a u autorizovaných bazarů.",
      "Preferovat předváděcí vozy se zárukou (3–15 tis. km).",
      "Nechat vůz prověřit nezávislým mechanikem před koupí.",
    ],
    risks: [
      "Starší vůz = vyšší riziko nečekaných oprav.",
      "Bez záruky může první velká oprava stát desítky tisíc.",
    ],
    nextMoveOnAno: "Koupit a zajistit pojištění + servisní rezervu.",
    nextMoveOnNe: "Poslední možnost: vlastní úvěr oddílu.",
    nextMoveOnPodminka: "Nechat vůz v rezervaci a zajistit chybějící finance.",
    relatedLeadIds: ["autoin"],
  },
  {
    id: "own-loan",
    tier: 6,
    order: 2,
    label: "Vlastní úvěr oddílu",
    headline: "Poslední záchrana — úvěr z vlastních zdrojů",
    description:
      "Pokud nic jiného nevyjde, klub si může vzít standardní úvěr. Vyšší riziko, ale jistota pořízení. Vhodné zejména pro ojeté auto za nižší cenu.",
    estimatedValue: "Celá cena vozu",
    estimatedTimeframe: "2–4 týdny",
    difficulty: "low",
    probability: "high",
    complementaryIds: ["used-car"],
    steps: [
      "Získat nabídky od 3 bank/leasingových společností.",
      "Porovnat RPSN, měsíční splátku a celkovou cenu.",
      "Zvážit ojetý vůz za 400–600k Kč místo nového za 900k+.",
    ],
    risks: [
      "Měsíční splátka zatíží rozpočet bez externích příjmů.",
      "Starší vůz = vyšší riziko nečekaných oprav.",
    ],
    nextMoveOnAno: "Podepsat úvěrovou smlouvu a koupit auto.",
    nextMoveOnNe: "Odložit pořízení a vrátit se k budování zdrojů.",
    nextMoveOnPodminka: "Vyjednat odklad splátek nebo nižší úrok.",
  },
];

// ── Vehicle Options ──

export const vehicleOptions: VehicleOption[] = [
  {
    id: "toyota-proace-verso",
    label: "Toyota Proace Verso Kombi",
    brand: "Toyota",
    capacity: "9 míst",
    cashPrice: 906000,
    cashPriceWithDph: 1096260,
    leaseMonthly: 18500,
    leaseTerm: 60,
    leaseDeposit: 0,
    loanMonthly: 17200,
    loanTerm: 60,
    loanDeposit: 200000,
    condition: "new",
    runningCosts: {
      insurance: 3500,
      fuel: 5000,
      service: 1500,
      tires: 800,
      other: 500,
    },
    source: sources[9],
  },
  {
    id: "ford-tourneo-custom",
    label: "Ford Tourneo Custom",
    brand: "Ford",
    capacity: "9 míst",
    cashPrice: 939000,
    cashPriceWithDph: 1136190,
    leaseMonthly: 19500,
    leaseTerm: 60,
    leaseDeposit: 0,
    loanMonthly: 17800,
    loanTerm: 60,
    loanDeposit: 200000,
    condition: "new",
    runningCosts: {
      insurance: 3800,
      fuel: 5500,
      service: 1800,
      tires: 800,
      other: 500,
    },
    source: sources[11],
  },
  {
    id: "vw-caravelle",
    label: "Volkswagen Caravelle",
    brand: "Volkswagen",
    capacity: "9 míst",
    cashPrice: 1050000,
    cashPriceWithDph: 1270500,
    leaseMonthly: 22000,
    leaseTerm: 48,
    leaseDeposit: 100000,
    loanMonthly: 20500,
    loanTerm: 60,
    loanDeposit: 250000,
    condition: "new",
    runningCosts: {
      insurance: 4200,
      fuel: 5500,
      service: 2000,
      tires: 900,
      other: 600,
    },
    source: sources[12],
  },
  {
    id: "used-van",
    label: "Ojetý 9místný vůz",
    brand: "Různé",
    capacity: "9 míst",
    cashPrice: 450000,
    cashPriceWithDph: 450000,
    leaseMonthly: null,
    leaseTerm: null,
    leaseDeposit: 0,
    loanMonthly: 8500,
    loanTerm: 60,
    loanDeposit: 50000,
    condition: "used",
    runningCosts: {
      insurance: 2800,
      fuel: 6000,
      service: 3000,
      tires: 1000,
      other: 1200,
    },
    source: {
      label: "Bazary a předváděcí vozy",
      url: "https://www.sauto.cz",
      note: "Orientační cena ojetého 9místného vozu 3-5 let starého.",
    },
  },
];

// ── Funding Sources ──

export const fundingSources: FundingSource[] = [
  {
    id: "fs-skoda",
    label: "Škoda Auto / NFSA",
    type: "corporate",
    estimatedMin: 0,
    estimatedMax: 1100000,
    probability: "medium",
    linkedNodeId: "skoda-free",
    note: "Auto zdarma nebo výrazný příspěvek na akontaci.",
  },
  {
    id: "fs-skoda-foundation",
    label: "Nadační fond Škoda Auto",
    type: "grant",
    estimatedMin: 100000,
    estimatedMax: 500000,
    probability: "medium",
    linkedNodeId: "skoda-foundation",
    note: "Grant na mobilitu mládežnického sportu z NFSA.",
  },
  {
    id: "fs-automaker",
    label: "Partnerský program",
    type: "corporate",
    estimatedMin: 50000,
    estimatedMax: 300000,
    probability: "medium",
    linkedNodeId: "automaker-program",
    note: "Sleva 10–30 % přes partnerský program automobilky.",
  },
  {
    id: "fs-fleet",
    label: "Flotilový leasing",
    type: "corporate",
    estimatedMin: 36000,
    estimatedMax: 96000,
    probability: "medium",
    linkedNodeId: "fleet-lease",
    note: "Úspora 3–8 000 Kč/měs. na splátce × 12 měsíců.",
  },
  {
    id: "fs-city",
    label: "Dotace město Rychnov",
    type: "grant",
    estimatedMin: 20000,
    estimatedMax: 80000,
    probability: "high",
    linkedNodeId: "grant-city",
    note: "Městská dotace na sportovní činnost mládeže.",
  },
  {
    id: "fs-region",
    label: "Dotace Královéhradecký kraj",
    type: "grant",
    estimatedMin: 30000,
    estimatedMax: 150000,
    probability: "high",
    linkedNodeId: "grant-region",
    note: "Krajská dotace na sport a volnočasové aktivity.",
  },
  {
    id: "fs-nsa",
    label: "NSA Můj klub",
    type: "grant",
    estimatedMin: 50000,
    estimatedMax: 200000,
    probability: "high",
    linkedNodeId: "grant-nsa",
    note: "Provozní dotace z Národní sportovní agentury.",
  },
  {
    id: "fs-foundations",
    label: "Nadace (ČEZ, O2 aj.)",
    type: "grant",
    estimatedMin: 50000,
    estimatedMax: 300000,
    probability: "medium",
    linkedNodeId: "grant-foundations",
    note: "Granty z firemních a nezávislých nadací.",
  },
  {
    id: "fs-partners",
    label: "Klub partnerů",
    type: "partners",
    estimatedMin: 180000,
    estimatedMax: 360000,
    probability: "high",
    linkedNodeId: "partner-club",
    note: "15–30k Kč/měsíc × 12 = roční příjem na splátky.",
  },
  {
    id: "fs-parents",
    label: "Dary rodičů a členů",
    type: "partners",
    estimatedMin: 30000,
    estimatedMax: 100000,
    probability: "high",
    linkedNodeId: "parent-donations",
    note: "Jednorázové nebo pravidelné příspěvky od rodičů.",
  },
  {
    id: "fs-crowdfunding",
    label: "Crowdfunding",
    type: "crowdfunding",
    estimatedMin: 100000,
    estimatedMax: 300000,
    probability: "medium",
    linkedNodeId: "crowdfunding",
    note: "Jednorázová kampaň na akontaci.",
  },
  {
    id: "fs-own",
    label: "Vlastní zdroje",
    type: "own",
    estimatedMin: 0,
    estimatedMax: 100000,
    probability: "high",
    linkedNodeId: "own-loan",
    note: "Členské příspěvky a úspory oddílu.",
  },
];

// ── Phase Configuration ──

export const PHASE_CONFIG: PhaseConfig[] = [
  {
    id: "start",
    label: "ZAČÁTEK",
    name: "Nejlepší varianta",
    color: "var(--green)",
    nodeIds: ["skoda-free"],
    description: "Nejlogičtější první dveře — Škoda Auto má závod v Kvasinách 15 km od Rychnova.",
  },
  {
    id: "faze-1",
    label: "FÁZE 1",
    name: "Alternativy zdarma",
    color: "var(--green)",
    nodeIds: ["competitor-free", "skoda-foundation"],
    description: "Pokud Škoda neodpoví, zkusit konkurenční značky nebo Nadační fond.",
  },
  {
    id: "faze-2",
    label: "FÁZE 2",
    name: "Dotace a granty",
    color: "var(--blue)",
    nodeIds: ["grant-city", "grant-region", "grant-nsa", "grant-eu", "grant-foundations"],
    description: "Veřejné a nadační peníze, které uvolní rozpočet klubu na splátky auta.",
  },
  {
    id: "faze-3",
    label: "FÁZE 3",
    name: "Zvýhodněné pořízení",
    color: "var(--accent)",
    nodeIds: ["automaker-program", "fleet-lease", "demo-car"],
    description: "Slevy a zvýhodněné podmínky od automobilek a dealerů.",
  },
  {
    id: "faze-4",
    label: "FÁZE 4",
    name: "Kombinované financování",
    color: "var(--gold)",
    nodeIds: ["subsidized-lease", "new-nonprofit"],
    description: "Složit splátky z více příjmových proudů nebo založit účelovou organizaci.",
  },
  {
    id: "faze-5",
    label: "FÁZE 5",
    name: "Vlastní příjmy",
    color: "var(--purple)",
    nodeIds: ["partner-club", "parent-donations", "crowdfunding"],
    description: "Měsíční příjmy od partnerů, rodičů a veřejné sbírky.",
  },
  {
    id: "faze-6",
    label: "FÁZE 6",
    name: "Poslední záchrana",
    color: "var(--muted)",
    nodeIds: ["used-car", "own-loan"],
    description: "Levnější ojetina nebo standardní úvěr — poslední možnost, když nic jiného nevyjde.",
  },
];

// ── All Leads (merged) ──

export const allLeads: Lead[] = [...automotiveLeads, ...localCompanyLeads, ...communityLeads];

export const leadsById = new Map(allLeads.map((l) => [l.id, l]));

export const templatesById = new Map(documentTemplates.map((t) => [t.id, t]));
