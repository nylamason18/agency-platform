import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function PortalProjectsPage() {
  return (
    <AppShell>
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Portal • Projects</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/portal">Portal</Link>
          <Link href="/portal/projects">Projects</Link>
          <Link href="/portal/resources">Resources</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Active projects (prototype)</h2>
        <ul style={{ marginTop: 10 }}>
          <li><b>Q1 Campaign Plan</b> — Planning — Due 2026-01-05</li>
          <li><b>Website Scan + CRO Notes</b> — In Progress — Due 2026-01-08</li>
        </ul>
      </section>
    </main>
    </AppShell>
  );
}
