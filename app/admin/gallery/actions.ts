"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin-client";

async function assertAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || session !== secret) {
    throw new Error("인증이 필요합니다.");
  }
}

export async function toggleGalleryVisibility(
  id: string,
  nextVisible: boolean
) {
  await assertAuthorized();

  if (!supabaseAdmin) {
    throw new Error("Supabase 서버 설정이 없습니다.");
  }

  const { error } = await supabaseAdmin
    .from("gallery_images")
    .update({ is_visible: nextVisible })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/"); // 공개 청첩장 갤러리도 즉시 반영
}
