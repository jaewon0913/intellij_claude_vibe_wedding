"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dev-theme";

export default function DevThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-dev-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-dev-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크/라이트 모드 전환"
      className="rounded border px-2 py-1 text-xs transition"
      style={{
        borderColor: "var(--dev-border)",
        color: "var(--dev-text-dim)",
        backgroundColor: "var(--dev-bg-panel)",
      }}
    >
      {theme === "dark" ? "🌙 dark" : "☀️ light"}
    </button>
  );
}
