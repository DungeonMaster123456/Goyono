import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}
function isYesterday(a: Date, b: Date) {
  const y = new Date(b);
  y.setDate(y.getDate() - 1);
  return isSameDay(a, y);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const userId = session.user.id;
  const { lessonId } = await req.json();
  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { userId, lessonId, completed: true, completedAt: new Date() },
  });

  const now = new Date();
  const streak = await prisma.streak.findUnique({ where: { userId } });

  let current = 1;
  let longest = 1;
  if (streak) {
    if (streak.lastActiveDay && isSameDay(streak.lastActiveDay, now)) {
      current = streak.current;
    } else if (streak.lastActiveDay && isYesterday(streak.lastActiveDay, now)) {
      current = streak.current + 1;
    } else {
      current = 1;
    }
    longest = Math.max(streak.longest, current);
  }

  await prisma.streak.upsert({
    where: { userId },
    update: { current, longest, lastActiveDay: now },
    create: { userId, current, longest, lastActiveDay: now },
  });

  return NextResponse.json({ ok: true, streak: { current, longest } });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const [progress, streak] = await Promise.all([
    prisma.lessonProgress.findMany({ where: { userId: session.user.id, completed: true } }),
    prisma.streak.findUnique({ where: { userId: session.user.id } }),
  ]);
  return NextResponse.json({ progress, streak });
}
