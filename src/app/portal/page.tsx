"use client";

import Link from "next/link";
import KpiChart from "../../components/KpiChart";
import { getMockKpis } from "../../lib/data/kpi";

export default function ClientPortalPage() {
  // Prototype: pretend this is the logged-in client’s view (read-only)
  const clientName = "RetailMax";

  return (
    <main style={{ padding: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Client Portal</h1>
          <p style={{ opacity: 0.75, marginTop: 6 }}>
            {clientName} • Read-only prototype view
          </p>
        </div>

        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/portal">Portal</Link>
          <Link href="/portal/projects">Projects</Link>
          <Link href="/portal/resources">Resources</Link>
          <Link href="/login">Logout</Link>
        </nav>
      </header>

      {/* Dashboard summary */}
      <section
        style={{
          marginTop: 16,
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <Card
          title="Account health"
          value="On Track"
          hint="Based on KPIs + activity (prototype)"
        />
        <Card title="Active projects" value="2" hint="Planning + In Progress" />
        <Card
          title="Open action items"
          value="3"
          hint="Assigned and in progress"
        />
        <Card
          title="Recent performance"
          value="+8%"
          hint="vs last period (prototype)"
        />
      </section>

      {/* Performance snapshot */}
      <section
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #333",
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Performance snapshot
        </h2>
        <p style={{ opacity: 0.75, marginTop: 6 }}>
          Prototype chart. This will later connect to real channel reporting
          (Google Ads, Meta, Email, SEO).
        </p>
        <div
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 10,
            background: "#111",
          }}
        >
          <KpiChart data={getMockKpis("c3")} />
        </div>
      </section>

      {/* Projects */}
      <section
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #333",
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Active projects
        </h2>

        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}
        >
          <thead>
            <tr>
              {["Project", "Status", "Owner", "Milestone", "Due"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderBottom: "1px solid #333",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: 10, fontWeight: 700 }}>Q1 Campaign Plan</td>
              <td style={{ padding: 10 }}>Planning</td>
              <td style={{ padding: 10 }}>Account Manager</td>
              <td style={{ padding: 10 }}>Draft outline</td>
              <td style={{ padding: 10 }}>2026-01-05</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: 10, fontWeight: 700 }}>
                Website Scan + CRO Notes
              </td>
              <td style={{ padding: 10 }}>In Progress</td>
              <td style={{ padding: 10 }}>SEO Lead</td>
              <td style={{ padding: 10 }}>Top issues list</td>
              <td style={{ padding: 10 }}>2026-01-08</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Action items */}
      <section
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #333",
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Open action items
        </h2>
        <ul style={{ marginTop: 10 }}>
          <li>Review campaign budget recommendations</li>
          <li>Approve keyword focus list</li>
          <li>Confirm next meeting availability</li>
        </ul>
      </section>

      {/* Communications */}
      <section
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #333",
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Recent communications
        </h2>
        <ul style={{ marginTop: 10 }}>
          <li>12/20 — Strategy meeting recap shared</li>
          <li>12/18 — Report request created</li>
          <li>12/15 — Action items updated</li>
        </ul>
      </section>

      {/* Resource library */}
      <section
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #333",
          borderRadius: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          Resource library
        </h2>
        <p style={{ opacity: 0.75, marginTop: 6 }}>
          Templates and playbooks available for download (prototype).
        </p>

        <ul style={{ marginTop: 10 }}>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Monthly Reporting Template (PDF)
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Campaign Planner Checklist
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Competitor SWOT Worksheet
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

function Card({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div style={{ padding: 16, border: "1px solid #333", borderRadius: 12 }}>
      <div style={{ opacity: 0.75, fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 900, marginTop: 6 }}>{value}</div>
      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>{hint}</div>
    </div>
  );
}
