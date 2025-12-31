"use client";

export default function Topbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "center",
        padding: "14px 16px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(10,10,10,.35)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ flex: 1, maxWidth: 520 }}>
        <input
          placeholder="Search anything..."
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "rgba(0,0,0,.25)",
            color: "var(--text)",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          🔔
        </button>
        <button
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "linear-gradient(135deg, var(--maroon), var(--maroon2))",
            color: "white",
            cursor: "pointer",
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
