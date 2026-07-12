// 캘린더 그리드 계산 + D-Day 텍스트 + 날짜 포맷 유틸
// 외부 캘린더 라이브러리 없이 직접 계산합니다.

export interface CalendarCell {
  date: number; // 1~31, 빈 칸이면 0
  isCurrentMonth: boolean;
  isEventDay: boolean;
}

/**
 * 주어진 ISO 날짜(YYYY-MM-DD)가 속한 달의 캘린더 그리드를 7일 단위 주(week) 배열로 반환.
 * 예식일 칸은 isEventDay: true로 표시됨.
 */
export function getCalendarGrid(isoDate: string): CalendarCell[][] {
  const eventDate = new Date(isoDate);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth(); // 0-indexed
  const eventDay = eventDate.getDate();

  const firstWeekday = new Date(year, month, 1).getDay(); // 0=일요일
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ date: 0, isCurrentMonth: false, isEventDay: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, isCurrentMonth: true, isEventDay: d === eventDay });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: 0, isCurrentMonth: false, isEventDay: false });
  }

  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

/** 예식 날짜의 연/월(표시용)을 반환. 예: "2026. 11" */
export function getCalendarHeaderText(isoDate: string): string {
  const date = new Date(isoDate);
  return `${date.getFullYear()}. ${date.getMonth() + 1}`;
}

/**
 * 오늘 날짜와 예식일을 비교해 D-Day 문구를 반환.
 * 클라이언트에서 useEffect로 호출해야 SSR과의 날짜 불일치를 피할 수 있음.
 */
export function getDDayText(isoDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const event = new Date(isoDate);
  event.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (event.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays > 0) return `결혼식까지 D-${diffDays}`;
  if (diffDays === 0) return "결혼식 날입니다 🎉";
  return `결혼한 지 ${Math.abs(diffDays)}일째`;
}

const WEEKDAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

/** 예: "2026년 11월 15일 일요일 오전 10시 30분" */
export function formatEventDateTime(isoDate: string, time: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = WEEKDAY_KO[date.getDay()];

  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr ?? "0", 10);

  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const minuteText = minute === 0 ? "" : ` ${minute}분`;

  return `${year}년 ${month}월 ${day}일 ${weekday}요일 ${period} ${displayHour}시${minuteText}`;
}
