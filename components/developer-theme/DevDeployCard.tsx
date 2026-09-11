"use client";

import { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { getDDayText, formatEventDateTime } from "@/lib/date";
import TerminalWindow from "./TerminalWindow";
import DevConfetti from "./DevConfetti";

const STEPS = ["Build", "Vows written", "Rings ready", "Married"];

export default function DevDeployCard() {
  const { date, time, venueName, hallName } = invitationConfig.eventInfo;
  const dDayText = getDDayText(date);
  const { datePart, timePart } = formatEventDateTime(date, time);

  const containerRef = useRef<HTMLDivElement>(null);
  const [passedCount, setPassedCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        STEPS.forEach((_, i) => {
          setTimeout(() => {
            setPassedCount((c) => Math.max(c, i + 1));
            if (i === STEPS.length - 1) {
              setTimeout(() => setCelebrate(true), 200);
            }
          }, 400 + i * 450);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="px-4 py-6 sm:px-6">
      <DevConfetti fire={celebrate} />

      <TerminalWindow title="deploy --status">
        <div
          className="space-y-1.5 text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          {STEPS.map((step, i) => {
            const isDone = i < passedCount;
            const isRunning = i === passedCount && i < STEPS.length;
            return (
              <p key={step} className="flex items-center gap-2">
                {isDone ? (
                  <span style={{ color: "var(--dev-accent-green)" }}>✓</span>
                ) : isRunning ? (
                  <span
                    className="dev-spin inline-block h-3 w-3 rounded-full border-2"
                    style={{
                      borderColor: "var(--dev-border)",
                      borderTopColor: "var(--dev-accent-yellow)",
                    }}
                  />
                ) : (
                  <span style={{ color: "var(--dev-border)" }}>○</span>
                )}
                <span
                  style={{
                    color: isDone ? "var(--dev-text)" : "var(--dev-text-dim)",
                  }}
                >
                  {step}
                </span>
                <span
                  className="ml-auto text-[11px]"
                  style={{
                    color: isDone
                      ? "var(--dev-accent-green)"
                      : isRunning
                        ? "var(--dev-accent-yellow)"
                        : "var(--dev-border)",
                  }}
                >
                  {isDone ? "PASSED" : isRunning ? "RUNNING" : "PENDING"}
                </span>
              </p>
            );
          })}

          <div
            className="mt-3 border-t pt-3"
            style={{ borderColor: "var(--dev-border)" }}
          >
            <p className="pl-1">
              environment:{" "}
              <span style={{ color: "var(--dev-accent-blue)" }}>
                production
              </span>
            </p>
            <p className="pl-1">
              target:{" "}
              <span style={{ color: "var(--dev-accent-orange)" }}>
                {venueName} · {hallName}
              </span>
            </p>
            <p className="pl-1">
              scheduled_at:{" "}
              <span style={{ color: "var(--dev-accent-orange)" }}>
                {datePart} {timePart}
              </span>
            </p>
          </div>

          <p
            className="mt-3 rounded px-3 py-2 text-xs"
            style={{
              backgroundColor: "var(--dev-bg-panel-2)",
              color: "var(--dev-accent-yellow)",
            }}
          >
            {"// "}
            {dDayText}
          </p>
        </div>
      </TerminalWindow>
    </section>
  );
}
