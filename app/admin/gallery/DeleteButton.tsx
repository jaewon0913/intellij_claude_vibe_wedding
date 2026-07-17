"use client";

import { useTransition } from "react";
import { deleteGalleryImage } from "./actions";

export default function DeleteButton({
  id,
  publicId,
}: {
  id: string;
  publicId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const confirmed = window.confirm(
      "이 사진을 삭제할까요? Cloudinary 원본도 함께 삭제되며 되돌릴 수 없습니다."
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteGalleryImage(id, publicId);
      } catch (err) {
        console.error("사진 삭제 실패:", err);
        window.alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="mt-1 w-full rounded-full bg-red-50 py-1 text-[11px] text-red-500 transition hover:bg-red-100 disabled:opacity-50"
    >
      {isPending ? "삭제 중..." : "삭제"}
    </button>
  );
}
