"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGalleryImages } from "@/lib/supabase/queries";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { GalleryImage } from "@/lib/types";
import GalleryModal from "./GalleryModal";

const COLLAPSE_THRESHOLD = 8; // 이보다 많으면 처음엔 일부만 표시
const INITIAL_COUNT = 6;

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getGalleryImages().then((data) => {
      if (!cancelled) {
        setImages(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="bg-paper px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-md text-center text-sm text-ink-light">
          사진을 불러오는 중...
        </div>
      </section>
    );
  }

  if (images.length === 0) return null;

  const shouldCollapse = images.length > COLLAPSE_THRESHOLD && !showAll;
  const visibleImages = shouldCollapse
    ? images.slice(0, INITIAL_COUNT)
    : images;

  return (
    <section className="bg-paper px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-md">
        <p className="text-center text-xs tracking-[0.35em] text-accent">
          GALLERY
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl text-ink">
          우리의 순간들
        </h2>

        <div className="mt-10 grid grid-cols-3 gap-2">
          {visibleImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="relative aspect-square overflow-hidden rounded-md bg-accent-soft"
            >
              <Image
                src={getCloudinaryUrl(image.publicId, {
                  width: 300,
                  height: 300,
                  crop: "fill",
                })}
                alt={`갤러리 사진 ${index + 1}`}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {shouldCollapse && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-xs tracking-wide text-accent underline underline-offset-4"
            >
              사진 더보기 ({images.length - INITIAL_COUNT}장)
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <GalleryModal
          images={visibleImages}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
