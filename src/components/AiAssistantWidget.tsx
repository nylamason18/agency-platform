"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Msg = { role: "user" | "ai"; text: string };

function ruleReply(text: string) {
  const t = text.toLowerCase();

  if (t.includes("competitor") || t.includes("swot")) {
    return {
      answer: "I can help you review competitors and generate a SWOT. Want me to open the Competitor Center?",
      links: [{ label: "Open Competitor Analysis", href: "/competitors" }],
    };
  }
  if (t.includes("campaign") || t.includes("plan") || t.includes("q1")) {
    return {
      answer: "I can generate a campaign plan outline, channels mix, and KPI targets (prototype).",
      links: [{ label: "Open Campaign Planner", href: "/campaign-planner" }],
    };
  }
  if (t.includes("meeting") || t.includes("transcript") || t.includes("record")) {
    return {
      answer: "Meeting recordings and transcripts will appear under Meeting Insights and inside the client profile.",
      links: [{ label: "Open Meeting Insights", href: "/meeting-insights" }],
    };
  }
  if (t.includes("client")) {
    return {
      answer: "You can search clients, open profiles, and drill into performance + tasks + communications.",
      links: [{ label: "Open Clients", href: "/clients" }],
    };
  }
  if (t.includes("task") || t.includes("action")) {
    return { answer: "Tasks can be updated from the Tasks page using quick status buttons.", links: [{ label: "Open Tasks", href: "/tasks" }] };
  }
  if (t.includes("email") || t.includes("message") || t.includes("communication")) {
    return { answer: "The Email Hub is integrated with Communications. Prototype shows a mailbox-style area.", links: [{ label: "Open Email Hub", href: "/communications" }] };
  }

  return {
    answer: "Ask me about competitors, campaigns, meetings, clients, tasks, or performance metrics.",
    links: [{ label: "Go to Dashboard", href: "/dashboard" }],
  };
}

export default function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your AI Research Assistant. Ask about competitors, trends, or performance." },
  ]);
  const [input, setInput] = useState("");

  const suggestions = useMemo(
    () => [
      "Analyze top 3 competitors in my niche",
      "Generate ad copy ideas for Q1 campaign",
      "What are trending keywords this week?",
      "Create a SWOT analysis template",
    ],
    []
  );

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = [...messages, { role: "user", text: trimmed } as Msg];
    const r = ruleReply(trimmed);
    next.push({ role: "ai", text: r.answer });
    setMessages(next);
    setInput("");
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          width: 54,
          height: 54,
          borderRadius: 18,
          border: "1px solid var(--border)",
          background: "linear-gradient(135deg, var(--gold), var(--tan))",
          color: "#1b120b",
          fontWeight: 900,
          boxShadow: "var(--shadow)",
          cursor: "pointer",
          zIndex: 50,
        }}
        aria-label="Open AI Assistant"
      >
        AI
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 18,
            bottom: 82,
            width: 360,
            maxWidth: "calc(100vw - 36px)",
            borderRadius: 16,
            border: "1px solid var(--border)",
            background: "linear-gradient(180deg, rgba(20,17,18,.98), rgba(12,10,10,.98))",
            boxShadow: "var(--shadow)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: 12, borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 900 }}>AI Research Assistant</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Prototype • rules-based responses</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ border: "1px solid var(--border)", background: "transparent", color: "var(--text)", borderRadius: 10, padding: "6px 10px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: 12, display: "grid", gap: 10, maxHeight: 260, overflow: "auto" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: 10,
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: m.role === "ai" ? "rgba(214,179,106,.08)" : "rgba(107,15,26,.10)",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>{m.role === "ai" ? "Assistant" : "You"}</div>
                <div>{m.text}</div>
              </div>
            ))}

            <div style={{ display: "grid", gap: 8 }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text)",
                    cursor: "pointer",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Helpful quick links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/competitors">Competitors</Link>
              <span style={{ color: "var(--muted)" }}>•</span>
              <Link href="/campaign-planner">Campaign Planner</Link>
              <span style={{ color: "var(--muted)" }}>•</span>
              <Link href="/meeting-insights">Meeting Insights</Link>
            </div>
          </div>

          <div style={{ padding: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "rgba(0,0,0,.25)",
                color: "var(--text)",
                outline: "none",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
            />
            <button
              onClick={() => send(input)}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "linear-gradient(135deg, var(--maroon), var(--maroon2))",
                color: "white",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
