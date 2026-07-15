"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!validUsername || !validPassword || !secret) {
    throw new Error(
      "관리자 계정이 설정되지 않았습니다. .env.local의 ADMIN_USERNAME/ADMIN_PASSWORD/ADMIN_SESSION_SECRET을 확인해주세요."
    );
  }

  if (username !== validUsername || password !== validPassword) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  redirect("/admin");
}
