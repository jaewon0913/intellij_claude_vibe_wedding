"use client";

import { useEffect, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import TerminalWindow from "./TerminalWindow";

type TermLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; color?: string };

function BranchMergeGraphic({ start }: { start: boolean }) {
  return (
    <svg
      viewBox="0 0 240 120"
      className="mx-auto mt-6 w-full max-w-[280px]"
      aria-hidden="true"
    >
      {/* 위쪽(초록)과 아래쪽(핑크) 두 브랜치가 모두 왼쪽에서 시작해서
          가운데에서 한 줄로 합류한 뒤 오른쪽 끝 점까지 이어짐 */}
      <path
        d="M20,25 C 70,25 90,55 110,60"
        fill="none"
        stroke="var(--dev-accent-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={start ? 0 : 120}
        className={start ? "dev-draw" : ""}
      />
      <path
        d="M20,95 C 70,95 90,65 110,60"
        fill="none"
        stroke="var(--dev-accent-pink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="120"
        strokeDashoffset={start ? 0 : 120}
        className={start ? "dev-draw" : ""}
        style={{ animationDelay: "0.15s" }}
      />
      <path
        d="M110,60 L 210,60"
        fill="none"
        stroke="var(--dev-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={start ? 0 : 100}
        className={start ? "dev-draw" : ""}
        style={{ animationDelay: "1.6s" }}
      />
      <circle cx="20" cy="25" r="4" fill="var(--dev-accent-green)" />
      <circle cx="20" cy="95" r="4" fill="var(--dev-accent-pink)" />
      <circle
        cx="210"
        cy="60"
        r="4"
        fill="var(--dev-text)"
        opacity={start ? 1 : 0}
        style={{ transition: "opacity 0.4s ease 2s" }}
      />
    </svg>
  );
}

export default function DevHero() {
  const { groomName, brideName, eventDateText } = invitationConfig.hero;
  const { venueName, hallName } = invitationConfig.eventInfo;
  const { address, transitInfo } = invitationConfig.location;

  // 화면에 순서대로 타이핑되는 터미널 대사. 문구는 전부 새로 작성한 것.
  const lines: TermLine[] = [
    { type: "cmd", text: "git checkout -b together" },
    { type: "out", text: "Switched to a new branch 'together'" },
    {
      type: "cmd",
      text: `git merge ${groomName}-life ${brideName}-life --strategy=forever`,
    },
    { type: "out", text: "Merging two hearts..." },
    {
      type: "out",
      text: "✓ no conflicts — merged happily",
      color: "var(--dev-accent-green)",
    },
    {
      type: "out",
      text: "Fast-forward complete. Two lives, one future.",
      color: "var(--dev-accent-yellow)",
    },
    { type: "cmd", text: "cat invitation.md" },
    {
      type: "out",
      text: "평생을 함께 걷겠습니다. 축복해 주세요 🤍",
      color: "var(--dev-accent-pink)",
    },
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const allDone = lineIndex >= lines.length;
  const currentLine = lines[lineIndex];

  useEffect(() => {
    if (allDone) return;

    if (currentLine.type === "out") {
      const timer = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharCount(0);
      }, 320);
      return () => clearTimeout(timer);
    }

    // 명령줄: 한 글자씩 타이핑
    if (charCount < currentLine.text.length) {
      const delay = 14 + Math.random() * 24;
      const timer = setTimeout(() => setCharCount((c) => c + 1), delay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, 260);
    return () => clearTimeout(timer);
  }, [allDone, currentLine, charCount]);

  // 타이핑 진행 중에 창 크기가 계속 커졌다 줄었다 하지 않도록,
  // 전체 줄이 다 찍혔을 때 기준으로 높이를 미리 확보해둔다.
  const reservedHeight = (lines.length + 1) * 25;

  return (
    <section className="px-4 pb-6 pt-8 sm:px-6">
      <TerminalWindow title="guest@wedding terminal — zsh">
        <div
          className="space-y-1 text-[13px] leading-relaxed sm:text-sm"
          style={{ minHeight: reservedHeight }}
        >
          {lines.slice(0, lineIndex).map((line, i) => (
            <p
              key={i}
              style={{
                color:
                  line.type === "cmd"
                    ? "var(--dev-text)"
                    : (line.color ?? "var(--dev-text-dim)"),
              }}
            >
              {line.type === "cmd" && (
                <span style={{ color: "var(--dev-accent-green)" }}>$ </span>
              )}
              {line.text}
            </p>
          ))}

          {!allDone && currentLine.type === "cmd" && (
            <p style={{ color: "var(--dev-text)" }}>
              <span style={{ color: "var(--dev-accent-green)" }}>$ </span>
              {currentLine.text.slice(0, charCount)}
              <span className="dev-cursor-blink">▌</span>
            </p>
          )}

          {allDone && (
            <p style={{ color: "var(--dev-text)" }}>
              <span style={{ color: "var(--dev-accent-green)" }}>$ </span>
              <span className="dev-cursor-blink">▌</span>
            </p>
          )}
        </div>
      </TerminalWindow>

      <BranchMergeGraphic start={allDone} />

      <div className="mt-4 text-center">
        <p
          className="text-xs tracking-[0.3em]"
          style={{ color: "var(--dev-text-dim)" }}
        >
          WEDDING · RELEASE v1.0.0
        </p>
        <h1
          className="mt-4 text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--dev-text)" }}
        >
          {groomName}
        </h1>
        <p className="my-1 text-sm" style={{ color: "var(--dev-accent-pink)" }}>
          &amp;&amp;
        </p>
        <h1
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--dev-text)" }}
        >
          {brideName}
        </h1>
        <p
          className="mt-4 text-sm font-bold tracking-wide"
          style={{ color: "var(--dev-accent-yellow)" }}
        >
          {eventDateText}
        </p>
      </div>

      <div
        className="mx-auto mt-6 max-w-[320px] rounded-xl border p-5 text-center"
        style={{
          borderColor: "var(--dev-accent-pink)",
          backgroundColor: "var(--dev-bg-panel)",
        }}
      >
        <p
          className="text-xs tracking-[0.3em]"
          style={{ color: "var(--dev-accent-pink)" }}
        >
          LOCATION
        </p>
        <p
          className="mt-3 text-lg font-bold"
          style={{ color: "var(--dev-text)" }}
        >
          {venueName}{" "}
          <span
            className="text-sm font-normal"
            style={{ color: "var(--dev-accent-green)" }}
          >
            {hallName}
          </span>
        </p>
        <p className="mt-2 text-xs" style={{ color: "var(--dev-text-dim)" }}>
          {address}
        </p>
        {transitInfo?.[0] && (
          <p className="mt-1 text-xs" style={{ color: "var(--dev-accent-orange)" }}>
            {transitInfo[0]}
          </p>
        )}
      </div>
    </section>
  );
}
