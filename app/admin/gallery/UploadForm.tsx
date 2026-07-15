"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const files = inputRef.current?.files;

    if (!files || files.length === 0) {
      setMessage("업로드할 사진을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("photos", file));

    setIsUploading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/gallery/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error ?? "업로드에 실패했습니다.");
      } else {
        const failedCount = data.failed?.length ?? 0;
        setMessage(
          `${data.uploaded.length}장 업로드 완료${
            failedCount > 0 ? `, ${failedCount}장 실패` : ""
          }`
        );
        if (inputRef.current) inputRef.current.value = "";
        router.refresh();
      }
    } catch (err) {
      console.error("업로드 요청 실패:", err);
      setMessage("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink"
      />
      <button
        type="submit"
        disabled={isUploading}
        className="w-full rounded-lg bg-ink py-3 text-sm font-medium text-paper transition hover:opacity-90 disabled:opacity-60"
      >
        {isUploading ? "업로드 중..." : "업로드"}
      </button>
      {message && (
        <p className="text-center text-xs text-ink-light">{message}</p>
      )}
    </form>
  );
}
