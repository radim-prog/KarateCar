import { getAllStatements } from "../../lib/db";
import type { Statement } from "../../lib/db";

function fmtDateHeading(ts: string | null): string {
  if (!ts) return "—";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return ts;
  return date.toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtTime(ts: string | null): string {
  if (!ts) return "";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" });
}

function isoDay(ts: string | null): string {
  if (!ts) return "";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function kindConfig(k: string | null): { label: string; color: string; bg: string; icon: string } {
  if (k === "voice") return { label: "hlas", color: "var(--purple)", bg: "var(--purple-soft)", icon: "🎙" };
  if (k === "text") return { label: "text", color: "var(--blue)", bg: "var(--blue-soft)", icon: "✍" };
  if (k === "photo") return { label: "foto", color: "var(--green)", bg: "var(--green-soft)", icon: "📷" };
  return { label: k ?? "—", color: "var(--muted)", bg: "var(--surface-raised)", icon: "○" };
}

function topicColor(topic: string | null): string {
  if (!topic) return "var(--muted)";
  const hash = Array.from(topic).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colors = [
    "var(--accent)", "var(--blue)", "var(--green)", "var(--purple)", "var(--gold)", "var(--red)",
  ];
  return colors[hash % colors.length];
}

function channelLabel(c: string | null): string {
  if (c === "telegram") return "Telegram";
  if (c === "email") return "Email";
  return c ?? "—";
}

// Seskupit statements podle dne
function groupByDay(statements: Statement[]): { day: string; dayLabel: string; items: Statement[] }[] {
  const map = new Map<string, Statement[]>();
  for (const s of statements) {
    const day = isoDay(s.ts_utc);
    if (!map.has(day)) map.set(day, []);
    map.get(day)!.push(s);
  }
  return Array.from(map.entries()).map(([day, items]) => ({
    day,
    dayLabel: fmtDateHeading(items[0].ts_utc),
    items,
  }));
}

// Zkrácený preview textu
function preview(text: string | null, maxLen = 220): { short: string; isTruncated: boolean } {
  if (!text) return { short: "", isTruncated: false };
  if (text.length <= maxLen) return { short: text, isTruncated: false };
  const cut = text.lastIndexOf(" ", maxLen);
  return { short: text.slice(0, cut > 0 ? cut : maxLen) + "…", isTruncated: true };
}

// Collect unique topics
function getTopics(statements: Statement[]): string[] {
  const topics = new Set<string>();
  for (const s of statements) {
    if (s.topic) topics.add(s.topic);
  }
  return Array.from(topics).sort();
}

type Props = {
  searchParams: Promise<{ topic?: string; expanded?: string }>;
};

export default async function ZadaniPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { topic, expanded } = sp;

  const allStatements = getAllStatements();
  const topics = getTopics(allStatements);

  const filtered = topic
    ? allStatements.filter((s) => s.topic === topic)
    : allStatements;

  const grouped = groupByDay(filtered);
  const expandedIds = new Set((expanded ?? "").split(",").filter(Boolean));

  function toggleExpand(id: number): string {
    const newSet = new Set(expandedIds);
    if (newSet.has(String(id))) newSet.delete(String(id));
    else newSet.add(String(id));
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (newSet.size > 0) params.set("expanded", Array.from(newSet).join(","));
    const qs = params.toString();
    return `/operativa/zadani${qs ? `?${qs}` : ""}`;
  }

  function topicHref(t: string | undefined): string {
    const params = new URLSearchParams();
    if (t) params.set("topic", t);
    if (expandedIds.size > 0) params.set("expanded", Array.from(expandedIds).join(","));
    const qs = params.toString();
    return `/operativa/zadani${qs ? `?${qs}` : ""}`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Hlavička ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", lineHeight: 1.1 }}>
            Zadání
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
            {filtered.length} záznamů · přepisy a poznámky · chronologicky sestupně
          </p>
        </div>
        {topic && (
          <a
            href={topicHref(undefined)}
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
            × Zrušit filtr
          </a>
        )}
      </div>

      {/* ── Topic filtry ── */}
      {topics.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
            Téma
          </span>
          {topics.map((t) => {
            const active = topic === t;
            const col = topicColor(t);
            return (
              <a
                key={t}
                href={topicHref(active ? undefined : t)}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: active ? 700 : 500,
                  padding: "0.3rem 0.875rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  background: active ? `color-mix(in srgb, ${col} 15%, var(--surface))` : "var(--surface)",
                  color: active ? col : "var(--muted)",
                  border: active ? `1px solid color-mix(in srgb, ${col} 50%, transparent)` : "1px solid var(--line)",
                  transition: "all 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: col,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {t}
              </a>
            );
          })}
        </div>
      )}

      {/* ── Timeline ── */}
      {grouped.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "var(--muted)" }}>
          Žádná zadání zatím nejsou.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {grouped.map(({ day, dayLabel, items }, groupIdx) => (
            <div key={day}>
              {/* Datum nadpis */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: groupIdx === 0 ? "0 0 1.25rem" : "2rem 0 1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "var(--accent-soft)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayLabel}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "var(--line)",
                  }}
                />
                <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
                  {items.length} {items.length === 1 ? "záznam" : items.length < 5 ? "záznamy" : "záznamů"}
                </span>
              </div>

              {/* Záznamy pro daný den */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                  paddingLeft: "1rem",
                  borderLeft: "2px solid var(--line)",
                  marginLeft: "0.5rem",
                }}
              >
                {items.map((s, itemIdx) => {
                  const kind = kindConfig(s.kind);
                  const col = topicColor(s.topic);
                  const isExpanded = expandedIds.has(String(s.id));
                  const { short, isTruncated } = preview(s.verbatim);
                  const isLast = itemIdx === items.length - 1;

                  return (
                    <div
                      key={s.id}
                      style={{
                        position: "relative",
                        marginBottom: isLast ? "0" : "0",
                      }}
                    >
                      {/* Timeline dot */}
                      <div
                        style={{
                          position: "absolute",
                          left: "-1.375rem",
                          top: "1rem",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: s.topic ? col : "var(--line-strong)",
                          border: "2px solid var(--background)",
                          zIndex: 1,
                        }}
                      />

                      {/* Karta záznamu */}
                      <div
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--line)",
                          borderRadius: "0.875rem",
                          padding: "1rem 1.125rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                        }}
                      >
                        {/* Meta řádek */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          {/* Čas */}
                          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                            {fmtTime(s.ts_utc)}
                          </span>

                          {/* Kind badge */}
                          <span
                            style={{
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              padding: "0.15rem 0.5rem",
                              borderRadius: "0.25rem",
                              background: kind.bg,
                              color: kind.color,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            <span style={{ fontSize: "0.75rem" }}>{kind.icon}</span>
                            {kind.label}
                          </span>

                          {/* Channel */}
                          <span style={{ fontSize: "0.65rem", color: "var(--muted)" }}>
                            {channelLabel(s.channel)}
                          </span>

                          {/* Topic badge */}
                          {s.topic && (
                            <>
                              <span style={{ color: "var(--line-strong)", fontSize: "0.65rem" }}>·</span>
                              <a
                                href={topicHref(topic === s.topic ? undefined : s.topic)}
                                style={{
                                  fontSize: "0.65rem",
                                  fontWeight: 700,
                                  color: col,
                                  background: `color-mix(in srgb, ${col} 12%, transparent)`,
                                  padding: "0.12rem 0.5rem",
                                  borderRadius: "0.25rem",
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.25rem",
                                }}
                              >
                                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: col, display: "inline-block" }} />
                                {s.topic}
                              </a>
                            </>
                          )}

                          {/* ID */}
                          <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                            #{s.id}
                          </span>
                        </div>

                        {/* Verbatim text */}
                        {s.verbatim && (
                          <div>
                            <div
                              style={{
                                fontSize: "0.875rem",
                                lineHeight: 1.65,
                                color: "var(--foreground)",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {isExpanded ? s.verbatim : short}
                            </div>
                            {isTruncated && (
                              <a
                                href={toggleExpand(s.id)}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.3rem",
                                  marginTop: "0.5rem",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  color: "var(--accent)",
                                  textDecoration: "none",
                                }}
                              >
                                {isExpanded ? "▲ Skrýt" : "▼ Zobrazit celý text"}
                              </a>
                            )}
                          </div>
                        )}

                        {/* Notes */}
                        {s.notes && (
                          <div
                            style={{
                              padding: "0.625rem 0.875rem",
                              background: "var(--surface-raised)",
                              borderRadius: "0.5rem",
                              borderLeft: "3px solid var(--line-strong)",
                            }}
                          >
                            <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.3rem" }}>
                              Poznámka
                            </div>
                            <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>
                              {s.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
