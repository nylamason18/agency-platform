"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import KpiChart from "@/components/KpiChart";
import { getMockKpis } from "@/lib/data/kpi";
import type { DataSource } from "../lib/data/source";
import { isValidSource } from "../lib/data/source";

type Tab = "overview" | "contacts" | "budgets" | "competitors" | "activity";

const MOCK_CLIENTS: Record<
  string,
  {
    id: string;
    name: string;
    industry: string;
    status: "Active" | "Onboarding" | "Prospect";
    monthlyFee: number;
    nps: number;
    contractEnd: string;
  }
> = {
  c1: { id: "c1", name: "TechCorp", industry: "SaaS", status: "Active", monthlyFee: 5500, nps: 42, contractEnd: "2026-10-01" },
  c2: { id: "c2", name: "GreenLeaf Industries", industry: "Manufacturing", status: "Onboarding", monthlyFee: 3200, nps: 31, contractEnd: "2026-06-15" },
  c3: { id: "c3", name: "RetailMax", industry: "Retail", status: "Prospect", monthlyFee: 8000, nps: 55, contractEnd: "2026-03-01" },
};

const MOCK_COMPETITORS: Record<string, { name: string; domain: string; note: string }[]> = {
  c1: [
    { name: "CompetitorOne", domain: "compone.com", note: "Higher spend on paid search (mock)" },
    { name: "CompetitorTwo", domain: "comptwo.com", note: "New landing page rollout (mock)" },
  ],
  c2: [{ name: "FactoryWorks", domain: "factoryworks.com", note: "Ranking for key terms rising (mock)" }],
  c3: [{ name: "MegaRetail", domain: "megaretail.com", note: "Seasonal promo push (mock)" }],
};

export default function ClientDetailView({ clientId }: { clientId: string }) {
  const id = decodeURIComponent(clientId).trim();
  const client = MOCK_CLIENTS[id];
  const initialSource: DataSource = useMemo(() => {
    const sp = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const s = sp.get("source");
    return isValidSource(s) ? s : "mock";
  }, []);

  const [source, setSource] = useState<DataSource>(initialSource);

  function updateSource(next: DataSource) {
    setSource(next);
    const url = new URL(window.location.href);
    url.searchParams.set("source", next);
    window.history.replaceState({}, "", url.toString());
  }

  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { key: Tab; label: string }[] = useMemo(
    () => [
      { key: "overview", label: "Overview" },
      { key: "contacts", label: "Contacts" },
      { key: "budgets", label: "Budgets" },
      { key: "competitors", label: "Competitors" },
      { key: "activity", label: "Activity/Messages" },
    ],
    []
  );

  if (!client) {
    return (
      <main style={{ padding: 24 }}>
        <p>Client not found: "{id}"</p>
        <Link href="/clients">Back to Clients</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <h1 style={{ fontSize: 26, fontWeight: 800 }}>{client.name}</h1>
            <span style={{ padding: "4px 10px", border: "1px solid #333", borderRadius: 999, fontSize: 12 }}>
              {client.status}
            </span>
            <span style={{ padding: "4px 10px", border: "1px solid #333", borderRadius: 999, fontSize: 12 }}>
              {client.industry}
            </span>
          </div>
          <div style={{ opacity: 0.75, marginTop: 6 }}>
            NPS: <b>{client.nps}</b> • Monthly Fee: <b>${client.monthlyFee.toLocaleString()}</b> • Contract End:{" "}
            <b>{client.contractEnd}</b>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #333",
              background: tab === t.key ? "#222" : "transparent",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </section>

      <section style={{ marginTop: 16 }}>
        <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ opacity: 0.75 }}>Data source:</div>

          <button
            onClick={() => updateSource("mock")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #333",
              background: source === "mock" ? "#222" : "transparent",
              cursor: "pointer",
            }}
          >
            Mock
          </button>

          <button
            onClick={() => updateSource("real")}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #333",
              background: source === "real" ? "#222" : "transparent",
              cursor: "pointer",
            }}
          >
            Real (later)
          </button>

          {source === "real" && (
            <span style={{ opacity: 0.75 }}>Real mode placeholder — next we wire Google Trends + ad APIs.</span>
          )}
        </div>

        {tab === "overview" && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Performance snapshot</h2>
              <p style={{ opacity: 0.75, marginTop: 6 }}>Prototype chart (mocked KPIs).</p>
              <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: "#111" }}>
              {source === "mock" ? (
                <KpiChart data={getMockKpis(client.id)} />
              ) : (
                <div style={{ padding: 24, opacity: 0.8 }}>
                  No real KPI data connected yet for this client.
                </div>
              )}
              </div>
            </div>

            <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Market trends (placeholder)</h2>
              <p style={{ opacity: 0.75, marginTop: 6 }}>Next: Google Trends integration (real).</p>
              <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: "#111" }}>
                <p style={{ margin: 0 }}>Google Trends chart goes here</p>
              </div>
            </div>
          </div>
        )}

        {tab === "contacts" && <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>Contacts (prototype)</div>}
        {tab === "budgets" && <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>Budgets (prototype)</div>}

        {tab === "competitors" && (
          <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Competitors</h2>
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              {(MOCK_COMPETITORS[client.id] ?? []).map((c) => (
                <div key={c.domain} style={{ padding: 12, border: "1px solid #222", borderRadius: 12 }}>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ opacity: 0.75, fontSize: 13 }}>{c.domain}</div>
                  <div style={{ marginTop: 6 }}>{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>
            Activity / Messages (prototype)
          </div>
        )}
      </section>
    </main>
  );
}
