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

export type InstitutionTarget = {
  name: string;
  lane: string;
  ask: string;
  whyNow: string;
  source?: SourceLink;
};

export type LegalNote = {
  title: string;
  keyRule: string;
  text: string;
  source: SourceLink;
};

export type Lead = {
  name: string;
  kind: string;
  angle: string;
  ask: string;
  contact: string;
  source: SourceLink;
};

export type TemplateBlock = {
  id: string;
  label: string;
  subject?: string;
  summary: string;
  body: string;
  usage: string[];
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

export const institutionTargets: InstitutionTarget[] = [
  {
    name: "Škoda Auto Kvasiny / regionální vedení",
    lane: "Automobilky",
    ask: "5leté regionální mobilitní partnerství pro 9místný vůz nebo jeho akontaci",
    whyNow: "Je to nejpřirozenější lokální příběh a největší reputační páka v okolí.",
    source: sources[13],
  },
  {
    name: "Nadační fond Škoda Auto",
    lane: "Nadace",
    ask: "Ověření vhodného grantového nebo individuálního rámce pro mobilitu mládežnického sportu",
    whyNow: "Má veřejně viditelnou roli v regionální podpoře a stojí za to jít po konkrétním fitu programu.",
    source: sources[6],
  },
  {
    name: "Hyundai Motor Czech – flotilové centrum",
    lane: "Automobilky",
    ask: "Zvýhodněný flotilový nebo zaměstnanecky podobný režim pro spolek s veřejným dopadem",
    whyNow: "Hyundai veřejně mluví o flotilových a zvýhodněných skupinách, takže se dá žádat o individuální výjimku nebo zvýhodněnou nabídku pro neziskový subjekt.",
    source: sources[8],
  },
  {
    name: "Toyota prodejce + Toyota Financial Services / KINTO ONE",
    lane: "Automobilky",
    ask: "Konkrétní nabídka Proace Verso Kombi 9 míst, 5 let, 20 až 30 tisíc km ročně",
    whyNow: "Toyota už veřejně ukazuje financovací rámec pro Proace Verso, takže cesta k reálné nabídce je krátká.",
    source: sources[9],
  },
  {
    name: "Ford prodejce / Tourneo Custom",
    lane: "Automobilky",
    ask: "Reálná nabídka 9místného Tourneo Custom včetně pojištění a servisu",
    whyNow: "Ford má veřejnou vstupní cenu a silnou užitkovou platformu, což je dobré srovnání i vyjednávací tlak na ostatní.",
    source: sources[11],
  },
  {
    name: "Volkswagen Užitkové vozy / Porsche Česká republika",
    lane: "Automobilky",
    ask: "Caravelle nebo obdobná 9místná varianta v regionálním nebo flotilovém režimu",
    whyNow: "Kvůli vazbě na Kvasiny a skupinu VW je to silný strategický kontakt, i když veřejná cena není jednoduše vystavená.",
    source: sources[12],
  },
  {
    name: "Město Rychnov nad Kněžnou",
    lane: "Veřejné finance",
    ask: "Pravidelná provozní podpora a potvrzení, jaké městské linky umí uvolnit rozpočet klubu",
    whyNow: "Město je nejblíž a má smysl ho mít na palubě dřív, než klub přijde za velkými firmami.",
    source: sources[2],
  },
  {
    name: "Královéhradecký kraj",
    lane: "Veřejné finance",
    ask: "Programy pro sport, volný čas a případné individuální dotace",
    whyNow: "Krajská podpora může být důležitá pro provoz, reprezentaci a uvolnění vlastních peněz klubu.",
    source: sources[3],
  },
  {
    name: "Národní sportovní agentura",
    lane: "Veřejné finance",
    ask: "Provozní podporu typu Můj klub používat jako odlehčení rozpočtu, ne jako přímý nákup auta",
    whyNow: "Je potřeba oddělit, co je vhodné pro provoz a co není vhodné pro vozidlo, aby klub netrávil čas slepou cestou.",
    source: sources[5],
  },
  {
    name: "Lokální firmy: výroba, stavebnictví, účetnictví, zdravotnictví, služby",
    lane: "Měsíční partneři",
    ask: "Partnerství 1 000 až 5 000 Kč měsíčně s jasným balíčkem viditelnosti",
    whyNow: "Tahle vrstva vytváří trvalé peněžní tok. Má začít hned, i když se zároveň řeší velký partner.",
  },
];

export const actionPhases: ActionPhase[] = [
  {
    title: "Příprava argumentů",
    window: "Týden 1",
    outcome: "Nabídkový materiál, čísla výjezdů a jasný model toho, co klub chce.",
    actions: [
      "Sepsat posledních 12 měsíců výjezdů: počet akcí, počet lidí, kilometry, proč nestačí osobáky.",
      "Připravit jednostránkový klubový profil a dvoustránkové mobilitní shrnutí.",
      "Stanovit tři cíle: 9místné auto, menší auto, záložní varianta ojetina.",
    ],
  },
  {
    title: "Jednání s klíčovými partnery",
    window: "Týden 2 až 3",
    outcome: "První reálné odpovědi od automotive partnerů a města.",
    actions: [
      "Oslovit Škoda Auto Kvasiny a Nadační fond Škoda Auto s regionální mobilitní žádostí.",
      "Poslat stejné zadání Hyundai, Toyota, Fordu a VW Užitkové vozy.",
      "Domluvit schůzku s městem a potvrdit veřejné podpory, které lze skládat vedle auta.",
    ],
  },
  {
    title: "Klub partnerů",
    window: "Týden 3 až 6",
    outcome: "Opakovatelné měsíční peněžní tok a první podpisy.",
    actions: [
      "Vytvořit tři balíčky partnerství včetně loga na webu, banneru a vyúčtováníové fotografie z výjezdů.",
      "Obvolat lokální firmy a nabízet měsíční partnerství, ne jednorázové neurčité dary.",
      "Spustit veřejné počítadlo akontace nebo servisní rezervy.",
    ],
  },
  {
    title: "Rozhodnutí o modelu auta",
    window: "Týden 6 až 10",
    outcome: "Výběr mezi novým vozem, operativním leasingem, balonem nebo předváděcí záložní variantou.",
    actions: [
      "Porovnat minimálně tři závazné nabídky: cena, nájezd, servis, pojištění, sankce za km, odkup.",
      "Dopočítat měsíční zátěž proti skutečně podepsaným partnerstvím.",
      "Rozhodnout, jestli klub spouští rovnou i menší auto, nebo ho nechá na druhou fázi.",
    ],
  },
  {
    title: "Podpis a vyúčtování",
    window: "Týden 10+",
    outcome: "Auto je na cestě a partner ví, jak bude jeho podpora vidět.",
    actions: [
      "Podepsat smlouvu na auto až po potvrzení servisní rezervy.",
      "Nastavit kvartální report pro partnery: akce, najeté km, medaile, fotky.",
      "Připravit druhou vlnu pro menší auto nebo obnovu za 2 až 3 roky.",
    ],
  },
];

export const legalNotes: LegalNote[] = [
  {
    title: "Dar od firmy není sleva na dani 1:1",
    keyRule: "Minimum 2 000 Kč/rok, max. 10 % základu daně — odpočet, ne sleva.",
    text: "Právnická osoba může podle § 20 odst. 8 zákona o daních z příjmů odečíst hodnotu bezúplatného plnění na sportovní účely, pokud činí alespoň <strong>2 000 Kč za rok</strong>. V úhrnu jde nejvýše o <strong>10 % základu daně</strong> sníženého podle § 34. To je odpočet od základu daně, <strong>ne přímá sleva na dani</strong>.",
    source: sources[14],
  },
  {
    title: "Pro firmy bývá praktičtější sponzoring/reklama",
    keyRule: "Logo a zmínky = reklamní smlouva, ne dar. Ověřit s účetním.",
    text: "Pokud firma chce protiplnění typu logo, zmínky nebo prezentaci značky, je zpravidla čistší uzavřít <strong>reklamní nebo sponzorskou smlouvu</strong> místo daru. Pro opakovanou měsíční podporu je to často účetně i obchodně přirozenější. Konkrétní nastavení má ověřit účetní klubu i partnera.",
    source: sources[14],
  },
  {
    title: "Můj klub 2026 není hlavní cesta k přímému autu",
    keyRule: "Nezpůsobilé: majetek nad 60 000 Kč bez DPH + leasing osobních aut.",
    text: "V pravidlech výzvy Můj klub 2026 jsou mezi nezpůsobilými náklady uvedeny pořízení nebo technické zhodnocení hmotného majetku <strong>nad 60 000 Kč bez DPH</strong> a také <strong>finanční leasing osobních automobilů</strong> a dalšího majetku. Program proto ber jako provozní polštář, ne jako nákup dodávky.",
    source: sources[5],
  },
];

export const automotiveLeads: Lead[] = [
  {
    name: "Škoda Auto / flotila a financování",
    kind: "Automobilový partner",
    angle: "Lokální příběh přes Kvasiny a silná regionální relevance.",
    ask: "Regionální mobilitní partnerství nebo výrazně zvýhodněná 9místná varianta přes skupinu VW.",
    contact: "Flotilní a finanční vstup pro další navázání.",
    source: sources[13],
  },
  {
    name: "Nadační fond Škoda Auto",
    kind: "Nadace",
    angle: "Veřejně viditelná regionální podpora a logický vstup do vyjednávání.",
    ask: "Ověřit, zda je možný grantový nebo individuální rámec pro mobilitu mládežnického sportu.",
    contact: "Nadační fond a přehled programů.",
    source: sources[6],
  },
  {
    name: "Hyundai flotilové centrum",
    kind: "Flotila a zvýhodněné skupiny",
    angle: "Oficiálně komunikují flotilové centrum a zvýhodněné skupiny.",
    ask: "Individuální neziskový nabídka pro 9místný vůz nebo levnější druhé auto.",
    contact: "Flotilové obchodní centrum / kontaktní formulář.",
    source: sources[8],
  },
  {
    name: "Toyota / KINTO ONE",
    kind: "Financování a vůz",
    angle: "Toyota zveřejňuje Proace Verso i vzorovou kalkulaci financování.",
    ask: "Konkrétní nabídka Proace Verso Kombi 9 míst na 60 měsíců s vyšším ročním nájezdem.",
    contact: "Toyota prodejce nebo Toyota Financial Services.",
    source: sources[9],
  },
  {
    name: "Ford Tourneo Custom",
    kind: "Vozidlo a srovnání",
    angle: "Veřejná cena dává dobrý srovnávací rámec.",
    ask: "Nabídka 9místného Tourneo se servisem a pojištěním.",
    contact: "Oficiální produkt a nabídka od prodejce.",
    source: sources[11],
  },
  {
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
  {
    name: "Rodiče a členové s vlastní firmou",
    kind: "Nejteplejší kontakt",
    angle: "Nejsnazší vstup, protože oddíl už má vztah a důvěru.",
    ask: "500 až 2 500 Kč měsíčně nebo propojení na jednatele a majitele firem v okolí.",
    contact: "Řešit přes interní leták a osobní oslovení na trénincích, ne jen veřejným postem.",
    source: {
      label: "Interní linka oddílu",
      url: "https://www.shin-kyo.cz/o-nas/",
      note: "Oddíl má vlastní komunitu, která je první vrstvou pro osobní doporučení.",
    },
  },
];

export const warmIntroLeads: Lead[] = [
  {
    name: "MATRIX a.s. a GenesisRK",
    kind: "Stávající nebo přirozeně blízký partner",
    angle: "Tohle nejsou studené kontakty. První krok má být osobní navázání, ne hromadný e-mail.",
    ask: "Krátká schůzka nebo hovor k navýšení podpory na měsíční mobilitní partnerství.",
    contact: "Začít přes veřejně známé kontakty a současně přes vazbu oddílu na stávající spolupráci.",
    source: sources[1],
  },
  {
    name: "PODA, Hájek-Cargo, HAMROZI, STL Express",
    kind: "Teplý kontakt z partnerské stránky SHIN-KYO",
    angle: "Mají už pozitivní vztah k oddílu, takže je reálné jít rovnou po konkrétní částce nebo cíli.",
    ask: "Převést obecnou podporu na jasný balíček: servisní rezerva, měsíční splátka nebo spoluúčast na akontaci.",
    contact: "Nejdřív využít interní vztah a teprve potom dohledávat konkrétní oddělení nebo účetní workflow.",
    source: sources[1],
  },
  {
    name: "Rodiče a členové s firmou nebo manažerskou rolí",
    kind: "Nejrychlejší osobní doporučení",
    angle: "Nejlepší cesta k jednateli nebo správci vozového parku bývá přes osobní doporučení, ne přes recepci.",
    ask: "Vyžádat kontakt na rozhodovací osobu a poslat krátký osobní forward s doporučením.",
    contact: "Řešit interním letákem, členským e-mailem a osobně na tréninku.",
    source: sources[0],
  },
];

export const documentTemplates: TemplateBlock[] = [
  {
    id: "automotive",
    label: "Automobilce",
    subject: "Regionální mobilitní partnerství pro SHIN-KYO Rychnov nad Kněžnou",
    summary: "První kontakt pro Škodu, Hyundai, Toyotu, Ford nebo prodejce.",
    body: `Dobrý den,\n\nobracím se za karate oddíl SHIN-KYO Rychnov nad Kněžnou. Pro děti, mládež a reprezentaci oddílu řešíme dlouhodobou mobilitu na soutěže a soustředění po celé ČR a podle možností i do zahraničí.\n\nHledáme partnera pro 9místné vozidlo, ideálně formou:\n- zvýhodněné dlouhodobé zápůjčky,\n- individuálních flotilových podmínek,\n- nebo příspěvku na akontaci a rozjezd financování.\n\nNejde nám o luxusní výbavu. Potřebujeme spolehlivé a nákladově rozumné auto, které bude pravidelně vozit sportovce na akce a zároveň dává smysl i z hlediska regionálního a reputačního dopadu.\n\nZa partnerství nabízíme:\n- jasně viditelnou regionální vazbu,\n- prezentaci partnera na webu a při komunikaci oddílu,\n- průběžné vyúčtování o využití vozu,\n- konkrétní příběh podpory mládežnického sportu.\n\nPokud to pro vás dává smysl, pošlu stručné dvoustránkové shrnutí a rád navrhnu krátký hovor nebo osobní schůzku.\n\nDěkuji a zdravím\n[JMÉNO]\n[ROLE V ODDÍLU]\n[TELEFON]\n[E-MAIL]`,
    usage: [
      "Použít pro první vlnu na Škodu, Hyundai, Toyota, Ford, VW a prodejce.",
      "Do přílohy přidat jednostránkový profil oddílu a stručné mobilitní shrnutí.",
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
  },
  {
    id: "navázání",
    label: "Navázání po telefonu",
    summary: "Stručný skript pro navázání na odeslaný e-mail bez zbytečného vysvětlování.",
    body: `Dobrý den, tady [JMÉNO] z karate oddílu SHIN-KYO Rychnov nad Kněžnou.\n\nPosílali jsme krátký e-mail k mobilitě dětí a výjezdům na soutěže. Nevolám kvůli dlouhé prezentaci, jen chci ověřit, jestli se to dostalo ke správnému člověku a jestli má smysl poslat stručné dvoustránkové shrnutí.\n\nŘešíme 9místné auto pro oddíl a skládáme ho z jednoho silnějšího partnera a několika pravidelných partnerství. Pokud je ve firmě někdo, kdo řeší marketing, společenskou odpovědnost nebo podobné lokální podpory, budu rád za nasměrování.\n\nMůžu vám krátké shrnutí poslat ještě dnes.`,
    usage: [
      "Použít 1 až 2 dny po e-mailu, ne až po týdnu.",
      "Cíl hovoru není prodat všechno po telefonu, ale dostat se ke správné osobě nebo na krátkou schůzku.",
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
    relatedTemplateIds: ["automotive"],
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
    relatedTemplateIds: ["automotive"],
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
    relatedTemplateIds: ["automotive"],
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
    relatedTemplateIds: ["automotive"],
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
