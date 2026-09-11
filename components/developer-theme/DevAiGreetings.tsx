"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import TerminalWindow from "./TerminalWindow";

// 축하 문구는 각 AI의 특징을 살려 새로 쓴 것 (원본 사이트 문구 아님)
const AGENTS = [
  {
    name: "Claude",
    icon: "/images/ai/claude-color.svg",
    quote: "신중하게, 그리고 다정하게 — 오래오래 행복하세요.",
  },
  {
    name: "Codex",
    icon: "/images/ai/openai.svg",
    quote: "이 관계엔 버그가 없습니다. 전부 의도된 feature였네요.",
  },
  {
    name: "Gemini",
    icon: "/images/ai/gemini-color.svg",
    quote: "여러 모습을 하나로 담아내듯, 두 분도 하나가 되시길.",
  },
  {
    name: "DeepSeek",
    icon: "/images/ai/deepseek-color.svg",
    quote: "깊이 탐구할수록 더 단단해지는 사랑이길 바랍니다.",
  },
  {
    name: "Copilot",
    icon: "/images/ai/copilot.svg",
    quote: "제안은 제가 해도, 선택은 늘 두 분의 몫이었죠. 축하합니다.",
  },
  {
    name: "Llama",
    icon: "/images/ai/meta-color.svg",
    quote: "오픈소스처럼, 이 행복도 주변에 널리 나눠지길.",
  },
  {
    name: "Grok",
    icon: "/images/ai/grok.svg",
    quote: "우주의 물리 법칙도 이 케미는 못 이깁니다.",
  },
];

const ROTATE_INTERVAL_MS = 4000;

export default function DevAiGreetings() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % AGENTS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const active = AGENTS[activeIndex];

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
          {"// section: greetings — agents.log"}
        </p>

        <div className="mt-4">
          <TerminalWindow title="$ tail -f agents.log">
            <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
              {"// 축하 메시지 여러 건이 도착했습니다"}
            </p>

            <div className="mt-4 grid grid-cols-4 gap-y-4 sm:grid-cols-7">
              {AGENTS.map((agent, i) => (
                <button
                  key={agent.name}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center gap-1.5 transition"
                  style={{ opacity: i === activeIndex ? 1 : 0.55 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.icon}
                    alt={agent.name}
                    className="h-8 w-8"
                    style={{
                      filter:
                        i === activeIndex
                          ? "none"
                          : "grayscale(40%) brightness(0.8)",
                    }}
                  />
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--dev-text-dim)" }}
                  >
                    {agent.name}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="mt-5 rounded-lg border p-4 text-center"
              style={{
                borderColor: "var(--dev-border)",
                backgroundColor: "var(--dev-bg-panel-2)",
              }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--dev-accent-blue)" }}
              >
                {active.name}
              </p>
              <p
                className="mt-1.5 text-[13px] leading-relaxed sm:text-sm"
                style={{ color: "var(--dev-text)" }}
              >
                &quot;{active.quote}&quot;
              </p>
            </div>
          </TerminalWindow>
        </div>
      </Reveal>
    </section>
  );
}
