import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { uploadImageToCloudinary } from "@/lib/cloudinary-admin";
import { supabaseAdmin } from "@/lib/supabase/admin-client";

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(secret) && session === secret;
}

export async function POST(request: NextRequest) {
  // proxy.ts에서 이미 /admin 하위 경로를 보호하지만,
  // API 라우트는 별도 요청 경로이므로 여기서도 한 번 더 확인한다 (심층 방어).
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase 서버 설정이 없습니다." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const files = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) {
    return NextResponse.json(
      { error: "업로드할 사진을 선택해주세요." },
      { status: 400 }
    );
  }

  const { data: maxRow } = await supabaseAdmin
    .from("gallery_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  let nextSortOrder = (maxRow?.sort_order ?? 0) + 1;

  const uploaded: string[] = [];
  const failed: string[] = [];

  for (const file of files) {
    try {
      const result = await uploadImageToCloudinary(file, "vibe_wedding/gallery");

      const { error } = await supabaseAdmin.from("gallery_images").insert({
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        sort_order: nextSortOrder,
        is_visible: true,
      });

      if (error) throw error;

      uploaded.push(result.public_id);
      nextSortOrder += 1;
    } catch (err) {
      console.error("갤러리 업로드 실패:", file.name, err);
      failed.push(file.name);
    }
  }

  return NextResponse.json({ uploaded, failed });
}
