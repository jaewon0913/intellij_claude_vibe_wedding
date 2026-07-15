import Link from "next/link";
import { logout } from "./actions";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">관리자</h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-ink-light underline underline-offset-4"
            >
              로그아웃
            </button>
          </form>
        </div>

        <Link
          href="/admin/gallery"
          className="mt-8 block rounded-xl border border-line px-4 py-3 text-sm text-ink transition hover:border-accent hover:text-accent"
        >
          갤러리 사진 관리 →
        </Link>
      </div>
    </div>
  );
}
