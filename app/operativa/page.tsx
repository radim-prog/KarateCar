import Link from "next/link";
import {
  getTopPrograms,
  getProgramStats,
  getUpcomingDeadlines,
} from "../lib/db";

function fmtAmount(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1_000_000) {
    return `${(v / 1_000_000).toFixed(1).replace(".0", "")} M Kč`;
  }
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(v);
}

function deadlineDaysLeft(d: string | null): number | null {
  if (!d || ["prošlo", "neotevřeno", "průběžně", "?"].includes(d)) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return Math.ceil((date.getTime() - Date.now()) / 86400000);
}

function fmtDeadline(d: string | null): string {
  if (!d || ["prošlo", "neotevřeno", "průběžně", "?"].includes(d)) return d ?? "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "short" });
}

function urgencyTier(days: number | null): "critical" | "warning" | "ok" | "none" {
  if (days === null) return "none";
  if (days <= 14) return "critical";
  if (days <= 45) return "warning";
  return "ok";
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

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    dotace: "Dotace",
    grant: "Grant",
    sponzoring: "Sponzoring",
    nadace: "Nadace",
    "leasing-dotovany": "Leasing",
    crowdfunding: "Crowdfunding",
    komunita: "Komunita",
    "vlastni-zdroje": "Vlastní",
  };
  return map[cat] ?? cat;
}

// Roční cyklus — 4 klíčové čtvrtletní momenty
const ANNUAL_MOMENTS = [
  {
    season: "Q1 · Leden–Únor",
    icon: "◈",
    color: "var(--blue)",
    actions: ["Výroční zpráva", "Jarní grant kola"],
  },
  {
    season: "Q2 · Jaro",
    icon: "◈",
    color: "var(--green)",
    actions: ["Uzávěrky jarního kola", "Start závodní sezóny"],
  },
  {
    season: "Q3 · Červenec",
    icon: "◈",
    color: "var(--accent)",
    actions: ["Letní soustředění", "Uzávěrky letních výzev"],
  },
  {
    season: "Q4 · Podzim",
    icon: "◈",
    color: "var(--red)",
    actions: ["Podzimní dotační kola", "Rozpočet příštího roku"],
  },
];

// "Tento týden" — programy s deadlinem do 14 dní od dnes, nebo průběžné high-relevance
function getThisWeekItems(programs: ReturnType<typeof getTopPrograms>) {
  return programs.filter((p) => {
    const days = deadlineDaysLeft(p.deadline_2026);
    if (days !== null && days <= 21) return true;
    if (p.deadline_2026 === "průběžně") return true;
    return false;
  });
}

