"use client";

import { useTransition } from "react";
import { moveGalleryImage } from "./actions";

export default function ReorderButtons({
  id,
  isFirst,
  isLast,
}: {
  id: string;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const move = (direction: "up" | "down") => {
    startTransition(async () => {
      try {
        await moveGalleryImage(id, direction);
      } catch (err) {
        console.error("순서 변경 실패:", err);
      }
    });
  };

  return (
    <div className="mt-1 flex gap-1">
      <button
        type="button"
        onClick={() => move("up")}
        disabled={isFirst || isPending}
        aria-label="위로 이동"
        className="flex-1 rounded bg-line/40 py-1 text-[11px] text-ink-light transition disabled:opacity-30"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={() => move("down")}
        disabled={isLast || isPending}
        aria-label="아래로 이동"
        className="flex-1 rounded bg-line/40 py-1 text-[11px] text-ink-light transition disabled:opacity-30"
      >
        ↓
      </button>
    </div>
  );
}
