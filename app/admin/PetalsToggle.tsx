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
        style={{
          position: "relative",
          flexShrink: 0,
          width: 48,
          height: 28,
          borderRadius: 9999,
          backgroundColor: enabled ? "var(--color-accent)" : "var(--color-line)",
          transition: "background-color 0.2s ease",
          opacity: isPending ? 0.5 : 1,
          border: "none",
          padding: 0,
          cursor: isPending ? "default" : "pointer",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: enabled ? 22 : 2,
            width: 24,
            height: 24,
            borderRadius: 9999,
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
            transition: "left 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}
