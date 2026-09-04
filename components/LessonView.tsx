"use client";

import { useState } from "react";
import Terminal from "@/components/Terminal";

type Lesson = {
  id: string;
  title: string;
  content: string;
  starterCode: string;
  language: string;
};

export default function LessonView({ lesson, completed }: { lesson: Lesson; completed: boolean }) {
  const [done, setDone] = useState(completed);
  const [marking, setMarking] = useState(false);

  async function markComplete() {
    setMarking(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id }),
      });
      if (res.ok) setDone(true);
    } finally {
      setMarking(false);
    }
  }

  return (
    <div key={lesson.id} className="fade-up">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>{lesson.title}</h1>
        <button
          onClick={markComplete}
          disabled={done || marking}
          className={done ? "btn btn-ghost" : "btn btn-primary"}
          style={{ padding: "8px 16px", fontSize: 12.5 }}
        >
          {done ? "Completed ✓" : marking ? "Saving…" : "Mark complete"}
        </button>
      </div>

      <div
        style={{
          fontSize: 14.5,
          lineHeight: 1.7,
          color: "var(--ink-1)",
          marginBottom: 26,
          whiteSpace: "pre-wrap",
        }}
      >
        {lesson.content.replace(/^#+\s.*\n?/gm, "").trim()}
      </div>

      <Terminal initialCode={lesson.starterCode} initialLanguage={lesson.language} lessonId={lesson.id} />
    </div>
  );
}
