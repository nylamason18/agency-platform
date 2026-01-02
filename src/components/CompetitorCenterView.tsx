"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CLIENTS, COMPETITORS, type Competitor } from "../lib/data/competitors";

type Tab = "overview" | "scan" | "ads" | "swot" | "trends";

function Pill({ text }: { text: string }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "rgba(214,179,106,.08)",
        color: "var(--tan)",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}

export default function CompetitorCenterView() {
  const [clientId, setClientId] = useState<string>("c3");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("overview");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMPETITORS.filter((c) => {
      const matchesClient = clientId === "all" ? true : c.clientIds.includes(clientId) || (c.suggestedFor?.includes(clientId) ?? false);
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q);
      return matchesClient && matchesQuery;
    });
  }, [clientId, query]);

  const suggested = useMemo(() => {
    if (clientId === "all") return [];
    return COMPETITORS.filter((c) => (c.suggestedFor ?? []).includes(clientId));
  }, [clientId]);

  const [selectedId, setSelectedId] = useState<string>(() => {
    const first = filtered[0]?.id || COMPETITORS[0]?.id || "";
    return first;
  });

  const selected: Competitor | undefined = useMemo(() => {
    return COMPETITORS.find((c) => c.id === selectedId) ?? filtered[0];
  }, [selectedId, filtered]);

  // Keep selected in sync if filters change
  useMemo(() => {
    if (filtered.length && !filtered.some((c) => c.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const clientName = useMemo(() => {
    if (clientId === "all") return "All Clients";
    return CLIENTS.find((c) => c.id === clientId)?.name ?? "Client";
  }, [clientId]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 16 }}>
      {/* LEFT PANEL */}
      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          background: "linear-gradient(180deg, var(--panel), var(--panel2))",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Global Competitor Center</div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>Competitors</div>
            </div>
            <Pill text="Prototype" />
          </div>

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,.25)",
                color: "var(--text)",
                outline: "none",
              }}
            >
              <option value="all">All clients</option>
              {CLIENTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.industry}
                </option>
              ))}
            </select>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search competitor name or domain..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,.25)",
                color: "var(--text)",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Suggested competitors */}
        {clientId !== "all" && suggested.length > 0 && (
          <div style={{ padding: 14, borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Suggested for {clientName}</div>
            <div style={{ display: "grid", gap: 8 }}>
              {suggested.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    setTab("overview");
                  }}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: c.id === selectedId ? "rgba(107,15,26,.18)" : "transparent",
                    color: "var(--text)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontWeight: 800 }}>{c.name}</div>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>Suggested</span>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>{c.domain}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Competitor list */}
        <div style={{ padding: 14 }}>
          <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>Results: {filtered.length}</div>
          <div style={{ display: "grid", gap: 8, maxHeight: "55vh", overflow: "auto" }}>
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedId(c.id);
                  setTab("overview");
                }}
                style={{
                  textAlign: "left",
                  padding: 10,
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: c.id === selectedId ? "rgba(214,179,106,.10)" : "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 800 }}>{c.name}</div>
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{c.industry}</span>
                </div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>{c.domain}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section
        style={{
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          background: "linear-gradient(180deg, rgba(107,15,26,.12), rgba(20,17,18,1))",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
          minHeight: 520,
        }}
      >
        {!selected ? (
          <div style={{ padding: 16, color: "var(--muted)" }}>Select a competitor to view details.</div>
        ) : (
          <>
            {/* Header */}
            <div style={{ padding: 16, borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Competitor Profile</div>
                  <div style={{ fontSize: 22, fontWeight: 900, marginTop: 2 }}>{selected.name}</div>
                  <div style={{ color: "var(--muted)", marginTop: 4 }}>
                    {selected.domain} • {selected.industry} • Last scanned: {selected.lastScannedAt}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  {(selected.suggestedFor ?? []).includes(clientId) && <Pill text="Suggested" />}
                  <button
                    style={{
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "linear-gradient(135deg, var(--maroon), var(--maroon2))",
                      color: "white",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Prototype: Scan queued. (Later: run Apify/DataForSEO + store snapshot)")}
                  >
                    Scan Now
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {(["overview", "scan", "ads", "swot", "trends"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: "1px solid var(--border)",
                      background: tab === t ? "rgba(214,179,106,.12)" : "transparent",
                      color: "var(--text)",
                      cursor: "pointer",
                      fontWeight: tab === t ? 900 : 700,
                      textTransform: "capitalize",
                    }}
                  >
                    {t === "scan" ? "Website Scan" : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              {tab === "overview" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: 14,
                      background: "rgba(0,0,0,.18)",
                    }}
                  >
                    <div style={{ fontWeight: 900, marginBottom: 8 }}>Why this competitor is relevant</div>
                    {clientId !== "all" && selected.suggestionReasons?.[clientId]?.length ? (
                      <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)" }}>
                        {selected.suggestionReasons[clientId].map((r, i) => (
                          <li key={i} style={{ marginBottom: 6 }}>
                            {r}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ color: "var(--muted)" }}>Select a client filter to see “suggested competitor” reasoning.</div>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                      <div style={{ fontWeight: 900 }}>Positioning snapshot</div>
                      <div style={{ color: "var(--muted)", marginTop: 8 }}>
                        <div><b style={{ color: "var(--text)" }}>H1:</b> {selected.scan.h1}</div>
                        <div style={{ marginTop: 6 }}><b style={{ color: "var(--text)" }}>CTA:</b> {selected.scan.cta}</div>
                      </div>
                    </div>

                    <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                      <div style={{ fontWeight: 900 }}>Quick actions</div>
                      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                        <Link href="/campaign-planner">Create a campaign response →</Link>
                        <Link href="/communications">Log competitor note →</Link>
                        <span style={{ color: "var(--muted)", fontSize: 12 }}>
                          (Prototype links — next we’ll connect to client/project context)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "scan" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                    <div style={{ fontWeight: 900 }}>Website Scan (prototype)</div>
                    <div style={{ color: "var(--muted)", marginTop: 8 }}>
                      <div><b style={{ color: "var(--text)" }}>Title:</b> {selected.scan.homepageTitle}</div>
                      <div style={{ marginTop: 6 }}><b style={{ color: "var(--text)" }}>Meta:</b> {selected.scan.metaDescription}</div>
                      <div style={{ marginTop: 6 }}><b style={{ color: "var(--text)" }}>H1:</b> {selected.scan.h1}</div>
                      <div style={{ marginTop: 6 }}><b style={{ color: "var(--text)" }}>Primary CTA:</b> {selected.scan.cta}</div>
                    </div>
                  </div>

                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                    <div style={{ fontWeight: 900 }}>Notes</div>
                    <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", marginTop: 8 }}>
                      {selected.scan.notes.map((n, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {tab === "ads" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontWeight: 900 }}>Ad Activity (prototype)</div>
                  {selected.ads.length ? (
                    selected.ads.map((a, i) => (
                      <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <div style={{ fontWeight: 900, textTransform: "capitalize" }}>{a.platform} ad</div>
                          <div style={{ color: "var(--muted)", fontSize: 12 }}>Seen: {a.seenAt}</div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <div><b>Headline:</b> {a.headline}</div>
                          <div style={{ color: "var(--muted)", marginTop: 6 }}>{a.primaryText}</div>
                          <div style={{ marginTop: 8 }}><Pill text={a.offer} /></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: "var(--muted)" }}>No ads captured yet (prototype).</div>
                  )}
                </div>
              )}

              {tab === "swot" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontWeight: 900 }}>SWOT (prototype)</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {(
                      [
                        ["Strengths", selected.swot.strengths],
                        ["Weaknesses", selected.swot.weaknesses],
                        ["Opportunities", selected.swot.opportunities],
                        ["Threats", selected.swot.threats],
                      ] as const
                    ).map(([label, items]) => (
                      <div key={label} style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                        <div style={{ fontWeight: 900 }}>{label}</div>
                        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", marginTop: 8 }}>
                          {items.map((it, i) => (
                            <li key={i} style={{ marginBottom: 6 }}>{it}</li>
                          ))}
                        </ul>
                        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 8 }}>
                          (Editable later — will save to DB per client)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "trends" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontWeight: 900 }}>Market Trends (prototype)</div>
                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)" }}>
                    <div style={{ color: "var(--muted)" }}>
                      Keywords tracked:
                      <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {selected.trends.keywords.map((k) => (
                          <Pill key={k} text={k} />
                        ))}
                      </div>
                      <div style={{ marginTop: 10 }}>{selected.trends.note}</div>
                    </div>
                  </div>

                  <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 14, background: "rgba(0,0,0,.18)", color: "var(--muted)" }}>
                    Chart placeholder: later plug in Google Trends time series and related queries.
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
