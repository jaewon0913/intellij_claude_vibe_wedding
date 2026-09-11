"use client";

import { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { getDDayText, formatEventDateTime } from "@/lib/date";
import TerminalWindow from "./TerminalWindow";

// 파이프라인 단계 이름과 설명. 문구는 우리 나름대로 새로 작성한 것.
const STEPS: { label: string; desc: string }[] = [
  { label: "build", desc: "두 사람의 마음을 하나로 모으는 중" },
  { label: "test", desc: "함께한 시간 동안 서로를 확인함" },
  { label: "review", desc: "양가 상견례 무사히 마침" },
  { label: "approve", desc: "양가 부모님 승인 완료" },
  { label: "deploy", desc: "결혼식, 이제부터 시작되는 하루하루" },
];

function getCountdownParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="flex flex-col items-center rounded-lg border px-3 py-2"
      style={{
        borderColor: "var(--dev-border)",
        backgroundColor: "var(--dev-bg-panel)",
      }}
    >
      <span
        className="text-xl font-bold tabular-nums sm:text-2xl"
        style={{ color: "var(--dev-accent-green)" }}
      >
        {pad(value)}
      </span>
      <span
        className="mt-0.5 text-[10px] tracking-widest"
        style={{ color: "var(--dev-text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DevDeployCard() {
  const { date, time, venueName, hallName } = invitationConfig.eventInfo;
  const dDayText = getDDayText(date);
  const { datePart, timePart } = formatEventDateTime(date, time);

  const containerRef = useRef<HTMLDivElement>(null);
  const [passedCount, setPassedCount] = useState(0);

  // 마지막(deploy=결혼식) 단계는 아직 완료된 게 아니라서 항상 진행중(RUNNING)으로 남겨둔다.
  const maxPassable = STEPS.length - 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        for (let i = 0; i < maxPassable; i++) {
          setTimeout(() => {
            setPassedCount((c) => Math.max(c, i + 1));
          }, 400 + i * 450);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const target = new Date(`${date}T${time}:00`);
  // 서버 렌더링 시점과 클라이언트 하이드레이션 시점의 "지금"이 미세하게 달라
  // 초 단위 값이 어긋나는 하이드레이션 불일치를 막기 위해, 마운트 이후에만 계산한다.
  const [countdown, setCountdown] = useState<ReturnType<
    typeof getCountdownParts
  > | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdownParts(target));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  return (
    <section ref={containerRef} className="px-4 py-6 sm:px-6">
      <TerminalWindow title="deploy --status">
        <div
          className="space-y-1.5 text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          {STEPS.map((step, i) => {
            const isDone = i < passedCount;
            const isRunning = i === passedCount; // 마지막 인덱스에서 멈춘 채 계속 RUNNING
            return (
              <p key={step.label} className="flex items-start gap-2">
                {isDone ? (
                  <span
                    className="mt-0.5"
                    style={{ color: "var(--dev-accent-green)" }}
                  >
                    ✓
                  </span>
                ) : isRunning ? (
                  <span
                    className="dev-spin mt-1 inline-block h-3 w-3 shrink-0 rounded-full border-2"
                    style={{
                      borderColor: "var(--dev-border)",
                      borderTopColor: "var(--dev-accent-yellow)",
                    }}
                  />
                ) : (
                  <span className="mt-0.5" style={{ color: "var(--dev-border)" }}>
                    ○
                  </span>
                )}
                <span
                  style={{
                    color: isDone || isRunning ? "var(--dev-text)" : "var(--dev-text-dim)",
                  }}
                >
                  <span style={{ color: "var(--dev-accent-blue)" }}>
                    {step.label}
                  </span>
                  : {step.desc}
                </span>
                <span
                  className="ml-auto shrink-0 text-[11px]"
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
                {datePart}<br/>{timePart}
              </span>
            </p>
          </div>
        </div>
      </TerminalWindow>

      <div className="mt-5 text-center">
        <p
          className="text-xs tracking-[0.25em]"
          style={{ color: "var(--dev-text-dim)" }}
        >
          DEPLOY COUNTDOWN
          {countdown && ` — D-${String(countdown.days).padStart(3, "0")}`}
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <CountdownBox value={countdown?.days ?? 0} label="DAYS" />
          <span style={{ color: "var(--dev-text-dim)" }}>:</span>
          <CountdownBox value={countdown?.hours ?? 0} label="HOURS" />
          <span style={{ color: "var(--dev-text-dim)" }}>:</span>
          <CountdownBox value={countdown?.minutes ?? 0} label="MIN" />
          <span style={{ color: "var(--dev-text-dim)" }}>:</span>
          <CountdownBox value={countdown?.seconds ?? 0} label="SEC" />
        </div>
      </div>
    </section>
  );
}
