import Link from "next/link";

export default function PortalResourcesPage() {
  return (
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
        <ul style={{ marginTop: 10 }}>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Monthly Reporting Template (PDF)</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Campaign Planner Checklist</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Competitor SWOT Worksheet</a></li>
        </ul>
      </section>
    </main>
  );
}
