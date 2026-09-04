"use client";

import { useEffect, useRef } from "react";

const CELL = 40;
const JITTER = 16;
const RADIUS = 150;
const PUSH = 90;
const TOKENS = ["0", "1", "fn", "{}", "=>", "0x", "//", "1a", "01", "λ", "0"];

type Token = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  text: string;
  baseAlpha: number;
  baseSize: number;
  tint: "white" | "blue" | "amber";
  nextSwap: number;
  push: number;
  vis: number;
};

export default function TokenField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0,
      DPR = 1;
    let tokens: Token[] = [];
    let mx = -9999,
      my = -9999,
      targetMx = mx,
      targetMy = my;
    let raf = 0;

    function buildTokens() {
      tokens = [];
      const cols = Math.ceil(W / CELL);
      const rows = Math.ceil(H / CELL);
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          if (Math.random() < 0.35) continue;
          const isColor = Math.random() < 0.12;
          const hx = gx * CELL + CELL / 2 + (Math.random() - 0.5) * JITTER;
          const hy = gy * CELL + CELL / 2 + (Math.random() - 0.5) * JITTER;
          tokens.push({
            homeX: hx,
            homeY: hy,
            x: hx,
            y: hy,
            text: TOKENS[(Math.random() * TOKENS.length) | 0],
            baseAlpha: 0.4 + Math.random() * 0.4,
            baseSize: 10 + Math.random() * 3,
            tint: isColor ? (Math.random() < 0.5 ? "blue" : "amber") : "white",
            nextSwap: performance.now() + 5000 + Math.random() * 10000,
            push: 0,
            vis: 0,
          });
        }
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      if (!canvas) return;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildTokens();
    }
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetMx = e.touches[0].clientX;
        targetMy = e.touches[0].clientY;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const r2 = RADIUS * RADIUS;

    function frame(now: number) {
      mx += (targetMx - mx) * 0.18;
      my += (targetMy - my) * 0.18;

      ctx!.clearRect(0, 0, W, H);
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];

        if (now > t.nextSwap) {
          t.text = TOKENS[(Math.random() * TOKENS.length) | 0];
          t.nextSwap = now + 5000 + Math.random() * 10000;
        }

        const dx = t.homeX - mx,
          dy = t.homeY - my;
        const d2 = dx * dx + dy * dy;

        let targetPush = 0;
        let targetVis = 0;
        let angle = 0;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 0.0001;
          angle = Math.atan2(dy, dx);
          const closeness = 1 - d / RADIUS;
          targetPush = closeness * closeness * PUSH;
          targetVis = closeness;
        }
        t.push += (targetPush - t.push) * 0.12;
        t.vis += (targetVis - t.vis) * 0.15;

        if (t.push > 0.5 && d2 < r2 * 4) {
          t.x = t.homeX + Math.cos(angle) * t.push;
          t.y = t.homeY + Math.sin(angle) * t.push;
        } else {
          t.x += (t.homeX - t.x) * 0.12;
          t.y += (t.homeY - t.y) * 0.12;
        }

        const pushRatio = Math.min(1, t.push / PUSH);
        const scale = 1 + pushRatio * 1.6;
        const alpha = t.baseAlpha * t.vis;

        if (alpha < 0.01) continue;

        let rgb = "255,255,255";
        if (t.tint === "blue") rgb = "110,150,230";
        else if (t.tint === "amber") rgb = "224,168,90";

        ctx!.save();
        ctx!.translate(t.x, t.y);
        ctx!.scale(scale, scale);
        ctx!.font = `${t.baseSize}px "IBM Plex Mono", monospace`;
        ctx!.fillStyle = `rgba(${rgb},${alpha})`;
        ctx!.fillText(t.text, 0, 0);
        ctx!.restore();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        mixBlendMode: "screen",
      }}
    />
  );
}
