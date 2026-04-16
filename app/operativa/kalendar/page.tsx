import { getProgramsWithDeadline2026 } from "../../lib/db";
import type { Program } from "../../lib/db";
import Link from "next/link";

const CYCLE_EVENTS: {
  month: number;
  label: string;
  color: string;
  type: "deadline" | "prep" | "action" | "admin";
}[] = [
  { month: 1, label: "Výroční zpráva oddílu za předchozí rok", color: "var(--muted)", type: "admin" },
  { month: 1, label: "Audit oddílové pokladny", color: "var(--muted)", type: "admin" },
  { month: 2, label: "Podání přihlášek — jarní grant kola", color: "var(--accent)", type: "prep" },
  { month: 2, label: "Kontaktování sponzorů — jarní oslovení", color: "var(--accent)", type: "prep" },
  { month: 3, label: "Uzávěrky jarního kola nadačních programů", color: "var(--red)", type: "deadline" },
  { month: 3, label: "Prezentační materiály pro partnery", color: "var(--muted)", type: "admin" },
  { month: 4, label: "Start závodní sezóny — první výjezdy", color: "var(--green)", type: "action" },
  { month: 4, label: "Follow-up ke sponzorským oslovením", color: "var(--accent)", type: "prep" },
  { month: 5, label: "Krajská kola — přihlášky na mistrovství", color: "var(--green)", type: "action" },
  { month: 6, label: "Příprava žádostí pro podzimní kola", color: "var(--accent)", type: "prep" },
  { month: 6, label: "Letní soustředění — plánování a rozpočet", color: "var(--muted)", type: "admin" },
  { month: 7, label: "Letní výjezdy a soustředění", color: "var(--green)", type: "action" },
  { month: 8, label: "Uzávěrky letních grantových výzev", color: "var(--red)", type: "deadline" },
  { month: 8, label: "Podklady pro podzimní sezónu", color: "var(--muted)", type: "admin" },
  { month: 9, label: "Podzimní sezóna — mistrovství ČR", color: "var(--green)", type: "action" },
  { month: 9, label: "Oslovení firem — podzimní sponzoring", color: "var(--accent)", type: "prep" },
  { month: 10, label: "Uzávěrky podzimního kola dotací a grantů", color: "var(--red)", type: "deadline" },
  { month: 10, label: "Příprava rozpočtu na příští rok", color: "var(--muted)", type: "admin" },
  { month: 11, label: "Výroční valná hromada oddílu", color: "var(--blue)", type: "admin" },
  { month: 11, label: "Žádosti do vánočních / novoročních výzev", color: "var(--accent)", type: "prep" },
  { month: 12, label: "Uzávěrka účetního roku", color: "var(--muted)", type: "admin" },
  { month: 12, label: "Plánování akcí a rozpočtu pro příští sezónu", color: "var(--muted)", type: "admin" },
];

const MONTH_NAMES = [
  "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
  "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
];

const MONTH_SHORT = [
  "Led", "Úno", "Bře", "Dub", "Kvě", "Čer",
  "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro",
];

function getMonth(deadline: string): number | null {
  const m = deadline.match(/^2026-(\d{2})/);
  if (!m) return null;
  return parseInt(m[1], 10);
}

function fmtDeadlineShort(d: string): string {
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "short" });
}

function deadlineDaysLeft(d: string): number {
  const date = new Date(d);
  return Math.ceil((date.getTime() - Date.now()) / 86400000);
}

function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    dotace: "var(--blue)",
    grant: "var(--purple)",
    sponzoring: "var(--accent)",
    nadace: "var(--green)",
    "leasing-dotovany": "var(--gold)",
    crowdfunding: "var(--red)",
    komunita: "var(--green)",
    "vlastni-zdroje": "var(--muted)",
  };
  return map[cat] ?? "var(--muted)";
}

function categoryShort(cat: string): string {
  const map: Record<string, string> = {
    dotace: "DOT",
    grant: "GRA",
    sponzoring: "SPO",
    nadace: "NAD",
    "leasing-dotovany": "LEA",
    crowdfunding: "CRW",
    komunita: "KOM",
    "vlastni-zdroje": "VLA",
  };
  return map[cat] ?? cat.slice(0, 3).toUpperCase();
}

type EventType = "deadline" | "prep" | "action" | "admin";

function typeIcon(t: EventType): string {
  if (t === "deadline") return "⚑";
  if (t === "prep") return "◎";
  if (t === "action") return "▶";
  return "○";
}

