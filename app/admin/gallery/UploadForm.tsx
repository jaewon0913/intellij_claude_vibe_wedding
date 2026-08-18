"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { compressImageIfNeeded } from "@/lib/image-compress";

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

    const fileList = Array.from(files);
    setIsUploading(true);
    setMessage(null);

    let uploadedCount = 0;
    let failedCount = 0;

    // 여러 장을 한 요청에 묶으면 압축해도 합산 용량이 Vercel 함수의
    // 요청 본문 한도(4.5MB)를 넘을 수 있어서, 한 장씩 순차로 업로드한다.
    for (let i = 0; i < fileList.length; i++) {
      const originalFile = fileList[i];
      setMessage(`업로드 중... (${i + 1}/${fileList.length})`);

      try {
        const fileToUpload = await compressImageIfNeeded(originalFile);

        const formData = new FormData();
        formData.append("photos", fileToUpload);

        const res = await fetch("/api/admin/gallery/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (!res.ok || (data.failed && data.failed.length > 0)) {
          failedCount += 1;
        } else {
          uploadedCount += 1;
        }
      } catch (err) {
        console.error("업로드 실패:", originalFile.name, err);
        failedCount += 1;
      }
    }

    setMessage(
      `${uploadedCount}장 업로드 완료${
        failedCount > 0 ? `, ${failedCount}장 실패` : ""
      }`
    );
    if (inputRef.current) inputRef.current.value = "";
    setIsUploading(false);
    router.refresh();
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
      <p className="text-center text-[11px] text-ink-light">
        4MB가 넘는 사진은 자동으로 리사이즈/압축돼서 업로드됩니다.
      </p>
    </form>
  );
}
