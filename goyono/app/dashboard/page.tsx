import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";
import Terminal from "@/components/Terminal";
import TutorPanel from "@/components/TutorPanel";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  const [paths, streak, completedCount] = await Promise.all([
    prisma.path.findMany({
      orderBy: { order: "asc" },
      include: { lessons: { orderBy: { order: "asc" } } },
    }),
    prisma.streak.findUnique({ where: { userId: session.user.id } }),
    prisma.lessonProgress.count({ where: { userId: session.user.id, completed: true } }),
  ]);

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar userName={session.user.name} userImage={session.user.image} />

      <main style={{ flex: 1, padding: "34px 40px 60px" }}>
        <div style={{ marginBottom: 30 }}>
          <p style={{ fontFamily: "var(--mono)", color: "var(--ink-2)", fontSize: 12, margin: "0 0 6px" }}>
            overview
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Hey, {firstName}.</h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <StatCard label="Lessons completed" value={String(completedCount)} />
          <StatCard label="Current streak" value={`${streak?.current ?? 0}d`} />
          <StatCard label="Longest streak" value={`${streak?.longest ?? 0}d`} />
          <StatCard label="Paths available" value={String(paths.length)} />
        </div>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Paths</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {paths.map((p) => (
              <Link
                key={p.id}
                href={`/learn/${p.slug}`}
                className="card smooth"
                style={{ padding: 18, display: "block" }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--amber)",
                    border: "1px solid var(--amber-dim)",
                    display: "inline-block",
                    padding: "2px 7px",
                    borderRadius: 5,
                    marginBottom: 12,
                  }}
                >
                  {p.tag}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-1)", margin: 0, lineHeight: 1.5 }}>
                  {p.description}
                </p>
                <p style={{ fontSize: 11.5, color: "var(--ink-2)", marginTop: 12, fontFamily: "var(--mono)" }}>
                  {p.lessons.length} lessons
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Scratch terminal</h2>
            <Terminal />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 14px" }}>Guide</h2>
            <TutorPanel />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--mono)" }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--ink-1)", marginTop: 4 }}>{label}</div>
    </div>
  );
}