export default function KalendarPage() {
  const programs = getProgramsWithDeadline2026();

  // Group programs by month
  const byMonth: Record<number, Program[]> = {};
  for (const p of programs) {
    const m = getMonth(p.deadline_2026!);
    if (m !== null) {
      if (!byMonth[m]) byMonth[m] = [];
      byMonth[m].push(p);
    }
  }

  // Group cycle events by month
  const cycleByMonth: Record<number, typeof CYCLE_EVENTS> = {};
  for (const ev of CYCLE_EVENTS) {
    if (!cycleByMonth[ev.month]) cycleByMonth[ev.month] = [];
    cycleByMonth[ev.month].push(ev);
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  // Count total deadlines in future months
  const futureDeadlines = programs.filter((p) => {
    const m = getMonth(p.deadline_2026!);
    return m !== null && m >= currentMonth;
  }).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

      {/* ── Hlavička ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", lineHeight: 1.1 }}>
            Kalendář 2026
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
            Roční cyklus · {futureDeadlines} programových deadlinů zbývá
          </p>
        </div>

        {/* Legenda */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { color: "var(--red)", icon: "⚑", label: "Uzávěrka" },
            { color: "var(--accent)", icon: "◎", label: "Příprava" },
            { color: "var(--green)", icon: "▶", label: "Akce" },
            { color: "var(--muted)", icon: "○", label: "Správa" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ fontSize: "0.7rem", color: l.color }}>{l.icon}</span>
              <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{l.label}</span>
            </div>
          ))}
          <div style={{ width: "1px", background: "var(--line)", alignSelf: "stretch" }} />
          {[
            { color: "var(--blue)", label: "Dotace" },
            { color: "var(--purple)", label: "Grant" },
            { color: "var(--accent)", label: "Sponzor" },
            { color: "var(--green)", label: "Nadace" },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: l.color, display: "inline-block" }} />
              <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 12 měsíců v gridu 3×4 ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.875rem",
        }}
        className="cal-grid"
      >
        {MONTH_NAMES.map((name, idx) => {
          const month = idx + 1;
          const isPast = month < currentMonth;
          const isCurrent = month === currentMonth;
          const cycleEvts = cycleByMonth[month] ?? [];
          const deadlines = byMonth[month] ?? [];

          // Urgency: jsou nějaké deadliny do 30 dní?
          const hasUrgent = deadlines.some((p) => {
            const days = deadlineDaysLeft(p.deadline_2026!);
            return days >= 0 && days <= 30;
          });

          const borderColor = isCurrent
            ? "var(--accent)"
            : hasUrgent
            ? "color-mix(in srgb, var(--red) 40%, var(--line))"
            : "var(--line)";

          return (
            <div
              key={month}
              style={{
                background: "var(--surface)",
                border: `1px solid ${borderColor}`,
                borderTop: isCurrent
                  ? "3px solid var(--accent)"
                  : hasUrgent
                  ? "3px solid var(--red)"
                  : "3px solid var(--line)",
                borderRadius: "0.875rem",
                overflow: "hidden",
                opacity: isPast ? 0.55 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {/* Měsíc záhlaví */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem 0.625rem",
                  background: isCurrent ? "var(--accent-soft)" : "var(--surface-raised)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: isCurrent ? "var(--accent)" : "var(--foreground)",
                    }}
                  >
                    {name}
                  </span>
                  {isCurrent && (
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}
                    >
                      aktuální
                    </span>
                  )}
                  {isPast && (
                    <span style={{ fontSize: "0.58rem", color: "var(--muted)" }}>prošlý</span>
                  )}
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                  {cycleEvts.filter((e) => e.type === "deadline").length > 0 && (
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        color: "var(--red)",
                        background: "var(--red-soft)",
                        padding: "0.1rem 0.35rem",
                        borderRadius: "0.25rem",
                      }}
                    >
                      ⚑
                    </span>
                  )}
                  {deadlines.length > 0 && (
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        color: hasUrgent ? "var(--red)" : "var(--muted)",
                        background: hasUrgent ? "var(--red-soft)" : "var(--surface-raised)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "0.25rem",
                        border: "1px solid var(--line)",
                      }}
                    >
                      {deadlines.length}×
                    </span>
                  )}
                </div>
              </div>

              {/* Obsah */}
              <div style={{ padding: "0.75rem 1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {/* Cyklické akce */}
                {cycleEvts.map((ev, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: ev.color,
                        flexShrink: 0,
                        marginTop: "0.15rem",
                        lineHeight: 1,
                      }}
                    >
                      {typeIcon(ev.type)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: ev.type === "deadline" ? "var(--foreground)" : "var(--muted)",
                        lineHeight: 1.4,
                        fontWeight: ev.type === "deadline" ? 600 : 400,
                      }}
                    >
                      {ev.label}
                    </span>
                  </div>
                ))}

                {/* Oddělovač pokud máme obojí */}
                {cycleEvts.length > 0 && deadlines.length > 0 && (
                  <div style={{ height: "1px", background: "var(--line)", margin: "0.35rem 0" }} />
                )}

                {/* Programové deadliny */}
                {deadlines.map((p) => {
                  const days = deadlineDaysLeft(p.deadline_2026!);
                  const isUrgent = days >= 0 && days <= 30;
                  const col = categoryColor(p.category);
                  return (
                    <Link
                      key={p.id}
                      href={`/operativa/programy?id=${p.id}`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.4rem",
                        textDecoration: "none",
                        borderRadius: "0.375rem",
                        padding: "0.2rem 0.25rem",
                        margin: "0 -0.25rem",
                        transition: "background 0.12s",
                      }}
                      className="cal-prog-link"
                    >
                      <span
                        style={{
                          fontSize: "0.58rem",
                          fontWeight: 800,
                          color: col,
                          background: `color-mix(in srgb, ${col} 15%, transparent)`,
                          padding: "0.1rem 0.3rem",
                          borderRadius: "0.2rem",
                          flexShrink: 0,
                          marginTop: "0.05rem",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {categoryShort(p.category)}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: isUrgent ? "var(--foreground)" : "var(--muted)",
                            fontWeight: isUrgent ? 600 : 400,
                            lineHeight: 1.35,
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.name}
                        </span>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            color: isUrgent ? "var(--red)" : "var(--muted)",
                          }}
                        >
                          {fmtDeadlineShort(p.deadline_2026!)}
                          {isUrgent && ` · za ${days}d`}
                        </span>
                      </div>
                    </Link>
                  );
                })}

                {cycleEvts.length === 0 && deadlines.length === 0 && (
                  <p style={{ fontSize: "0.7rem", color: "var(--muted)", padding: "0.25rem 0" }}>
                    Žádné akce.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .cal-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .cal-prog-link:hover {
          background: var(--surface-hover);
        }
      `}</style>
    </div>
  );
}
