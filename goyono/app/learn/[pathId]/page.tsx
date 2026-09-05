import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";
import LessonView from "@/components/LessonView";

export default async function PathPage({
  params,
  searchParams,
}: {
  params: { pathId: string };
  searchParams: { lesson?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  const path = await prisma.path.findUnique({
    where: { slug: params.pathId },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!path) notFound();

  const activeSlug = searchParams.lesson ?? path.lessons[0]?.slug;
  const activeLesson = path.lessons.find((l) => l.slug === activeSlug) ?? path.lessons[0];

  const progress = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, lessonId: { in: path.lessons.map((l) => l.id) } },
  });
  const completedIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar userName={session.user.name} userImage={session.user.image} />

      <aside
        style={{
          width: 250,
          flexShrink: 0,
          borderRight: "1px solid var(--line)",
          padding: "28px 16px",
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
        }}
      >
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber)", margin: "0 0 4px" }}>
          {path.tag}
        </p>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>{path.title}</h2>
        <p style={{ fontSize: 12, color: "var(--ink-1)", margin: "0 0 18px", lineHeight: 1.5 }}>
          {path.description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {path.lessons.map((lesson, i) => {
            const active = lesson.slug === activeLesson?.slug;
            const done = completedIds.has(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/learn/${path.slug}?lesson=${lesson.slug}`}
                className="smooth"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  fontSize: 13,
                  color: active ? "var(--ink-0)" : "var(--ink-1)",
                  background: active ? "var(--bg-2)" : "transparent",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `1px solid ${done ? "var(--ok)" : "var(--line)"}`,
                    background: done ? "var(--ok)" : "transparent",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#052",
                  }}
                >
                  {done ? "✓" : ""}
                </span>
                {i + 1}. {lesson.title}
              </Link>
            );
          })}
        </div>
      </aside>

      <main style={{ flex: 1, padding: "34px 40px 60px", maxWidth: 900 }}>
        {activeLesson ? (
          <LessonView lesson={activeLesson} completed={completedIds.has(activeLesson.id)} />
        ) : (
          <p style={{ color: "var(--ink-1)" }}>No lessons yet in this path.</p>
        )}
      </main>
    </div>
  );
}
