"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/components/GoogleIcon";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/signin?registered=1");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Create your account</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-1)", margin: "0 0 22px" }}>
        Free, and takes under a minute.
      </p>

      <button
        onClick={handleGoogle}
        disabled={googleLoading}
        className="btn btn-outline smooth"
        style={{ width: "100%", justifyContent: "center", padding: "11px 16px", marginBottom: 16 }}
      >
        <GoogleIcon />
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          margin: "18px 0",
          color: "var(--ink-2)",
          fontSize: 11.5,
        }}
      >
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        or with email
        <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ fontSize: 13, color: "var(--ink-1)", textAlign: "center", marginTop: 20 }}>
        Already have an account?{" "}
        <Link href="/signin" style={{ color: "var(--amber)", fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </>
  );
}
