"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import KpiChart from "../../components/KpiChart";
import { getMockKpis } from "../../lib/data/kpi";
import type { DataSource } from "../../lib/data/source";
import { isValidSource } from "../../lib/data/source";

export default function DashboardPage() {
  // Persist choice in URL so refresh keeps it: /dashboard?source=mock or real
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

  const kpiData = source === "mock" ? getMockKpis("demo-client") : [];

  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Admin Dashboard</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/communications">Communications</Link>
          <Link href="/portal">Client Portal</Link>
        </nav>
      </header>

      {/* Data source toggle */}
      <section style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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
          <span style={{ opacity: 0.75 }}>
            Real mode is a placeholder right now — next we’ll wire Google Trends + ad platform APIs.
          </span>
        )}
      </section>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #2b2b2b", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Overview (prototype)</h2>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Next: real counts for active clients/projects + KPI rollups.
        </p>
      </section>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #2b2b2b", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Performance metrics across channels</h2>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          {source === "mock"
            ? "Showing mocked KPI data (ready for demo)."
            : "Real data placeholder (empty until API integration)."}
        </p>

        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "#111" }}>
          {kpiData.length ? (
            <KpiChart data={kpiData} />
          ) : (
            <div style={{ padding: 24, opacity: 0.8 }}>
              No real KPI data connected yet.
              <div style={{ marginTop: 8, opacity: 0.7 }}>
                Next step: add a server API route that fetches Google Trends + channel metrics and returns this same shape.
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
