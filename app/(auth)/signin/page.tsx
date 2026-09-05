"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleIcon from "@/components/GoogleIcon";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
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
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Wrong email or password.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <h1 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Welcome back</h1>
      <p style={{ fontSize: 13.5, color: "var(--ink-1)", margin: "0 0 22px" }}>
        Sign in to pick up where you left off.
      </p>

      {params.get("registered") && (
        <div
          style={{
            fontSize: 12.5,
            color: "var(--ok)",
            background: "rgba(111,207,151,0.08)",
            border: "1px solid rgba(111,207,151,0.25)",
            borderRadius: 8,
            padding: "9px 12px",
            marginBottom: 16,
          }}
        >
          Account created — sign in below.
        </div>
      )}

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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p style={{ fontSize: 13, color: "var(--ink-1)", textAlign: "center", marginTop: 20 }}>
        New here?{" "}
        <Link href="/signup" style={{ color: "var(--amber)", fontWeight: 600 }}>
          Create an account
        </Link>
      </p>
    </>
  );
}
