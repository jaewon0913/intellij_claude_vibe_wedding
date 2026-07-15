import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

interface GalleryAdminItem {
  id: string;
  public_id: string;
  sort_order: number;
  is_visible: boolean;
}

export default function GalleryAdminList({
  images,
}: {
  images: GalleryAdminItem[];
}) {
  if (images.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-ink-light">
        아직 업로드된 사진이 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-3 gap-2">
      {images.map((img) => (
        <div key={img.id}>
          <div className="relative aspect-square overflow-hidden rounded-md bg-accent-soft">
            <Image
              src={getCloudinaryUrl(img.public_id, {
                width: 200,
                height: 200,
                crop: "fill",
              })}
              alt=""
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
          <p className="mt-1 text-center text-[11px] text-ink-light">
            #{img.sort_order} · {img.is_visible ? "노출중" : "숨김"}
          </p>
        </div>
      ))}
    </div>
  );
}
