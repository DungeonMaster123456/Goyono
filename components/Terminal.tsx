"use client";

import { useState } from "react";

const LANGS = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
];

const DEFAULTS: Record<string, string> = {
  python: 'print("hello, world")\n',
  javascript: 'console.log("hello, world");\n',
  cpp: '#include <iostream>\nint main() {\n    std::cout << "hello, world" << std::endl;\n    return 0;\n}\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("hello, world");\n    }\n}\n',
};

export default function Terminal({
  initialCode,
  initialLanguage,
  lessonId,
}: {
  initialCode?: string;
  initialLanguage?: string;
  lessonId?: string;
}) {
  const [language, setLanguage] = useState(initialLanguage ?? "python");
  const [code, setCode] = useState(initialCode ?? DEFAULTS[initialLanguage ?? "python"]);
  const [output, setOutput] = useState<{ stdout: string; stderr: string } | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const isHtml = language === "html";

  async function run() {
    if (isHtml) {
      // no execution service involved — just re-render the live preview
      setPreviewKey((k) => k + 1);
      return;
    }
    setRunning(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Execution failed.");
      } else {
        setOutput({ stdout: data.stdout, stderr: data.stderr });
      }
    } catch {
      setError("Network error — could not run code.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="card" style={{ overflow: "hidden" }} id="terminal">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-2)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {!lessonId &&
            LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLanguage(l.id);
                  setCode(DEFAULTS[l.id]);
                  setOutput(null);
                  setError(null);
                }}
                className="smooth"
                style={{
                  fontSize: 12,
                  padding: "5px 10px",
                  borderRadius: 6,
                  border: "1px solid " + (language === l.id ? "var(--amber-dim)" : "transparent"),
                  background: language === l.id ? "var(--bg-3)" : "transparent",
                  color: language === l.id ? "var(--ink-0)" : "var(--ink-1)",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          {lessonId && (
            <span style={{ fontSize: 12, color: "var(--ink-1)", fontFamily: "var(--mono)" }}>{language}</span>
          )}
        </div>
        <button onClick={run} disabled={running} className="btn btn-primary" style={{ padding: "6px 14px", fontSize: 12.5 }}>
          {isHtml ? "Preview ▸" : running ? "Running…" : "Run ▸"}
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: 220,
          background: "var(--bg-1)",
          color: "var(--ink-0)",
          border: "none",
          outline: "none",
          padding: 16,
          fontFamily: "var(--mono)",
          fontSize: 13.5,
          lineHeight: 1.6,
          resize: "vertical",
        }}
      />

      {isHtml ? (
        <div
          style={{
            borderTop: "1px solid var(--line)",
            background: "#fff",
            minHeight: 180,
            maxHeight: 360,
          }}
        >
          <iframe
            key={previewKey}
            title="preview"
            srcDoc={code}
            sandbox=""
            style={{ width: "100%", height: 260, border: "none", display: "block" }}
          />
        </div>
      ) : (
        <div
          style={{
            borderTop: "1px solid var(--line)",
            background: "#000",
            padding: 14,
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            minHeight: 90,
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {!output && !error && !running && (
            <span style={{ color: "var(--ink-2)" }}>output will appear here</span>
          )}
          {running && <span style={{ color: "var(--ink-2)" }}>running…</span>}
          {error && <span style={{ color: "var(--err)" }}>{error}</span>}
          {output?.stdout && <pre style={{ margin: 0, color: "var(--ink-0)", whiteSpace: "pre-wrap" }}>{output.stdout}</pre>}
          {output?.stderr && (
            <pre style={{ margin: "8px 0 0", color: "var(--err)", whiteSpace: "pre-wrap" }}>{output.stderr}</pre>
          )}
          {output && !output.stdout && !output.stderr && (
            <span style={{ color: "var(--ink-2)" }}>ran with no output</span>
          )}
        </div>
      )}
    </div>
  );
}

