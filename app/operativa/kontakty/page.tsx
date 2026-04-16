import { getAllContacts, getContactById } from "../../lib/db";
import type { Contact } from "../../lib/db";
import Link from "next/link";

function entityTypeLabel(t: string | null): string {
  const map: Record<string, string> = {
    automotive: "Automobilka",
    nadace: "Nadace",
    oddíl: "Oddíl",
    instituce: "Instituce",
    firma: "Firma",
    dealer: "Dealer",
  };
  return map[t ?? ""] ?? (t ?? "—");
}

function entityTypeColor(t: string | null): string {
  const map: Record<string, string> = {
    automotive: "var(--accent)",
    nadace: "var(--green)",
    oddíl: "var(--blue)",
    instituce: "var(--purple)",
    firma: "var(--gold)",
    dealer: "var(--muted)",
  };
  return map[t ?? ""] ?? "var(--muted)";
}

function entityTypeBg(t: string | null): string {
  const map: Record<string, string> = {
    automotive: "var(--accent-soft)",
    nadace: "var(--green-soft)",
    oddíl: "var(--blue-soft)",
    instituce: "var(--purple-soft)",
    firma: "var(--gold-soft)",
    dealer: "var(--surface-raised)",
  };
  return map[t ?? ""] ?? "var(--surface-raised)";
}

