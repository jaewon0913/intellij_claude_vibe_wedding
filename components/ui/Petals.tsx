"use client";

import { useMemo } from "react";

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

const PETAL_COLORS = ["#e0596b", "#e8798a", "#d64550", "#ef98a4"];
const PETAL_COUNT = 16;

function PetalShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 28" className="h-full w-full" fill={color}>
      <path d="M10 0C14 6 20 10 10 28C0 10 6 6 10 0Z" />
    </svg>
  );
}

export default function Petals() {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: PETAL_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 10,
      duration: 9 + Math.random() * 8,
      delay: Math.random() * 12,
      drift: 30 + Math.random() * 50,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
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
