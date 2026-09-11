import Link from "next/link";
import DevThemeToggle from "./DevThemeToggle";

export default function DevNav() {
  return (
    <div
      className="flex items-center justify-between border-b px-4 py-3 text-xs sm:px-6"
      style={{ borderColor: "var(--dev-border)", color: "var(--dev-text-dim)" }}
    >
      <span>
        <span style={{ color: "var(--dev-accent-green)" }}>~/wedding</span>
        <span> main</span>
      </span>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="rounded border px-2 py-1 transition hover:opacity-80"
          style={{
            borderColor: "var(--dev-border)",
            backgroundColor: "var(--dev-bg-panel)",
          }}
        >
          ← 메인 버전
        </Link>
        <DevThemeToggle />
      </div>
    </div>
  );
}
