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

        <p className="mt-8 text-sm text-ink-light">
          갤러리 사진 업로드/노출 관리 기능이 곧 이 화면에 추가될 예정이에요.
        </p>
      </div>
    </div>
  );
}
