"use client";

import { useState, useTransition } from "react";
import { toggleGalleryVisibility } from "./actions";

export default function VisibilityToggle({
  id,
  initialVisible,
}: {
  id: string;
  initialVisible: boolean;
}) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const next = !isVisible;
    setIsVisible(next); // 낙관적 업데이트

    startTransition(async () => {
      try {
        await toggleGalleryVisibility(id, next);
      } catch (err) {
        console.error("노출 상태 변경 실패:", err);
        setIsVisible(!next); // 실패 시 원상 복구
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`mt-1 w-full rounded-full py-1 text-[11px] transition disabled:opacity-50 ${
        isVisible
          ? "bg-accent-soft text-accent"
          : "bg-line/60 text-ink-light"
      }`}
    >
      {isVisible ? "노출중" : "숨김"}
    </button>
  );
}
