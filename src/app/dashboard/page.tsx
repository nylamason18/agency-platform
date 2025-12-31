import Link from "next/link";
import KpiChart from "@/components/KpiChart";
import { getMockKpis } from "@/lib/data/kpi";

export default function DashboardPage() {
  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Admin Dashboard</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/portal">Client Portal</Link>
        </nav>
      </header>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #2b2b2b", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Overview (prototype)</h2>
        <p style={{ opacity: 0.8 }}>
          Next: real counts for active clients/projects + KPI rollups.
        </p>
      </section>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #2b2b2b", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>Performance metrics across channels</h2>
        <p style={{ opacity: 0.8 }}>
          Next: chart + filters (date range, channel, client).
        </p>
        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "#111" }}>
          <p style={{ margin: 0 }}><div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "#111" }}>
            <KpiChart data={getMockKpis("demo-client")} />
          </div>
</p>
        </div>
      </section>
    </main>
  );
}
