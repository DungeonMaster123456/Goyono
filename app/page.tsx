import Link from "next/link";
import TokenField from "@/components/TokenField";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <TokenField />

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          background: "rgba(7,8,10,.7)",
          backdropFilter: "blur(14px) saturate(140%)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "var(--mono)" }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 1,
              background: "var(--amber)",
              display: "inline-block",
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px var(--amber)",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 600 }}>goyono</span>
        </div>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link href="/signin" className="btn btn-outline">
            Sign in
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Get started
          </Link>
        </nav>
      </header>

      <section
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "min(14vh, 130px)",
          paddingBottom: 100,
        }}
      >
        <p style={{ fontFamily: "var(--mono)", color: "var(--ink-2)", fontSize: 12.5, marginBottom: 18 }}>
          black gold studios · powered by onyx
        </p>
        <h1
          className="fade-up"
          style={{
            fontSize: "clamp(38px, 6vw, 68px)",
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            maxWidth: "16ch",
            margin: "0 0 22px",
          }}
        >
          Learn to build, with someone watching your terminal.
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: 17,
            color: "var(--ink-1)",
            maxWidth: "48ch",
            lineHeight: 1.6,
            margin: "0 0 34px",
            animationDelay: "0.08s",
          }}
        >
          goyono teaches coding and AI through real, running code — not videos. Every
          lesson opens a live terminal, and a guide is there when you get stuck.
        </p>
        <div className="fade-up" style={{ display: "flex", gap: 12, animationDelay: "0.14s" }}>
          <Link href="/signup" className="btn btn-primary" style={{ padding: "13px 22px", fontSize: 14.5 }}>
            Start learning — free
          </Link>
          <Link href="/signin" className="btn btn-ghost" style={{ padding: "13px 22px", fontSize: 14.5 }}>
            I have an account
          </Link>
        </div>
      </section>

      <section className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 120 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {[
            { tag: "⌁", title: "Real terminals", body: "Run actual Python, JavaScript, C++, and Java — not a simulation." },
            { tag: "◐", title: "A guide, not a script", body: "Ask questions as you code. Get nudged, not just answered." },
            { tag: "▦", title: "Paths that build up", body: "Foundations to AI, in an order that actually makes sense." },
          ].map((f) => (
            <div key={f.title} className="card smooth" style={{ padding: 22 }}>
              <div style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 20, marginBottom: 14 }}>
                {f.tag}
              </div>
              <h3 style={{ fontSize: 15.5, margin: "0 0 8px", fontWeight: 600 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-1)", lineHeight: 1.55, margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 24px 40px",
          fontSize: 11.5,
          color: "var(--ink-2)",
          fontFamily: "var(--mono)",
        }}
      >
        <span>goyono / black gold studios / onyx</span>
        <span style={{ display: "flex", gap: 16 }}>
          <Link href="/privacy" style={{ color: "var(--ink-2)" }}>
            Privacy
          </Link>
          <Link href="/terms" style={{ color: "var(--ink-2)" }}>
            Terms
          </Link>
        </span>
      </footer>
    </main>
  );
}
