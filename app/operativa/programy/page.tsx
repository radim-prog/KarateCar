import { getAllPrograms, getProgramById } from "../../lib/db";
import type { Program } from "../../lib/db";
import Link from "next/link";

function fmtAmount(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1).replace(".0", "")} M Kč`;
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(v);
}

function fmtDeadline(d: string | null): string {
  if (!d) return "—";
  if (["prošlo", "neotevřeno", "průběžně", "?"].includes(d)) return d;
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "short" });
}

function deadlineDaysLeft(d: string | null): number | null {
  if (!d || ["prošlo", "neotevřeno", "průběžně", "?"].includes(d)) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return Math.ceil((date.getTime() - Date.now()) / 86400000);
}

function urgencyTier(days: number | null): "critical" | "warning" | "ok" | "none" {
  if (days === null) return "none";
  if (days <= 14) return "critical";
  if (days <= 45) return "warning";
  return "ok";
}

function relevanceConfig(r: string | null): { color: string; label: string; bg: string } {
  if (r === "high") return { color: "var(--green)", bg: "var(--green-soft)", label: "Vysoká" };
  if (r === "medium") return { color: "var(--accent)", bg: "var(--accent-soft)", label: "Střední" };
  if (r === "low") return { color: "var(--muted)", bg: "var(--surface-raised)", label: "Nízká" };
  return { color: "var(--line-strong)", bg: "var(--surface-raised)", label: "Bez" };
}

function statusConfig(s: string | null): { label: string; color: string; bg: string } {
  if (s === "průběžný") return { label: "průběžný", color: "var(--green)", bg: "var(--green-soft)" };
  if (s === "aktuální") return { label: "aktuální", color: "var(--blue)", bg: "var(--blue-soft)" };
  if (s === "otevřený") return { label: "otevřený", color: "var(--blue)", bg: "var(--blue-soft)" };
  if (s === "neotevřený") return { label: "neotevřený", color: "var(--muted)", bg: "var(--surface-raised)" };
  if (s?.startsWith("prošlý")) return { label: "prošlý", color: "var(--red)", bg: "var(--red-soft)" };
  return { label: s ?? "—", color: "var(--muted)", bg: "var(--surface-raised)" };
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

function initials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

type Props = {
  searchParams: Promise<{
    category?: string;
    status?: string;
    relevance?: string;
    sort?: string;
    id?: string;
    view?: string;
  }>;
};

export default async function ProgramyPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { category, status, relevance, sort, id, view } = sp;
  const isCardView = view === "cards";

  const programs = getAllPrograms({ category, status, relevance, sort });

  let detail: Program | null = null;
  if (id) detail = getProgramById(Number(id));

  const categories = [
    "dotace", "grant", "sponzoring", "nadace",
    "leasing-dotovany", "crowdfunding", "komunita", "vlastni-zdroje",
  ];
  const statuses = ["průběžný", "aktuální", "otevřený", "neotevřený", "prošlý-2026"];
  const relevances = ["high", "medium", "low", "none"];

  function filterHref(overrides: Record<string, string | undefined>) {
    const next = { category, status, relevance, sort, view: view ?? undefined, ...overrides };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v) params.set(k, v);
    }
    return `/operativa/programy?${params.toString()}`;
  }

  const hasFilters = !!(category || status || relevance || sort);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Hlavička ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", lineHeight: 1.1 }}>
            Programy
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
            {programs.length} záznamů{hasFilters ? " · filtrováno" : ""}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* View toggle: karta / tabulka */}
          <div
            style={{
              display: "flex",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "0.5rem",
              padding: "0.2rem",
              gap: "0.2rem",
            }}
          >
            <Link
              href={filterHref({ view: undefined, id: undefined })}
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.3rem 0.7rem",
                borderRadius: "0.35rem",
                textDecoration: "none",
                background: !isCardView ? "var(--accent-soft)" : "transparent",
                color: !isCardView ? "var(--accent)" : "var(--muted)",
                transition: "all 0.15s",
              }}
            >
              ☰ Tabulka
            </Link>
            <Link
              href={filterHref({ view: "cards", id: undefined })}
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.3rem 0.7rem",
                borderRadius: "0.35rem",
                textDecoration: "none",
                background: isCardView ? "var(--accent-soft)" : "transparent",
                color: isCardView ? "var(--accent)" : "var(--muted)",
                transition: "all 0.15s",
              }}
            >
              ⊞ Karty
            </Link>
          </div>

          {hasFilters && (
            <Link
              href="/operativa/programy"
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "0.4rem 0.875rem",
                borderRadius: "0.5rem",
                background: "var(--surface-raised)",
                color: "var(--muted)",
                border: "1px solid var(--line)",
                textDecoration: "none",
              }}
            >
              × Zrušit filtry
            </Link>
          )}
        </div>
      </div>

      {/* ── Filtry jako pill chips ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {/* Kategorie */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", minWidth: "60px" }}>
            Typ
          </span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {categories.map((c) => {
              const active = category === c;
              const col = categoryColor(c);
              return (
                <Link
                  key={c}
                  href={filterHref({ category: active ? undefined : c, id: undefined })}
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: active ? 700 : 500,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    background: active ? `color-mix(in srgb, ${col} 15%, var(--surface))` : "var(--surface)",
                    color: active ? col : "var(--muted)",
                    border: active ? `1px solid color-mix(in srgb, ${col} 50%, transparent)` : "1px solid var(--line)",
                    transition: "all 0.15s",
                  }}
                >
                  {categoryLabel(c)}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", minWidth: "60px" }}>
            Stav
          </span>
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {statuses.map((s) => {
              const cfg = statusConfig(s);
              const active = status === s;
              return (
                <Link
                  key={s}
                  href={filterHref({ status: active ? undefined : s, id: undefined })}
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: active ? 700 : 500,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    background: active ? cfg.bg : "var(--surface)",
                    color: active ? cfg.color : "var(--muted)",
                    border: active ? `1px solid ${cfg.color}` : "1px solid var(--line)",
                    transition: "all 0.15s",
                  }}
                >
                  {cfg.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Relevance + Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", minWidth: "60px" }}>
              Relevance
            </span>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {relevances.map((r) => {
                const cfg = relevanceConfig(r);
                const active = relevance === r;
                return (
                  <Link
                    key={r}
                    href={filterHref({ relevance: active ? undefined : r, id: undefined })}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: active ? 700 : 500,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "9999px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: active ? cfg.bg : "var(--surface)",
                      color: active ? cfg.color : "var(--muted)",
                      border: active ? `1px solid ${cfg.color}` : "1px solid var(--line)",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
                    {cfg.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
              Řadit
            </span>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {[
                { val: undefined, label: "A–Z" },
                { val: "deadline", label: "Deadline" },
                { val: "amount", label: "Částka" },
              ].map((s) => {
                const active = (sort ?? undefined) === s.val;
                return (
                  <Link
                    key={s.label}
                    href={filterHref({ sort: s.val, id: undefined })}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: active ? 700 : 500,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "9999px",
                      textDecoration: "none",
                      background: active ? "var(--accent-soft)" : "var(--surface)",
                      color: active ? "var(--accent)" : "var(--muted)",
                      border: active ? "1px solid var(--accent)" : "1px solid var(--line)",
                      transition: "all 0.15s",
                    }}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail panel ── */}
      {detail && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line-strong)",
            borderTop: "3px solid var(--accent)",
            borderRadius: "0.875rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Záhlaví detailu */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: categoryColor(detail.category),
                    background: `color-mix(in srgb, ${categoryColor(detail.category)} 12%, transparent)`,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.3rem",
                  }}
                >
                  {categoryLabel(detail.category)}
                </span>
                {(() => {
                  const cfg = statusConfig(detail.status);
                  return (
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "0.3rem", background: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  );
                })()}
                {(() => {
                  const cfg = relevanceConfig(detail.relevance);
                  return (
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "0.3rem", background: cfg.bg, color: cfg.color }}>
                      {cfg.label} relevance
                    </span>
                  );
                })()}
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                {detail.name}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                {detail.funder}
              </p>
            </div>
            <Link
              href={filterHref({ id: undefined })}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "0.4rem 0.875rem",
                borderRadius: "0.5rem",
                background: "var(--surface-raised)",
                color: "var(--muted)",
                border: "1px solid var(--line)",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              × Zavřít
            </Link>
          </div>

          {/* Klíčová čísla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              { label: "Deadline 2026", value: fmtDeadline(detail.deadline_2026), highlight: !!detail.deadline_2026 },
              { label: "Min. částka", value: fmtAmount(detail.min_amount), highlight: false },
              { label: "Max. částka", value: fmtAmount(detail.max_amount), highlight: !!detail.max_amount },
              { label: "Kontakt email", value: detail.contact_email ?? "—", highlight: false },
              { label: "Kontakt tel.", value: detail.contact_phone ?? "—", highlight: false },
              { label: "Příští kolo", value: detail.next_round_expected ?? "—", highlight: false },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  background: "var(--surface-raised)",
                  borderRadius: "0.625rem",
                  padding: "0.75rem 0.875rem",
                }}
              >
                <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.3rem" }}>
                  {f.label}
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: f.highlight ? 700 : 500, color: f.highlight ? "var(--accent)" : "var(--foreground)" }}>
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          {/* Textové sekce */}
          {[
            { label: "Způsobilé náklady", value: detail.eligible_costs },
            { label: "Podmínky způsobilosti", value: detail.eligibility_conditions },
            { label: "Poznámky", value: detail.notes },
          ].filter((f) => f.value).map((f) => (
            <div key={f.label}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
                {f.label}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--foreground)", lineHeight: 1.6 }}>
                {f.value}
              </p>
            </div>
          ))}

          {/* CTA */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {detail.application_url && (
              <a
                href={detail.application_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.5rem",
                  background: "var(--accent)",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                Přihláška →
              </a>
            )}
            {detail.funder_url && (
              <a
                href={detail.funder_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  padding: "0.5rem 1.25rem",
                  borderRadius: "0.5rem",
                  background: "var(--surface-raised)",
                  color: "var(--muted)",
                  border: "1px solid var(--line)",
                  textDecoration: "none",
                }}
              >
                Web poskytovatele
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── KARTA VIEW ── */}
      {isCardView && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.875rem",
          }}
        >
          {programs.map((p) => {
            const days = deadlineDaysLeft(p.deadline_2026);
            const tier = urgencyTier(days);
            const statusCfg = statusConfig(p.status);
            const relCfg = relevanceConfig(p.relevance);
            const isSelected = id === String(p.id);
            return (
              <Link
                key={p.id}
                href={filterHref({ id: isSelected ? undefined : String(p.id) })}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  padding: "1rem 1.125rem",
                  background: isSelected ? "var(--accent-soft)" : "var(--surface)",
                  border: isSelected
                    ? "1px solid var(--accent)"
                    : tier === "critical"
                    ? "1px solid color-mix(in srgb, var(--red) 40%, var(--line))"
                    : tier === "warning"
                    ? "1px solid color-mix(in srgb, var(--gold) 35%, var(--line))"
                    : "1px solid var(--line)",
                  borderRadius: "0.875rem",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  cursor: "pointer",
                }}
                className="prog-card"
              >
                {/* Badges řádek */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: categoryColor(p.category),
                      background: `color-mix(in srgb, ${categoryColor(p.category)} 12%, transparent)`,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {categoryLabel(p.category)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "0.25rem",
                      background: statusCfg.bg,
                      color: statusCfg.color,
                    }}
                  >
                    {statusCfg.label}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: relCfg.color,
                      flexShrink: 0,
                    }}
                    title={`Relevance: ${relCfg.label}`}
                  />
                </div>

                {/* Název + poskytovatel */}
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      lineHeight: 1.3,
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                    {p.funder ?? "—"}
                  </div>
                </div>

                {/* Klíčová čísla */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <div>
                    {p.max_amount ? (
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em" }}>
                        {fmtAmount(p.max_amount)}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>částka neuvedena</span>
                    )}
                  </div>

                  {/* Deadline badge */}
                  {p.deadline_2026 && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.625rem",
                        borderRadius: "0.375rem",
                        background:
                          tier === "critical" ? "var(--red-soft)"
                          : tier === "warning" ? "var(--gold-soft)"
                          : tier === "ok" ? "var(--surface-raised)"
                          : "var(--surface-raised)",
                        color:
                          tier === "critical" ? "var(--red)"
                          : tier === "warning" ? "var(--gold)"
                          : "var(--muted)",
                      }}
                    >
                      {days !== null ? `za ${days}d` : p.deadline_2026 === "průběžně" ? "průběžně" : fmtDeadline(p.deadline_2026)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {programs.length === 0 && (
            <div style={{ gridColumn: "1 / -1", padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "var(--muted)" }}>
              Žádné výsledky pro zvolené filtry.
            </div>
          )}
        </div>
      )}

      {/* ── TABULKA VIEW ── */}
      {!isCardView && (
        <div style={{ borderRadius: "0.875rem", overflow: "hidden", border: "1px solid var(--line)" }}>
          {/* Záhlaví tabulky */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "24px 2fr 1.2fr 90px 90px 110px 90px",
              gap: "0",
              padding: "0.625rem 1rem",
              background: "var(--surface-raised)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {[
              { label: "", sortVal: undefined },
              { label: "Název", sortVal: undefined },
              { label: "Poskytovatel", sortVal: undefined },
              { label: "Typ", sortVal: undefined },
              { label: "Stav", sortVal: undefined },
              { label: "Max. částka", sortVal: "amount" },
              { label: "Deadline", sortVal: "deadline" },
            ].map((col, i) => (
              <div key={i}>
                {col.sortVal ? (
                  <Link
                    href={filterHref({ sort: col.sortVal === sort ? undefined : col.sortVal, id: undefined })}
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: sort === col.sortVal ? "var(--accent)" : "var(--muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    {col.label}
                    <span style={{ opacity: 0.5 }}>{sort === col.sortVal ? "↑" : "↕"}</span>
                  </Link>
                ) : (
                  <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                    {col.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Řádky */}
          {programs.map((p, i) => {
            const days = deadlineDaysLeft(p.deadline_2026);
            const tier = urgencyTier(days);
            const statusCfg = statusConfig(p.status);
            const relCfg = relevanceConfig(p.relevance);
            const isSelected = id === String(p.id);

            return (
              <Link
                key={p.id}
                href={filterHref({ id: isSelected ? undefined : String(p.id) })}
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 2fr 1.2fr 90px 90px 110px 90px",
                  padding: "0.625rem 1rem",
                  alignItems: "center",
                  borderBottom: i < programs.length - 1 ? "1px solid var(--line)" : undefined,
                  background: isSelected
                    ? "var(--accent-soft)"
                    : tier === "critical"
                    ? "color-mix(in srgb, var(--red) 4%, var(--surface))"
                    : "var(--surface)",
                  textDecoration: "none",
                  transition: "background 0.12s ease",
                }}
                className="table-row"
              >
                {/* Relevance dot */}
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: relCfg.color,
                    display: "inline-block",
                    flexShrink: 0,
                    boxShadow: p.relevance === "high" ? `0 0 5px ${relCfg.color}` : "none",
                  }}
                  title={`Relevance: ${relCfg.label}`}
                />

                {/* Název */}
                <span
                  style={{
                    fontSize: "0.83rem",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: "0.75rem",
                  }}
                  className="row-name"
                >
                  {p.name}
                </span>

                {/* Poskytovatel */}
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: "0.5rem",
                  }}
                >
                  {p.funder ?? "—"}
                </span>

                {/* Kategorie */}
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: categoryColor(p.category),
                  }}
                >
                  {categoryLabel(p.category)}
                </span>

                {/* Status badge */}
                <span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.4rem",
                      borderRadius: "0.25rem",
                      background: statusCfg.bg,
                      color: statusCfg.color,
                    }}
                  >
                    {statusCfg.label}
                  </span>
                </span>

                {/* Max. částka */}
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: p.max_amount ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  {fmtAmount(p.max_amount)}
                </span>

                {/* Deadline */}
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: tier !== "none" ? 700 : 400,
                    color:
                      tier === "critical" ? "var(--red)"
                      : tier === "warning" ? "var(--gold)"
                      : "var(--muted)",
                  }}
                >
                  {days !== null
                    ? `za ${days}d`
                    : p.deadline_2026 === "průběžně"
                    ? "průběžně"
                    : fmtDeadline(p.deadline_2026)}
                </span>
              </Link>
            );
          })}

          {programs.length === 0 && (
            <div style={{ padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "var(--muted)", background: "var(--surface)" }}>
              Žádné výsledky pro zvolené filtry.
            </div>
          )}
        </div>
      )}

      <style>{`
        .prog-card:hover {
          border-color: var(--accent) !important;
          background: var(--surface-hover) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .table-row:hover {
          background: var(--surface-hover) !important;
        }
        .table-row:hover .row-name {
          color: var(--accent);
        }
      `}</style>
    </div>
  );
}
