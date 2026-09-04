import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(233,184,76,0.06), transparent), var(--bg-0)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            fontFamily: "var(--mono)",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
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
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ink-0)" }}>goyono</span>
        </Link>
        <div className="card fade-up" style={{ padding: 28 }}>
          {children}
        </div>
      </div>
    </main>
  );
}
