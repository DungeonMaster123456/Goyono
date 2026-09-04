import Link from "next/link";

export const metadata = { title: "Terms of Service — goyono" };

export default function TermsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        color: "var(--ink-0)",
        padding: "60px 24px 100px",
      }}
    >
      <div className="container" style={{ maxWidth: 720 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 10,
            fontFamily: "var(--mono)",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 1,
              background: "var(--amber)",
              display: "inline-block",
              transform: "rotate(45deg)",
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 600 }}>goyono</span>
        </Link>

        <p style={{ fontFamily: "var(--mono)", color: "var(--ink-2)", fontSize: 12, marginBottom: 10 }}>
          last updated September 2026
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 30px" }}>Terms of Service</h1>

        <Section title="What goyono is">
          <p>
            goyono is a learning platform that teaches coding and AI through interactive
            lessons, a real code-execution terminal, and an AI guide. It's built by Black Gold
            Studios and powered by Onyx.
          </p>
        </Section>

        <Section title="Your account">
          <p>
            You're responsible for what happens under your account. Don't share your password,
            and tell us if you think someone else has access to your account.
          </p>
        </Section>

        <Section title="Acceptable use">
          <p>The code terminal runs real code in a sandboxed environment. You agree not to:</p>
          <ul>
            <li>Use it to attack, scan, or gain unauthorized access to other systems</li>
            <li>Attempt to break out of the sandbox or disrupt the execution service for other users</li>
            <li>Use the AI guide to generate harmful, illegal, or abusive content</li>
            <li>Automate account creation or abuse rate limits</li>
          </ul>
          <p>We may suspend accounts that violate these terms.</p>
        </Section>

        <Section title="No warranty">
          <p>
            goyono is provided as-is. Lessons, AI guide replies, and code execution results may
            contain mistakes — this is a learning tool, not a certified reference. Don't rely on
            it for production code or critical decisions without your own verification.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update these terms as the product changes. Continued use after an update
            means you accept the new terms.
          </p>
        </Section>

        <Section title="Contact">
          <p>Questions: reach out through the GitHub repository for this project.</p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-1)" }}>{children}</div>
    </section>
  );
}
