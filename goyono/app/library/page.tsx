import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar";

const SUBJECT_LABELS: Record<string, string> = {
  python: "Python",
  "html-css": "Web (HTML/CSS/JS)",
  ai: "AI",
  general: "General",
};

export default async function LibraryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  const books = await prisma.book.findMany({ orderBy: { order: "asc" } });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar userName={session.user.name} userImage={session.user.image} />

      <main style={{ flex: 1, padding: "34px 40px 60px" }}>
        <p style={{ fontFamily: "var(--mono)", color: "var(--ink-2)", fontSize: 12, margin: "0 0 6px" }}>
          library
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 6px" }}>Free books, beginner to advanced</h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-1)", margin: "0 0 30px", maxWidth: 560 }}>
          Real, legally free books and courses from their original authors and publishers —
          ordered roughly easiest to hardest. These links leave goyono; nothing here is hosted
          or reproduced by us.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {books.map((book) => (
            <a
              key={book.id}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card smooth"
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: 18,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--amber)",
                  border: "1px solid var(--amber-dim)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                level {book.level}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{book.title}</h3>
                  <span style={{ fontSize: 12, color: "var(--ink-2)" }}>
                    {SUBJECT_LABELS[book.subject] ?? book.subject}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "2px 0 8px" }}>
                  {book.author}
                </p>
                <p style={{ fontSize: 13, color: "var(--ink-1)", margin: "0 0 8px", lineHeight: 1.55 }}>
                  {book.description}
                </p>
                <p style={{ fontSize: 11, color: "var(--ink-2)", fontFamily: "var(--mono)", margin: 0 }}>
                  {book.license}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