function initials(entity: string | null, person: string | null): string {
  const name = entity ?? person ?? "?";
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type Props = {
  searchParams: Promise<{
    search?: string;
    entity_type?: string;
    id?: string;
  }>;
};

export default async function KontaktyPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { search, entity_type, id } = sp;

  const contacts = getAllContacts({ search, entity_type });

  let detail: Contact | null = null;
  if (id) detail = getContactById(Number(id));

  const entityTypes = ["automotive", "nadace", "oddíl", "instituce", "firma", "dealer"];

  function filterHref(overrides: Record<string, string | undefined>) {
    const next = { search, entity_type, id, ...overrides };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (v) params.set(k, v);
    }
    return `/operativa/kontakty?${params.toString()}`;
  }

  // Seskupení podle entity_type pro grouped list
  const grouped: Record<string, Contact[]> = {};
  const typeOrder = entity_type ? [entity_type] : entityTypes;

  for (const c of contacts) {
    const key = c.entity_type ?? "ostatní";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(c);
  }

  const hasFilters = !!(search || entity_type);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Hlavička ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)", lineHeight: 1.1 }}>
            Kontakty
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.2rem" }}>
            {contacts.length} kontaktů{hasFilters ? " · filtrováno" : ""}
          </p>
        </div>
        {hasFilters && (
          <Link
            href="/operativa/kontakty"
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

      {/* ── Vyhledávání + entity type filtry ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <form method="GET" action="/operativa/kontakty" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {entity_type && <input type="hidden" name="entity_type" value={entity_type} />}
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            >
              ⌕
            </span>
            <input
              type="text"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Hledat jméno, organizaci, email…"
              style={{
                width: "100%",
                fontSize: "0.875rem",
                padding: "0.625rem 0.875rem 0.625rem 2.25rem",
                borderRadius: "0.625rem",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--foreground)",
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              padding: "0.625rem 1.125rem",
              borderRadius: "0.625rem",
              background: "var(--accent)",
              color: "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hledat
          </button>
        </form>

        {/* Typ entity — pill chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
            Filtr
          </span>
          {entityTypes.map((t) => {
            const active = entity_type === t;
            const col = entityTypeColor(t);
            return (
              <Link
                key={t}
                href={filterHref({ entity_type: active ? undefined : t, id: undefined })}
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
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                {active && (
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: col, display: "inline-block" }} />
                )}
                {entityTypeLabel(t)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {detail && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line-strong)",
            borderTop: `3px solid ${entityTypeColor(detail.entity_type)}`,
            borderRadius: "0.875rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Avatar */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "0.75rem",
                  background: `color-mix(in srgb, ${entityTypeColor(detail.entity_type)} 18%, var(--surface-raised))`,
                  border: `2px solid color-mix(in srgb, ${entityTypeColor(detail.entity_type)} 40%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: entityTypeColor(detail.entity_type),
                  flexShrink: 0,
                }}
              >
                {initials(detail.entity_name, detail.person_name)}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: entityTypeColor(detail.entity_type),
                      background: entityTypeBg(detail.entity_type),
                      padding: "0.2rem 0.5rem",
                      borderRadius: "0.3rem",
                    }}
                  >
                    {entityTypeLabel(detail.entity_type)}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                  {detail.entity_name ?? detail.person_name ?? "—"}
                </h2>
                {detail.person_name && detail.entity_name && (
                  <p style={{ fontSize: "0.83rem", color: "var(--muted)", marginTop: "0.15rem" }}>
                    {detail.person_name}{detail.role ? ` · ${detail.role}` : ""}
                  </p>
                )}
              </div>
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

          {/* Kontaktní info — kopírovatelné */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Email", value: detail.email, icon: "✉", href: detail.email ? `mailto:${detail.email}` : undefined },
              { label: "Telefon", value: detail.phone, icon: "✆", href: detail.phone ? `tel:${detail.phone}` : undefined },
              { label: "Adresa", value: detail.address, icon: "⌖", href: undefined },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  background: "var(--surface-raised)",
                  borderRadius: "0.625rem",
                  padding: "0.75rem 0.875rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{f.icon}</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)" }}>
                    {f.label}
                  </span>
                </div>
                {f.value ? (
                  f.href ? (
                    <a
                      href={f.href}
                      style={{
                        fontSize: "0.83rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                        textDecoration: "none",
                        wordBreak: "break-all",
                      }}
                    >
                      {f.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.83rem", color: "var(--foreground)", wordBreak: "break-word" }}>
                      {f.value}
                    </span>
                  )
                ) : (
                  <span style={{ fontSize: "0.83rem", color: "var(--muted)" }}>—</span>
                )}
              </div>
            ))}
          </div>

          {detail.notes && (
            <div>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>
                Poznámky
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--foreground)", lineHeight: 1.6 }}>
                {detail.notes}
              </p>
            </div>
          )}

          {detail.source_url && (
            <a
              href={detail.source_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                padding: "0.45rem 1rem",
                borderRadius: "0.5rem",
                background: "var(--surface-raised)",
                color: "var(--muted)",
                border: "1px solid var(--line)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>↗</span> Zdroj
            </a>
          )}
        </div>
      )}

      {/* ── Grouped list ── */}
      {!entity_type && !search ? (
        // Seskupený pohled podle typu
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {typeOrder
            .filter((t) => grouped[t]?.length > 0)
            .map((t) => {
              const col = entityTypeColor(t);
              const bg = entityTypeBg(t);
              const group = grouped[t];
              return (
                <div key={t}>
                  {/* Skupinový nadpis */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "18px",
                        borderRadius: "2px",
                        background: col,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: col,
                      }}
                    >
                      {entityTypeLabel(t)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: col,
                        background: bg,
                        padding: "0.1rem 0.45rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {group.length}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "0.625rem",
                    }}
                  >
                    {group.map((c) => {
                      const isSelected = id === String(c.id);
                      return (
                        <Link
                          key={c.id}
                          href={filterHref({ id: isSelected ? undefined : String(c.id) })}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.875rem 1rem",
                            background: isSelected ? bg : "var(--surface)",
                            border: isSelected
                              ? `1px solid color-mix(in srgb, ${col} 50%, transparent)`
                              : "1px solid var(--line)",
                            borderRadius: "0.75rem",
                            textDecoration: "none",
                            transition: "all 0.15s ease",
                          }}
                          className="contact-card"
                        >
                          {/* Avatar */}
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "0.625rem",
                              background: `color-mix(in srgb, ${col} 15%, var(--surface-raised))`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.78rem",
                              fontWeight: 800,
                              color: col,
                              flexShrink: 0,
                            }}
                          >
                            {initials(c.entity_name, c.person_name)}
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                color: "var(--foreground)",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.entity_name ?? c.person_name ?? "—"}
                            </div>
                            {c.person_name && c.entity_name && (
                              <div
                                style={{
                                  fontSize: "0.7rem",
                                  color: "var(--muted)",
                                  marginTop: "0.1rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {c.person_name}{c.role ? ` · ${c.role}` : ""}
                              </div>
                            )}
                            {c.email && (
                              <div
                                style={{
                                  fontSize: "0.68rem",
                                  color: "var(--accent)",
                                  marginTop: "0.15rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {c.email}
                              </div>
                            )}
                          </div>

                          {/* Šipka */}
                          <span style={{ color: "var(--muted)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {/* Ostatní typy bez pořadí */}
          {Object.entries(grouped)
            .filter(([key]) => !typeOrder.includes(key) && grouped[key]?.length > 0)
            .map(([key, group]) => {
              const col = entityTypeColor(key);
              const bg = entityTypeBg(key);
              return (
                <div key={key}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
                    <div style={{ width: "4px", height: "18px", borderRadius: "2px", background: col }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: col }}>
                      {entityTypeLabel(key)}
                    </span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: col, background: bg, padding: "0.1rem 0.45rem", borderRadius: "9999px" }}>
                      {group.length}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.625rem" }}>
                    {group.map((c) => {
                      const isSelected = id === String(c.id);
                      return (
                        <Link
                          key={c.id}
                          href={filterHref({ id: isSelected ? undefined : String(c.id) })}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.875rem 1rem",
                            background: isSelected ? bg : "var(--surface)",
                            border: isSelected ? `1px solid color-mix(in srgb, ${col} 50%, transparent)` : "1px solid var(--line)",
                            borderRadius: "0.75rem",
                            textDecoration: "none",
                            transition: "all 0.15s ease",
                          }}
                          className="contact-card"
                        >
                          <div style={{ width: "40px", height: "40px", borderRadius: "0.625rem", background: `color-mix(in srgb, ${col} 15%, var(--surface-raised))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 800, color: col, flexShrink: 0 }}>
                            {initials(c.entity_name, c.person_name)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {c.entity_name ?? c.person_name ?? "—"}
                            </div>
                            {c.email && (
                              <div style={{ fontSize: "0.68rem", color: "var(--accent)", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {c.email}
                              </div>
                            )}
                          </div>
                          <span style={{ color: "var(--muted)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        // Filtrovaný / vyhledaný pohled — flat list
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {contacts.map((c) => {
            const col = entityTypeColor(c.entity_type);
            const bg = entityTypeBg(c.entity_type);
            const isSelected = id === String(c.id);
            return (
              <Link
                key={c.id}
                href={filterHref({ id: isSelected ? undefined : String(c.id) })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "0.875rem 1rem",
                  background: isSelected ? bg : "var(--surface)",
                  border: isSelected ? `1px solid color-mix(in srgb, ${col} 50%, transparent)` : "1px solid var(--line)",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
                className="contact-card"
              >
                <div style={{ width: "42px", height: "42px", borderRadius: "0.625rem", background: `color-mix(in srgb, ${col} 15%, var(--surface-raised))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: col, flexShrink: 0 }}>
                  {initials(c.entity_name, c.person_name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.entity_name ?? c.person_name ?? "—"}
                    </span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: col, background: bg, padding: "0.1rem 0.4rem", borderRadius: "0.25rem", flexShrink: 0 }}>
                      {entityTypeLabel(c.entity_type)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.2rem", flexWrap: "wrap" }}>
                    {c.person_name && c.entity_name && (
                      <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{c.person_name}{c.role ? ` · ${c.role}` : ""}</span>
                    )}
                    {c.email && (
                      <span style={{ fontSize: "0.72rem", color: "var(--accent)" }}>{c.email}</span>
                    )}
                    {c.phone && (
                      <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{c.phone}</span>
                    )}
                  </div>
                </div>
                <span style={{ color: "var(--muted)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>
              </Link>
            );
          })}

          {contacts.length === 0 && (
            <div style={{ padding: "3rem", textAlign: "center", fontSize: "0.9rem", color: "var(--muted)" }}>
              Žádné výsledky.
            </div>
          )}
        </div>
      )}

      <style>{`
        .contact-card:hover {
          border-color: var(--accent) !important;
          background: var(--surface-hover) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
