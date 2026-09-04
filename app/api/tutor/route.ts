import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SYSTEM_PROMPT = `You are the goyono guide — a patient, encouraging coding and AI tutor embedded in a
learn-to-code platform called goyono, by Black Gold Studios.

Rules:
- Keep answers short and concrete. Favor a nudge over a full solution, unless the learner
  explicitly asks for the answer or is clearly stuck after trying.
- When explaining code, use plain language before jargon.
- If the learner shares an error message, explain what it means before suggesting a fix.
- Use code blocks for code. Never pad your answer with unnecessary preamble.
- You do not have emojis available in this product's design language — do not use them.`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { message, history } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message required." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Tutor is not configured (GROQ_API_KEY missing)." },
      { status: 500 }
    );
  }

  await prisma.tutorMessage.create({
    data: { userId: session.user.id, role: "user", content: message },
  });

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history.slice(-10) : []),
    { role: "user", content: message },
  ];

  let groqRes;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.4,
        max_tokens: 700,
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach the tutor right now." }, { status: 502 });
  }

  if (!groqRes.ok) {
    const text = await groqRes.text();
    return NextResponse.json(
      { error: `Tutor error: ${groqRes.status} ${text.slice(0, 200)}` },
      { status: 502 }
    );
  }

  const data = await groqRes.json();
  const reply = data?.choices?.[0]?.message?.content ?? "I couldn't generate a reply — try again.";

  await prisma.tutorMessage.create({
    data: { userId: session.user.id, role: "tutor", content: reply },
  });

  return NextResponse.json({ reply });
}
