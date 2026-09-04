"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function TutorPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "I'm the goyono guide. Ask me anything about the lesson, or paste an error you're stuck on." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: next.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: data.error || "Something went wrong." }]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error — try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: 420 }} id="tutor">
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-2)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: "var(--mono)", color: "var(--amber)", fontSize: 14 }}>◐</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Guide</span>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            className="fade-up"
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              background: m.role === "user" ? "var(--bg-3)" : "var(--bg-2)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "9px 12px",
              fontSize: 13.5,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: "flex-start", color: "var(--ink-2)", fontSize: 12.5, fontFamily: "var(--mono)" }}>
            thinking…
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--line)", padding: 10, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask the guide…"
          style={{
            flex: 1,
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            color: "var(--ink-0)",
            borderRadius: 8,
            padding: "9px 12px",
            fontSize: 13.5,
            outline: "none",
          }}
        />
        <button onClick={send} disabled={loading} className="btn btn-primary" style={{ padding: "8px 14px", fontSize: 12.5 }}>
          Send
        </button>
      </div>
    </div>
  );
}
