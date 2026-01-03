import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function PortalResourcesPage() {
  return (
    <AppShell>
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Portal • Resources</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/portal">Portal</Link>
          <Link href="/portal/projects">Projects</Link>
          <Link href="/portal/resources">Resources</Link>
        </nav>
      </header>

      <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Downloads (prototype)</h2>
        <p style={{ opacity: 0.75, marginTop: 6 }}>
          These are placeholders. Later these will link to real files in the resource library.
        </p>

        <ul style={{ marginTop: 10 }}>
          <li>Monthly Reporting Template (PDF)</li>
          <li>Campaign Planner Checklist</li>
          <li>Competitor SWOT Worksheet</li>
        </ul>
      </section>
    </main>
    </AppShell>
  );
}
