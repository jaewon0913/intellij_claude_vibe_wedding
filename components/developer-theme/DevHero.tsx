"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import TerminalWindow from "./TerminalWindow";
import { useTypewriter } from "./useTypewriter";

function BranchMergeGraphic({ start }: { start: boolean }) {
  return (
    <svg
      viewBox="0 0 240 120"
      className="mx-auto mt-6 w-full max-w-[280px]"
      aria-hidden="true"
    >
      <path
        d="M20,95 C 70,95 90,55 120,55"
        fill="none"
        stroke="var(--dev-accent-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="180"
        strokeDashoffset={start ? 0 : 180}
        className={start ? "dev-draw" : ""}
      />
      <path
        d="M220,95 C 170,95 150,55 120,55"
        fill="none"
        stroke="var(--dev-accent-pink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="180"
        strokeDashoffset={start ? 0 : 180}
        className={start ? "dev-draw" : ""}
        style={{ animationDelay: "0.15s" }}
      />
      <path
        d="M120,55 L 190,55"
        fill="none"
        stroke="var(--dev-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset={start ? 0 : 80}
        className={start ? "dev-draw" : ""}
        style={{ animationDelay: "1.6s" }}
      />
      <circle cx="20" cy="95" r="4" fill="var(--dev-accent-green)" />
      <circle cx="220" cy="95" r="4" fill="var(--dev-accent-pink)" />
      <circle
        cx="190"
        cy="55"
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

  const { text: typedCommand, done: commandDone } = useTypewriter(
    `git merge ${groomName}-branch ${brideName}-branch --strategy=love`,
    { startDelay: 500, minDelay: 10, maxDelay: 22 }
  );

  const [showResult, setShowResult] = useState(false);

  return (
    <section className="px-4 pb-6 pt-8 sm:px-6">
      <TerminalWindow title="terminal — zsh">
        <p
          className="text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          <span style={{ color: "var(--dev-accent-green)" }}>$ </span>
          {typedCommand}
          {!commandDone && <span className="dev-cursor-blink">▌</span>}
        </p>

        {commandDone && (
          <div
            className="mt-2 animate-fade-in-up text-[13px] leading-relaxed sm:text-sm"
            style={{ color: "var(--dev-text-dim)" }}
            onAnimationEnd={() => setShowResult(true)}
          >
            <p>
              <span style={{ color: "var(--dev-accent-green)" }}>✓</span>{" "}
              0 conflicts — fast-forward merge complete
            </p>
            <p>두 사람이 하나의 브랜치로 합쳐졌습니다.</p>
          </div>
        )}

        <BranchMergeGraphic start={showResult} />
      </TerminalWindow>

      <div className="mt-8 text-center">
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
        <p
          className="my-1 text-sm"
          style={{ color: "var(--dev-accent-pink)" }}
        >
          &amp;&amp;
        </p>
        <h1
          className="text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--dev-text)" }}
        >
          {brideName}
        </h1>
        <p
          className="mt-4 text-xs"
          style={{ color: "var(--dev-text-dim)" }}
        >
          {eventDateText}
        </p>
      </div>
    </section>
  );
}
