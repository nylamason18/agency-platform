"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function signIn() {
    setMsg("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMsg("Error: " + error.message);
    else setMsg("Signed in ✅ (we'll redirect later)");
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h2>UI test</h2>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Sign in</h1>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10 }}
        />
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background:
              "linear-gradient(135deg, var(--maroon), var(--maroon2))",
            color: "white",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>

        <p>{msg}</p>
      </div>
    </main>
  );
}
