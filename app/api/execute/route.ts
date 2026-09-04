import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Maps our simple language ids to Piston's runtime names + versions.
// Versions are set to "*" to always use whatever Piston has installed —
// check your Piston instance's /api/v2/runtimes if a run fails with
// "runtime not found".
const RUNTIMES: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  cpp: { language: "c++", version: "10.2.0" },
  java: { language: "java", version: "15.0.2" },
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { language, code } = await req.json();
  const runtime = RUNTIMES[language];
  if (!runtime) {
    return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 });
  }
  if (!code || code.length > 20000) {
    return NextResponse.json({ error: "Code is empty or too long." }, { status: 400 });
  }

  const pistonUrl = process.env.PISTON_URL;
  if (!pistonUrl) {
    return NextResponse.json(
      { error: "Execution service is not configured (PISTON_URL missing)." },
      { status: 500 }
    );
  }

  const fileNames: Record<string, string> = {
    python: "main.py",
    javascript: "main.js",
    cpp: "main.cpp",
    java: "Main.java",
  };

  let pistonRes;
  try {
    pistonRes = await fetch(`${pistonUrl.replace(/\/$/, "")}/api/v2/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ name: fileNames[language], content: code }],
        run_timeout: 8000,
        compile_timeout: 10000,
      }),
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Could not reach the execution service. It may be waking up — try again in a few seconds." },
      { status: 502 }
    );
  }

  if (!pistonRes.ok) {
    return NextResponse.json({ error: "Execution service returned an error." }, { status: 502 });
  }

  const result = await pistonRes.json();
  const stdout = result?.run?.stdout ?? "";
  const stderr = result?.run?.stderr ?? result?.compile?.stderr ?? "";

  await prisma.terminalRun.create({
    data: {
      userId: session.user.id,
      language,
      code,
      stdout,
      stderr,
    },
  });

  return NextResponse.json({ stdout, stderr, signal: result?.run?.signal ?? null });
}
