"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppShell from "../../components/AppShell";

type Channel = "Email" | "Call" | "Meeting" | "Slack/Chat";

type Comm = {
  id: string;
  client: string;
  channel: Channel;
  summary: string;
  actionItems: string[];
  createdAt: string; // YYYY-MM-DD
};

const INITIAL: Comm[] = [
  {
    id: "m1",
    client: "TechCorp",
    channel: "Meeting",
    summary: "Reviewed performance, agreed to shift budget toward top keywords.",
    actionItems: ["Update budget allocation", "Send follow-up report by Friday"],
    createdAt: "2025-12-20",
  },
  {
    id: "m2",
    client: "RetailMax",
    channel: "Email",
    summary: "Client requested competitor comparison for Q1 planning.",
    actionItems: ["Add 3 competitors", "Draft SWOT bullets"],
    createdAt: "2025-12-18",
  },
];

export default function CommunicationsPage() {
  const [items, setItems] = useState<Comm[]>(INITIAL);

  const [client, setClient] = useState("TechCorp");
  const [channel, setChannel] = useState<Channel>("Meeting");
  const [summary, setSummary] = useState("");
  const [actionItemText, setActionItemText] = useState("");

  const clients = useMemo(() => ["TechCorp", "GreenLeaf Industries", "RetailMax"], []);
  const history = useMemo(() => [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [items]);

  function addComm() {
    if (!summary.trim()) return;

    const actionItems = actionItemText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        client,
        channel,
        summary: summary.trim(),
        actionItems,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);

    setSummary("");
    setActionItemText("");
  }

  return (
    <AppShell>
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Communications Log</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/communications">Communications</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Log a communication (prototype)</h2>

        <div style={{ display: "grid", gap: 10, marginTop: 12, maxWidth: 720 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select value={client} onChange={(e) => setClient(e.target.value)} style={{ padding: 10 }}>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select value={channel} onChange={(e) => setChannel(e.target.value as Channel)} style={{ padding: 10 }}>
              {(["Email", "Call", "Meeting", "Slack/Chat"] as Channel[]).map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary / key decisions..."
            rows={4}
            style={{ padding: 10 }}
          />

          <textarea
            value={actionItemText}
            onChange={(e) => setActionItemText(e.target.value)}
            placeholder={"Action items (one per line)\n- Example: Send report Friday\n- Example: Update budget"}
            rows={4}
            style={{ padding: 10 }}
          />

          <button onClick={addComm} style={{ padding: 10, width: 180 }}>
            Add entry
          </button>
        </div>
      </section>

      <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Recent communications</h2>

        <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
          {history.map((c) => (
            <div key={c.id} style={{ padding: 12, border: "1px solid #222", borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 800 }}>
                  {c.client} • {c.channel}
                </div>
                <div style={{ opacity: 0.75 }}>{c.createdAt}</div>
              </div>

              <p style={{ marginTop: 8 }}>{c.summary}</p>

              {c.actionItems.length ? (
                <>
                  <div style={{ fontWeight: 700, marginTop: 8 }}>Action items</div>
                  <ul style={{ marginTop: 6 }}>
                    {c.actionItems.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p style={{ opacity: 0.7, marginTop: 8 }}>No action items.</p>
              )}
            </div>
          ))}
        </div>

        <p style={{ opacity: 0.75, marginTop: 12 }}>
          Prototype: entries are in-memory. Next: save to DB and link action items to Tasks.
        </p>
      </section>
    </main>
    </AppShell>
  );
}
