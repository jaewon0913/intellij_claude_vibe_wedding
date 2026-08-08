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

export interface SiteSettings {
  petalsEnabled: boolean;
}

const DEFAULT_SITE_SETTINGS: SiteSettings = { petalsEnabled: true };

/**
 * Supabase site_settings 테이블(항상 id=1인 단일 행)에서 사이트 전역 설정을 가져온다.
 * Supabase 미설정/에러 시에는 기본값(꽃잎 켜짐)으로 대체한다.
 *
 * 스키마: supabase/migrations/0002_create_site_settings.sql 참고
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_SITE_SETTINGS;
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("petals_enabled")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    console.error("사이트 설정 조회 실패, 기본값으로 대체합니다:", error);
    return DEFAULT_SITE_SETTINGS;
  }

  return { petalsEnabled: data.petals_enabled as boolean };
}

