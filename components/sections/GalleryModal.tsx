"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { GalleryImage } from "@/lib/types";

interface GalleryModalProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

export default function GalleryModal({
  images,
  initialIndex,
  onClose,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const goPrev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  // 접근성: 열릴 때 포커스를 모달로 이동하고, 이전에 포커스돼 있던
  // 트리거(썸네일) 요소를 기억해뒀다가 닫힐 때 되돌려준다.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  };

  const currentImage = images[currentIndex];

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="사진 확대 보기"
      tabIndex={-1}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 outline-none"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="닫기"
        className="absolute right-4 top-4 z-10 text-2xl text-white/80 transition hover:text-white"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="이전 사진"
        className="absolute left-2 z-10 text-3xl text-white/70 transition hover:text-white sm:left-6"
      >
        ‹
      </button>

      <div
        key={currentImage.id}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in-up relative flex h-[70vh] w-full max-w-lg flex-col items-center justify-center"
        style={{ animationDuration: "0.35s" }}
      >
        <div className="relative h-full w-full">
          <Image
            src={getCloudinaryUrl(currentImage.publicId, { width: 1080 })}
            alt={currentImage.caption ?? `갤러리 사진 ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        {currentImage.caption && (
          <p className="mt-3 text-center text-sm text-white/80">
            {currentImage.caption}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="다음 사진"
        className="absolute right-2 z-10 text-3xl text-white/70 transition hover:text-white sm:right-6"
      >
        ›
      </button>
    </div>
  );
}
