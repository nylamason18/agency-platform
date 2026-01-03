"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

type ClientRow = {
  id: string;
  name: string;
  industry: string;
  status: "Active" | "Onboarding" | "Prospect";
  monthlyFee: number;
  nps: number;
  accountManager: string;
  primaryContact: string;
  joinedDate: string; // YYYY-MM-DD
  domain: string;
};

const MOCK_CLIENTS: ClientRow[] = [
  {
    id: "c1",
    name: "TechCorp",
    industry: "SaaS",
    status: "Active",
    monthlyFee: 5500,
    nps: 42,
    accountManager: "Nyla Mason",
    primaryContact: "alex@techcorp.com",
    joinedDate: "2025-10-02",
    domain: "techcorp.com",
  },
  {
    id: "c2",
    name: "GreenLeaf Industries",
    industry: "Manufacturing",
    status: "Onboarding",
    monthlyFee: 3200,
    nps: 31,
    accountManager: "Jordan Lee",
    primaryContact: "sam@greenleaf.com",
    joinedDate: "2025-11-10",
    domain: "greenleaf.com",
  },
  {
    id: "c3",
    name: "RetailMax",
    industry: "Retail",
    status: "Prospect",
    monthlyFee: 8000,
    nps: 55,
    accountManager: "A. Patel",
    primaryContact: "mia@retailmax.com",
    joinedDate: "2025-12-01",
    domain: "retailmax.com",
  },
];

export default function ClientsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | ClientRow["status"]>("All");
  const [sort, setSort] = useState<"joined" | "nps" | "fee">("joined");

  const rows = useMemo(() => {
    let data = [...MOCK_CLIENTS];

    if (q.trim()) {
      const s = q.toLowerCase();
      data = data.filter((c) => c.name.toLowerCase().includes(s) || c.domain.toLowerCase().includes(s));
    }

    if (status !== "All") data = data.filter((c) => c.status === status);

    if (sort === "joined") data.sort((a, b) => b.joinedDate.localeCompare(a.joinedDate));
    if (sort === "nps") data.sort((a, b) => b.nps - a.nps);
    if (sort === "fee") data.sort((a, b) => b.monthlyFee - a.monthlyFee);

    return data;
  }, [q, status, sort]);

  return (
    <AppShell>
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Clients</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by client name or domain"
          style={{ padding: 10, minWidth: 260 }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={{ padding: 10 }}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Onboarding">Onboarding</option>
          <option value="Prospect">Prospect</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value as any)} style={{ padding: 10 }}>
          <option value="joined">Sort: Joined Date</option>
          <option value="nps">Sort: NPS</option>
          <option value="fee">Sort: Monthly Fee</option>
        </select>
      </section>

      <section style={{ marginTop: 16, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Industry", "Status", "Monthly Fee", "NPS Score", "Account Manager", "Primary Contact", "Joined Date"].map(
                (h) => (
                  <th key={h} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: 10 }}>
                  <Link href={`/clients/${c.id}`} style={{ fontWeight: 700 }}>
                    {c.name}
                  </Link>
                  <div style={{ opacity: 0.7, fontSize: 12 }}>{c.domain}</div>
                </td>
                <td style={{ padding: 10 }}>{c.industry}</td>
                <td style={{ padding: 10 }}>{c.status}</td>
                <td style={{ padding: 10 }}>${c.monthlyFee.toLocaleString()}</td>
                <td style={{ padding: 10 }}>{c.nps}</td>
                <td style={{ padding: 10 }}>{c.accountManager}</td>
                <td style={{ padding: 10 }}>{c.primaryContact}</td>
                <td style={{ padding: 10 }}>{c.joinedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
    </AppShell>
  );
}
