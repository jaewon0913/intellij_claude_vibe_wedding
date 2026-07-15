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

export async function moveGalleryImage(id: string, direction: "up" | "down") {
  await assertAuthorized();

  if (!supabaseAdmin) {
    throw new Error("Supabase 서버 설정이 없습니다.");
  }

  const { data: rows, error } = await supabaseAdmin
    .from("gallery_images")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });

  if (error || !rows) {
    throw new Error(error?.message ?? "목록을 불러오지 못했습니다.");
  }

  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) return;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= rows.length) return; // 맨 위/아래에서는 아무것도 하지 않음

  const current = rows[index];
  const target = rows[targetIndex];

  // 두 항목의 sort_order를 서로 교환
  const { error: err1 } = await supabaseAdmin
    .from("gallery_images")
    .update({ sort_order: target.sort_order })
    .eq("id", current.id);
  if (err1) throw new Error(err1.message);

  const { error: err2 } = await supabaseAdmin
    .from("gallery_images")
    .update({ sort_order: current.sort_order })
    .eq("id", target.id);
  if (err2) throw new Error(err2.message);

  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