export default function OperativaPage() {
  const top10 = getTopPrograms();
  const stats = getProgramStats();
  const deadlines = getUpcomingDeadlines(10);
  const thisWeek = getThisWeekItems(top10);

  // Odhadovaný potenciál = součet max_amount top programů s high relevancí
  const totalPotential = top10.reduce((s, p) => s + (p.max_amount ?? 0), 0);

  const now = new Date();
  const currentQ = Math.floor(now.getMonth() / 3); // 0-3

  const quickLinks = [
    {
      href: "/operativa/programy",
      label: "Programy",
      sublabel: `${stats.total} zdrojů financování`,
      badge: stats.high_relevance,
      badgeLabel: "high",
      icon: "◉",
    },
    {
      href: "/operativa/kontakty",
      label: "Kontakty",
      sublabel: "Automobilky, nadace, firmy",
      badge: null,
      badgeLabel: null,
      icon: "◎",
    },
    {
      href: "/operativa/zadani",
      label: "Zadání",
      sublabel: "Přepisy a poznámky Radima",
      badge: null,
      badgeLabel: null,
      icon: "◫",
    },
    {
      href: "/operativa/kalendar",
      label: "Kalendář",
      sublabel: "Deadliny 2026 v ročním přehledu",
      badge: deadlines.length,
      badgeLabel: "aktivních",
      icon: "◷",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* ── Hlavička ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
          <h1
            style={{
              fontSize: "1.625rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}
          >
            Operativní přehled
          </h1>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "var(--accent-soft)",
              padding: "0.15rem 0.5rem",
              borderRadius: "0.3rem",
            }}
          >
            SHIN-KYO Rychnov · 2026
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
          Plán mobility — financování vozidla a závodních výjezdů
        </p>
      </div>

      {/* ── KPI pás ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
        }}
        className="kpi-grid"
      >
        {/* Potenciál */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--accent)",
            borderRadius: "0.875rem",
            padding: "1.25rem 1.5rem",
          }}
        >
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Potenciál top programů
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1 }}>
            {fmtAmount(totalPotential)}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.35rem" }}>
            součet max. částek · {top10.length} programů
          </div>
        </div>

        {/* Aktivní programy */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--green)",
            borderRadius: "0.875rem",
            padding: "1.25rem 1.5rem",
          }}
        >
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Aktivní (vysoká relevance)
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--green)", lineHeight: 1 }}>
            {stats.high_relevance}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.35rem" }}>
            z celkem {stats.total} evidovaných zdrojů
          </div>
        </div>

        {/* Deadliny */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--red)",
            borderRadius: "0.875rem",
            padding: "1.25rem 1.5rem",
          }}
        >
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>
            Blížící se deadliny
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--red)", lineHeight: 1 }}>
            {deadlines.length}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "0.35rem" }}>
            {stats.with_vehicle} programů zahrnuje vozidlo
          </div>
        </div>
      </div>

      {/* ── TENTO TÝDEN ── */}
      {thisWeek.length > 0 && (
        <div
          style={{
            background: "color-mix(in srgb, var(--red) 5%, var(--surface))",
            border: "1px solid color-mix(in srgb, var(--red) 30%, var(--line))",
            borderRadius: "0.875rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 1.25rem",
              borderBottom: "1px solid color-mix(in srgb, var(--red) 20%, var(--line))",
              background: "color-mix(in srgb, var(--red) 8%, transparent)",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>⚠</span>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--red)" }}>
              Akce tento týden / nejbližší deadliny
            </span>
          </div>
          <div style={{ padding: "0.75rem 0" }}>
            {thisWeek.map((p) => {
              const days = deadlineDaysLeft(p.deadline_2026);
              const tier = urgencyTier(days);
              return (
                <Link
                  key={p.id}
                  href={`/operativa/programy?id=${p.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  className="action-row"
                >
                  {/* Urgency pill */}
                  <div
                    style={{
                      flexShrink: 0,
                      minWidth: "3rem",
                      textAlign: "center",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "0.2rem 0.5rem",
                      borderRadius: "0.375rem",
                      background:
                        tier === "critical" ? "var(--red-soft)"
                        : tier === "warning" ? "var(--gold-soft)"
                        : "var(--green-soft)",
                      color:
                        tier === "critical" ? "var(--red)"
                        : tier === "warning" ? "var(--gold)"
                        : "var(--green)",
                    }}
                  >
                    {days === null ? "průb." : `${days}d`}
                  </div>

                  {/* Category badge */}
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: categoryColor(p.category),
                      background: `color-mix(in srgb, ${categoryColor(p.category)} 12%, transparent)`,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "0.3rem",
                    }}
                  >
                    {categoryLabel(p.category)}
                  </span>

                  {/* Název */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.1rem" }}>
                      {p.funder}
                    </div>
                  </div>

                  {/* Částka */}
                  {p.max_amount && (
                    <div
                      style={{
                        flexShrink: 0,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                        textAlign: "right",
                      }}
                    >
                      {fmtAmount(p.max_amount)}
                    </div>
                  )}

                  <span style={{ color: "var(--muted)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Hlavní obsah: Top programy + Sidebar ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem" }} className="main-grid">

        {/* Levá část: Top programy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2
              style={{
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Top programy · aktivní & high relevance
            </h2>
            <Link
              href="/operativa/programy?relevance=high"
              style={{
                fontSize: "0.7rem",
                color: "var(--accent)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Všechny →
            </Link>
          </div>

          {top10.map((p) => {
            const days = deadlineDaysLeft(p.deadline_2026);
            const tier = urgencyTier(days);
            const isUrgent = tier === "critical" || tier === "warning";

            return (
              <Link
                key={p.id}
                href={`/operativa/programy?id=${p.id}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  padding: "0.875rem 1rem",
                  background: "var(--surface)",
                  border: isUrgent
                    ? `1px solid color-mix(in srgb, ${tier === "critical" ? "var(--red)" : "var(--gold)"} 40%, var(--line))`
                    : "1px solid var(--line)",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                className="program-card"
              >
                {/* Relevance + kategorie */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "center", paddingTop: "0.1rem" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--green)",
                      boxShadow: "0 0 6px var(--green)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Obsah */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: categoryColor(p.category),
                        background: `color-mix(in srgb, ${categoryColor(p.category)} 12%, transparent)`,
                        padding: "0.12rem 0.4rem",
                        borderRadius: "0.25rem",
                        flexShrink: 0,
                      }}
                    >
                      {categoryLabel(p.category)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                    {p.funder}
                  </div>
                </div>

                {/* Pravá část: částka + deadline */}
                <div style={{ flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
                  {p.max_amount && (
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {fmtAmount(p.max_amount)}
                    </span>
                  )}
                  {p.deadline_2026 && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: tier !== "none" ? 700 : 400,
                        color:
                          tier === "critical" ? "var(--red)"
                          : tier === "warning" ? "var(--gold)"
                          : "var(--muted)",
                        background:
                          tier === "critical" ? "var(--red-soft)"
                          : tier === "warning" ? "var(--gold-soft)"
                          : "transparent",
                        padding: tier !== "none" ? "0.1rem 0.35rem" : "0",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {days !== null
                        ? `za ${days} dní`
                        : p.deadline_2026 === "průběžně"
                        ? "průběžně"
                        : fmtDeadline(p.deadline_2026)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pravá část: sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Roční cyklus */}
          <div>
            <h2
              style={{
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}
            >
              Roční cyklus
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {ANNUAL_MOMENTS.map((m, idx) => {
                const isCurrentQ = idx === currentQ;
                return (
                  <div
                    key={m.season}
                    style={{
                      padding: "0.625rem 0.875rem",
                      background: isCurrentQ ? `color-mix(in srgb, ${m.color} 8%, var(--surface))` : "var(--surface)",
                      border: isCurrentQ ? `1px solid color-mix(in srgb, ${m.color} 40%, var(--line))` : "1px solid var(--line)",
                      borderLeft: isCurrentQ ? `3px solid ${m.color}` : `3px solid transparent`,
                      borderRadius: "0.625rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: isCurrentQ ? m.color : "var(--muted)",
                        marginBottom: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      {isCurrentQ && (
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: m.color,
                            display: "inline-block",
                            boxShadow: `0 0 5px ${m.color}`,
                          }}
                        />
                      )}
                      {m.season}
                    </div>
                    {m.actions.map((a) => (
                      <div
                        key={a}
                        style={{
                          fontSize: "0.72rem",
                          color: isCurrentQ ? "var(--foreground)" : "var(--muted)",
                          lineHeight: 1.4,
                        }}
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rychlý přístup */}
          <div>
            <h2
              style={{
                fontSize: "0.65rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}
            >
              Pohledy
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "0.625rem",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  className="quick-link"
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "var(--accent)",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    {link.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)" }}>
                      {link.label}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--muted)", marginTop: "0.1rem" }}>
                      {link.sublabel}
                    </div>
                  </div>
                  {link.badge !== null && (
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 800,
                        color: "var(--accent)",
                        background: "var(--accent-soft)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "0.875rem",
                        flexShrink: 0,
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .action-row:hover {
          background: var(--surface-hover);
        }
        .program-card:hover {
          border-color: var(--accent) !important;
          background: var(--surface-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .quick-link:hover {
          border-color: var(--accent) !important;
          background: var(--accent-glow) !important;
        }
      `}</style>
    </div>
  );
}
