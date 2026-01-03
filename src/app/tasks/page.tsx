"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";


type Status = "To Do" | "In Progress" | "Done";
type Priority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  client: string;
  project: string;
  assignedTo: string;
  status: Status;
  priority: Priority;
  dueDate: string; // YYYY-MM-DD
  estHours: number;
};

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Draft monthly performance report", client: "TechCorp", project: "Reporting", assignedTo: "Nyla Mason", status: "To Do", priority: "High", dueDate: "2026-01-03", estHours: 3 },
  { id: "t2", title: "Landing page audit + notes", client: "RetailMax", project: "Website Optimization", assignedTo: "Jordan Lee", status: "In Progress", priority: "Medium", dueDate: "2026-01-05", estHours: 5 },
  { id: "t3", title: "Competitor scan (top 3)", client: "GreenLeaf Industries", project: "Market Research", assignedTo: "A. Patel", status: "To Do", priority: "Low", dueDate: "2026-01-08", estHours: 2 },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [status, setStatus] = useState<"All" | Status>("All");
  const [assignee, setAssignee] = useState<string>("All");
  const [priority, setPriority] = useState<"All" | Priority>("All");

  const assignees = useMemo(() => ["All", ...Array.from(new Set(tasks.map((t) => t.assignedTo)))], [tasks]);

  const filtered = useMemo(() => {
    let data = [...tasks];
    if (status !== "All") data = data.filter((t) => t.status === status);
    if (assignee !== "All") data = data.filter((t) => t.assignedTo === assignee);
    if (priority !== "All") data = data.filter((t) => t.priority === priority);
    return data;
  }, [tasks, status, assignee, priority]);

  function setTaskStatus(id: string, next: Status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: next } : t)));
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <AppShell>
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Tasks & Action Items</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/tasks">Tasks</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={{ padding: 10 }}>
          <option value="All">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={{ padding: 10 }}>
          {assignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value as any)} style={{ padding: 10 }}>
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </section>

      <section style={{ marginTop: 16, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Task Title", "Client", "Project", "Assigned To", "Status", "Priority", "Due Date", "Est. Hours", "Quick Update"].map(
                (h) => (
                  <th key={h} style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const overdue = t.status !== "Done" && t.dueDate < today;
              const dueSoon = t.status !== "Done" && t.dueDate >= today && t.dueDate <= addDays(today, 3);

              return (
                <tr
                  key={t.id}
                  style={{
                    borderBottom: "1px solid #222",
                    background: overdue ? "rgba(255,0,0,0.12)" : dueSoon ? "rgba(255,255,0,0.10)" : "transparent",
                  }}
                >
                  <td style={{ padding: 10, fontWeight: 700 }}>{t.title}</td>
                  <td style={{ padding: 10 }}>{t.client}</td>
                  <td style={{ padding: 10 }}>{t.project}</td>
                  <td style={{ padding: 10 }}>{t.assignedTo}</td>
                  <td style={{ padding: 10 }}>{t.status}</td>
                  <td style={{ padding: 10 }}>{t.priority}</td>
                  <td style={{ padding: 10 }}>{t.dueDate}</td>
                  <td style={{ padding: 10 }}>{t.estHours}</td>
                  <td style={{ padding: 10 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={() => setTaskStatus(t.id, "To Do")} style={{ padding: "6px 10px" }}>
                        To Do
                      </button>
                      <button onClick={() => setTaskStatus(t.id, "In Progress")} style={{ padding: "6px 10px" }}>
                        In Progress
                      </button>
                      <button onClick={() => setTaskStatus(t.id, "Done")} style={{ padding: "6px 10px" }}>
                        Done
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <p style={{ opacity: 0.75, marginTop: 12 }}>
        Prototype: changes are in-memory. Next: persist tasks in DB per tenant/client.
      </p>
      
    </main>
    </AppShell>
  );
}

function addDays(yyyyMmDd: string, days: number) {
  const d = new Date(yyyyMmDd + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
