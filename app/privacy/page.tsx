import Link from "next/link";

export const metadata = { title: "Privacy Policy — goyono" };

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: "0 0 30px" }}>Privacy Policy</h1>

        <Section title="What we collect">
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Your name and email address (from Google sign-in, or the ones you type in if you sign up with email and password)</li>
            <li>A profile picture, if you sign in with Google</li>
            <li>Code you run in the terminal, and the output it produces</li>
            <li>Messages you send to the AI guide, and its replies</li>
            <li>Which lessons you've completed and your activity streak</li>
          </ul>
        </Section>

        <Section title="How we use it">
          <p>
            We use this data to run the product: to sign you in, remember your progress, show
            your terminal history, and let the AI guide give relevant answers by referencing
            your recent conversation. We don't sell your data, and we don't share it with
            advertisers.
          </p>
        </Section>

        <Section title="Third parties">
          <p>Running goyono means a few other services see limited data on our behalf:</p>
          <ul>
            <li><strong>Google</strong> — if you sign in with Google, they handle authentication and share your name, email, and profile picture with us.</li>
            <li><strong>Neon</strong> — our database provider, which stores your account and progress data.</li>
            <li><strong>Groq</strong> — processes messages you send to the AI guide to generate a reply.</li>
            <li><strong>Render</strong> — hosts the app and the code-execution service that runs your terminal code.</li>
          </ul>
        </Section>

        <Section title="Your data">
          <p>
            You can ask us to delete your account and associated data at any time by contacting
            us at the email below. Passwords, when you use email sign-in, are hashed and never
            stored in plain text.
          </p>
        </Section>

        <Section title="Contact">
          <p>Questions about this policy: reach out through the GitHub repository for this project.</p>
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
