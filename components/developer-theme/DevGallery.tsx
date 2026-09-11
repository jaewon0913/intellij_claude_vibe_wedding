"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGalleryImages } from "@/lib/supabase/queries";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { GalleryImage } from "@/lib/types";
import TerminalWindow from "./TerminalWindow";
import Reveal from "@/components/ui/Reveal";
import GalleryModal from "@/components/sections/GalleryModal";

export default function DevGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading || images.length === 0) return null;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <TerminalWindow title="ls -la ./photos">
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="text-left"
              >
                <div
                  className="relative aspect-square overflow-hidden rounded border"
                  style={{ borderColor: "var(--dev-border)" }}
                >
                  <Image
                    src={getCloudinaryUrl(image.publicId, {
                      width: 240,
                      height: 240,
                      crop: "fill",
                    })}
                    alt={`사진 ${index + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
                <p
                  className="mt-1 truncate text-center text-[10px]"
                  style={{ color: "var(--dev-text-dim)" }}
                >
                  photo_{String(index + 1).padStart(2, "0")}.jpg
                </p>
              </button>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>

      {selectedIndex !== null && (
        <GalleryModal
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
