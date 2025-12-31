"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "AI Research", href: "/ai-research" },
  { label: "Competitor Analysis", href: "/competitors" },
  { label: "Campaign Planner", href: "/campaign-planner" },
  { label: "Ad Intelligence", href: "/ad-intelligence" },
  { label: "Website Scanner", href: "/website-scanner" },
  { label: "Meeting Insights", href: "/meeting-insights" },
  { label: "Email Hub", href: "/communications" },
  { label: "Clients", href: "/clients" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      style={{
        width: 260,
        borderRight: "1px solid var(--border)",
        padding: 16,
        position: "sticky",
        top: 0,
        height: "100vh",
        background: "linear-gradient(180deg, rgba(107,15,26,.10), rgba(20,17,18,1))",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            background: "linear-gradient(135deg, var(--maroon), var(--gold))",
            boxShadow: "var(--shadow)",
          }}
        />
        <div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>MarketIQ</div>
          <div style={{ fontWeight: 900 }}>Agency Platform</div>
        </div>
      </div>

      <nav style={{ display: "grid", gap: 8 }}>
        {NAV.map((item) => {
          const active = path === item.href || path.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: active ? "rgba(214,179,106,.10)" : "transparent",
                color: active ? "var(--tan)" : "var(--text)",
                fontWeight: active ? 800 : 600,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 16, color: "var(--muted)", fontSize: 12, lineHeight: 1.4 }}>
        Prototype mode • Mock/Real toggle supported on KPI pages • Open-source (MIT)
      </div>
    </aside>
  );
}
