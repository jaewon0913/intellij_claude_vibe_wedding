"use client";

import { useEffect, useState } from "react";

interface Piece {
  id: number;
  left: number;
  drift: number;
  duration: number;
  delay: number;
  color: string;
  char: string;
}

const COLORS = [
  "var(--dev-accent-green)",
  "var(--dev-accent-blue)",
  "var(--dev-accent-yellow)",
  "var(--dev-accent-pink)",
];
const CHARS = ["#", "{}", "0", "1", "</>", "✓"];

/**
 * "fire" prop이 true가 되는 순간 한 번(1회성) 컨페티를 터뜨리는 컴포넌트.
 * Petals와 원리는 같지만(낙하 애니메이션), 계속 떠다니지 않고 몇 초 후 사라진다.
 */
export default function DevConfetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!fire) return;

    const next = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      drift: (Math.random() - 0.5) * 160,
      duration: 1.8 + Math.random() * 1.2,
      delay: Math.random() * 0.3,
      color: COLORS[i % COLORS.length],
      char: CHARS[i % CHARS.length],
    }));
    setPieces(next);

    const timer = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(timer);
  }, [fire]);

  if (pieces.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-screen overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="dev-confetti-fall absolute top-[-5%] text-xs font-bold"
          style={
            {
              left: `${p.left}%`,
              color: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--confetti-drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
