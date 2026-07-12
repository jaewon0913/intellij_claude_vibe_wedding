import { supabase, isSupabaseConfigured } from "./client";
import type { GalleryImage } from "@/lib/types";

// Supabase 키가 아직 .env.local에 없을 때 레이아웃 확인용으로 쓰는 샘플 데이터.
// 실제 gallery_images 테이블 연결 전까지 Gallery 섹션이 비어 보이지 않도록 하는 용도.
const SAMPLE_GALLERY_IMAGES: GalleryImage[] = Array.from({ length: 6 }).map(
  (_, i) => ({
    id: `sample-${i}`,
    publicId: "wedding/hero_main",
    sortOrder: i,
  })
);

/**
 * Supabase gallery_images 테이블에서 is_visible=true인 이미지를
 * sort_order 순으로 가져온다. 아직 Supabase가 설정되지 않았다면
 * 샘플 데이터를 반환해 개발 중 레이아웃을 확인할 수 있게 한다.
 *
 * 스키마: supabase/migrations/0001_create_gallery_images.sql 참고
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured || !supabase) {
    return SAMPLE_GALLERY_IMAGES;
  }

  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, public_id, sort_order, caption, width, height, category")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true }); // sort_order 동률일 때 보조 정렬

  if (error || !data) {
    console.error("갤러리 이미지 조회 실패, 샘플 데이터로 대체합니다:", error);
    return SAMPLE_GALLERY_IMAGES;
  }

  return data.map((row) => ({
    id: String(row.id),
    publicId: row.public_id as string,
    sortOrder: row.sort_order as number,
    caption: (row.caption as string | null) ?? undefined,
    width: (row.width as number | null) ?? undefined,
    height: (row.height as number | null) ?? undefined,
    category: (row.category as string | null) ?? undefined,
  }));
}

