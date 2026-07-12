"use client";

import { useToast } from "@/components/providers/ToastProvider";

interface CopyButtonProps {
  text: string;
  successMessage?: string;
  label?: string; // 접근성용 aria-label
  className?: string;
}

export default function CopyButton({
  text,
  successMessage = "복사되었습니다",
  label = "복사하기",
  className = "",
}: CopyButtonProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // 클립보드 API 미지원 환경(구형 브라우저 등) 대비 fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast(successMessage);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-light transition hover:bg-accent-soft hover:text-accent ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-4 w-4"
      >
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
      </svg>
    </button>
  );
}
