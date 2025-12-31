"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import KpiChart from "../../components/KpiChart";
import { getMockKpis } from "../../lib/data/kpi";
import type { DataSource } from "../../lib/data/source";
import { isValidSource } from "../../lib/data/source";
import AppShell from "../../components/AppShell";

function Card({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div style={{
      background: "linear-gradient(180deg, var(--panel), var(--panel2))",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: 16,
      boxShadow: "var(--shadow)"
    }}>
      <div style={{ color: "var(--muted)", fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{value}</div>
      {hint ? <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>{hint}</div> : null}
    </div>
  );
}

export default function DashboardPage() {
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
    <AppShell>
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      {/* Top bar */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 14
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, var(--maroon), var(--gold))",
              boxShadow: "var(--shadow)"
            }} />
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Agency Platform</div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>Admin Dashboard</h1>
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/communications">Comms</Link>
          <Link href="/portal">Client Portal</Link>
        </nav>
      </header>

      {/* Source toggle */}
      <section style={{
        marginTop: 16,
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <div style={{ color: "var(--muted)" }}>Data source:</div>

        <button
          onClick={() => updateSource("mock")}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: source === "mock"
              ? "linear-gradient(135deg, var(--maroon), var(--maroon2))"
              : "transparent",
            color: source === "mock" ? "white" : "var(--text)",
            cursor: "pointer",
          }}
        >
          Mock (demo-ready)
        </button>

        <button
          onClick={() => updateSource("real")}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: source === "real"
              ? "linear-gradient(135deg, var(--gold), var(--tan))"
              : "transparent",
            color: source === "real" ? "#1b120b" : "var(--text)",
            cursor: "pointer",
          }}
        >
          Real (later)
        </button>

        {source === "real" && (
          <span style={{ color: "var(--muted)" }}>
            Real mode placeholder — next: Google Trends + ad APIs.
          </span>
        )}
      </section>

      {/* KPI cards */}
      <section style={{
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12
      }}>
        <Card title="Active Clients" value="3" hint="Prototype count" />
        <Card title="Active Projects" value="4" hint="Prototype count" />
        <Card title="Open Action Items" value="7" hint="From Tasks + Comms" />
        <Card title="Health" value="On Track" hint="Based on KPIs + activity" />
      </section>

      {/* Chart panel */}
      <section style={{
        marginTop: 16,
        background: "linear-gradient(180deg, rgba(107,15,26,.18), rgba(20,17,18,1))",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 16,
        boxShadow: "var(--shadow)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Performance metrics across channels</h2>
            <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 13 }}>
              Spend + Revenue trend (mock now, real later)
            </div>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>
            Updated: Dec 2025 (prototype)
          </div>
        </div>

        <div style={{ marginTop: 12, borderRadius: 12, background: "rgba(0,0,0,.25)", padding: 12 }}>
          {kpiData.length ? (
            <KpiChart data={kpiData} />
          ) : (
            <div style={{ padding: 24, color: "var(--muted)" }}>
              No real KPI data connected yet.
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/clients">View clients →</Link>
          <span style={{ color: "var(--muted)" }}>•</span>
          <Link href="/tasks">Review tasks →</Link>
          <span style={{ color: "var(--muted)" }}>•</span>
          <Link href="/communications">Log communications →</Link>
        </div>
      </section>
    </main>

    </AppShell>
  );
}
