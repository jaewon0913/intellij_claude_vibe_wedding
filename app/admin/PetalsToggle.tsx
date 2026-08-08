"use client";

import { useState, useTransition } from "react";
import { setPetalsEnabled } from "./actions";

export default function PetalsToggle({
  initialEnabled,
}: {
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const next = !enabled;
    setEnabled(next); // 낙관적 업데이트

    startTransition(async () => {
      try {
        await setPetalsEnabled(next);
      } catch (err) {
        console.error("꽃잎 효과 설정 변경 실패:", err);
        setEnabled(!next); // 실패 시 원상 복구
      }
    });
  };

  return (
    <div className="mt-4 flex items-center justify-between rounded-xl border border-line px-4 py-3">
      <div>
        <p className="text-sm text-ink">흩날리는 꽃잎 효과</p>
        <p className="text-xs text-ink-light">
          재배포 없이 즉시 켜고 끌 수 있어요
        </p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={enabled}
        aria-label="꽃잎 효과 켜기/끄기"
        className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
          enabled ? "bg-accent" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
