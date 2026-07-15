import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin-client";
import UploadForm from "./UploadForm";
import GalleryAdminList from "./GalleryAdminList";

// 업로드 직후 최신 목록을 바로 봐야 하므로 캐시하지 않음
export const dynamic = "force-dynamic";

interface GalleryRow {
  id: string;
  public_id: string;
  sort_order: number;
  is_visible: boolean;
}

export default async function AdminGalleryPage() {
  let images: GalleryRow[] = [];

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("gallery_images")
      .select("id, public_id, sort_order, is_visible")
      .order("sort_order", { ascending: true });
    images = data ?? [];
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">갤러리 관리</h1>
          <Link
            href="/admin"
            className="text-sm text-ink-light underline underline-offset-4"
          >
            ← 관리자 홈
          </Link>
        </div>

        <UploadForm />
        <GalleryAdminList images={images} />
      </div>
    </div>
  );
}
