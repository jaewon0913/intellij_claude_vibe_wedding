"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin-client";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

async function assertAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || session !== secret) {
    throw new Error("인증이 필요합니다.");
  }
}

export async function setPetalsEnabled(enabled: boolean) {
  await assertAuthorized();

  if (!supabaseAdmin) {
    throw new Error("Supabase 서버 설정이 없습니다.");
  }

  const { error } = await supabaseAdmin
    .from("site_settings")
    .update({ petals_enabled: enabled })
    .eq("id", 1);

  if (error) {
    throw new Error(error.message);
  }

  // 루트 레이아웃(전체 페이지)이 이 값을 읽으므로 "/"를 갱신하면 바로 반영됨
  revalidatePath("/");
  revalidatePath("/admin");
}
