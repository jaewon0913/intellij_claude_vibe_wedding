"use client";

import { useEffect, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import Reveal from "@/components/ui/Reveal";
import {
  getCalendarGrid,
  getCalendarHeaderText,
  getDDayText,
  formatEventDateTime,
} from "@/lib/date";

const WEEKDAY_HEADERS = ["일", "월", "화", "수", "목", "금", "토"];

export default function EventInfo() {
  const { date, time, venueName, hallName } = invitationConfig.eventInfo;

  // D-Day는 클라이언트 "오늘"을 기준으로 계산해야 하므로
  // SSR과의 불일치를 피하기 위해 useEffect에서 채운다.
  const [ddayText, setDdayText] = useState<string | null>(null);

  useEffect(() => {
    setDdayText(getDDayText(date));
  }, [date]);

  const weeks = getCalendarGrid(date);
  const headerText = getCalendarHeaderText(date);
  const dateTimeText = formatEventDateTime(date, time);

  const scrollToLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("location")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-paper px-6 py-12 sm:px-10">
      <Reveal className="mx-auto max-w-md text-center">
        <p className="text-xs tracking-[0.35em] text-accent">WHEN</p>

        {/* D-Day 카운터: 초기 렌더에서는 빈 자리만 잡아두어 레이아웃 시프트 방지 */}
        <p className="mt-4 min-h-[1.25rem] text-sm font-medium text-ink-light">
          {ddayText ?? "\u00A0"}
        </p>

        {/* 미니 캘린더 */}
        <div className="mx-auto mt-8 max-w-[280px] rounded-2xl border border-line bg-white/50 p-5">
          <p className="mb-4 text-xs tracking-widest text-ink-light">
            {headerText}
          </p>
          <div className="grid grid-cols-7 gap-y-2">
            {WEEKDAY_HEADERS.map((w) => (
              <div
                key={w}
                className="text-[11px] font-medium text-ink-light"
              >
                {w}
              </div>
            ))}
            {weeks.flat().map((cell, i) => (
              <div key={i} className="flex items-center justify-center py-0.5">
                {cell.isCurrentMonth ? (
                  <span
                    className={
                      cell.isEventDay
                        ? "flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs text-white"
                        : "flex h-7 w-7 items-center justify-center text-xs text-ink"
                    }
                  >
                    {cell.date}
                  </span>
                ) : (
                  <span className="h-7 w-7" />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
          {dateTimeText}
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-sm text-ink-light">
            {venueName} · {hallName}
          </p>
          <a
            href="#location"
            onClick={scrollToLocation}
            className="mt-3 inline-block text-xs tracking-wide text-accent underline underline-offset-4"
          >
            오시는 길 보기 ↓
          </a>
        </div>
      </Reveal>
    </section>
  );
}
