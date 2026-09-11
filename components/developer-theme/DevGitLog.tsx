"use client";

import { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import TerminalWindow from "./TerminalWindow";

// 문단(줄바꿈 포함) 안의 \n을 하나의 커밋 메시지 라인으로 풀어서
// git log --oneline --graph 스타일의 목록으로 보여준다.
function flattenParagraphs(paragraphs: string[]): string[] {
  return paragraphs.flatMap((p) => p.split("\n"));
}

// 결정적인(고정된) 짧은 hex 문자열을 만들어 실제 git hash처럼 보이게 함
function fakeHash(seed: number): string {
  return (seed * 2654435761).toString(16).slice(0, 7).padStart(7, "0");
}

export default function DevGitLog() {
  const { title, paragraphs } = invitationConfig.invitationMessage;
  const lines = flattenParagraphs(paragraphs);
  const totalRows = lines.length + 2; // 맨 위 HEAD 커밋 + 맨 아래 Initial commit 포함

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // 화면에 들어오면 커밋 한 줄씩 순서대로 나타남
        for (let i = 0; i < totalRows; i++) {
          setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 280);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalRows]);

  const rowClass = (index: number) =>
    `pl-4 transition-all duration-300 ${
      index < visibleCount
        ? "translate-x-0 opacity-100"
        : "translate-x-2 opacity-0"
    }`;

  return (
    <section ref={containerRef} className="px-4 py-6 sm:px-6">
      <TerminalWindow title="git log --oneline --graph">
        <div
          className="space-y-2 text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          <div
            className={`transition-all duration-300 ${
              0 < visibleCount
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
          >
            <span style={{ color: "var(--dev-accent-yellow)" }}>*</span>{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>
              {fakeHash(lines.length + 1)}
            </span>{" "}
            <span style={{ color: "var(--dev-accent-green)" }}>
              (HEAD -&gt; main)
            </span>{" "}
            {title}
          </div>

          {lines.map((line, i) => (
            <div key={i} className={rowClass(i + 1)}>
              <span style={{ color: "var(--dev-text-dim)" }}>│</span>
              <span style={{ color: "var(--dev-accent-yellow)" }}> *</span>{" "}
              <span style={{ color: "var(--dev-accent-orange)" }}>
                {fakeHash(i)}
              </span>{" "}
              {line}
            </div>
          ))}

          <div
            className={rowClass(lines.length + 1)}
            style={{ color: "var(--dev-text-dim)" }}
          >
            │ * {fakeHash(0)} Initial commit — 두 사람, 만나다
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
}
