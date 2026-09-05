"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/learn/html-css-foundations", label: "Paths", icon: "◈" },
  { href: "/library", label: "Library", icon: "▤" },
  { href: "/dashboard#terminal", label: "Terminal", icon: "⌁" },
  { href: "/dashboard#tutor", label: "Guide", icon: "◐" },
];

export default function Sidebar({
  userName,
  userImage,
}: {
  userName?: string | null;
  userImage?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "baseline", gap: 10, fontFamily: "var(--mono)", padding: "0 8px 22px" }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 1,
            background: "var(--amber)",
            display: "inline-block",
            transform: "rotate(45deg)",
            boxShadow: "0 0 10px var(--amber)",
          }}
        />
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>goyono</span>
      </Link>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const active = pathname === item.href.split("#")[0];
          return (
            <Link
              key={item.href}
              href={item.href}
              className="smooth"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                fontSize: 13.5,
                color: active ? "var(--ink-0)" : "var(--ink-1)",
                background: active ? "var(--bg-2)" : "transparent",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", color: active ? "var(--amber)" : "var(--ink-2)", width: 16 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 8px",
            borderRadius: 8,
            border: "1px solid var(--line)",
          }}
        >
          {userImage ? (
            <Image src={userImage} alt="" width={26} height={26} style={{ borderRadius: "50%" }} />
          ) : (
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "var(--bg-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: "var(--ink-1)",
              }}
            >
              {userName?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <span style={{ fontSize: 12.5, color: "var(--ink-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {userName ?? "Learner"}
          </span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn btn-outline smooth"
          style={{ fontSize: 12.5, padding: "8px 10px", justifyContent: "center" }}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
