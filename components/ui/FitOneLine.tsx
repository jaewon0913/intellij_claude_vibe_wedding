"use client";

import { useEffect, useRef, useState } from "react";

// 화면 폭이 좁아서 줄바꿈이 일어날 것 같으면, 줄바꿈 대신 텍스트 전체를
// 한 줄에 맞게 비율만큼 축소해서 보여주는 래퍼.
// (실제 font-size를 바꾸는 대신 transform: scale()을 써서 매번 다시
//  측정할 필요 없이 리사이즈 시에도 빠르고 부드럽게 반응함)
export default function FitOneLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const recalculate = () => {
      // 원래 너비 기준으로 다시 재려면 일단 배율을 1로 리셋해야 함
      text.style.transform = "scale(1)";
      const containerWidth = container.clientWidth;
      const textWidth = text.scrollWidth;

      if (textWidth > containerWidth && containerWidth > 0) {
        setScale(containerWidth / textWidth);
      } else {
        setScale(1);
      }
    };

    recalculate();

    const resizeObserver = new ResizeObserver(recalculate);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </span>
    </div>
  );
}
