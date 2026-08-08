"use client";

import { useEffect, useState } from "react";

// 화면 전체에 떠다니는 장식용 꽃잎 오버레이.
// pointer-events-none이라 클릭/스크롤을 전혀 방해하지 않음.

interface PetalConfig {
  id: number;
  left: number; // %
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px, 좌우로 흔들리는 정도
  color: string;
}

// 선명한 빨강/핑크 계열
const PETAL_COLORS = ["#e0596b", "#e8798a", "#d64550", "#ef98a4"];
const PETAL_COUNT = 12;

function createPetals(): PetalConfig[] {
  return Array.from({ length: PETAL_COUNT }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 9 + Math.random() * 8,
    duration: 10 + Math.random() * 9,
    delay: Math.random() * 14,
    drift: 25 + Math.random() * 45,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
  }));
}

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 28" className="h-full w-full" fill={color}>
      {/* 더 둥글고 부드러운 실루엣의 꽃잎 */}
      <path d="M10 2C15 2 18 9 15 16C13 21 10 26 10 26C10 26 7 21 5 16C2 9 5 2 10 2Z" />
    </svg>
  );
}

export default function Petals() {
  // Math.random()을 서버 렌더링 시점에 쓰면 클라이언트와 값이 달라져
  // 하이드레이션 불일치가 나므로, 마운트 이후(useEffect)에만 생성한다.
  // 서버/최초 클라이언트 렌더는 둘 다 빈 배열이라 완전히 일치함.
  const [petals, setPetals] = useState<PetalConfig[]>([]);

  useEffect(() => {
    setPetals(createPetals());
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-0 z-40 h-screen w-full max-w-[480px] -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal-fall absolute top-[-10%]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--petal-drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          <PetalShape color={p.color} />
        </span>
      ))}
    </div>
  );
}
