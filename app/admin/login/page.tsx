import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6">
      <div className="w-full max-w-xs">
        <h1 className="text-center font-serif text-2xl text-ink">
          관리자 로그인
        </h1>

        <form action={login} className="mt-8 space-y-3">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            required
            autoComplete="username"
            className="w-full rounded-lg border border-line px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-line px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-ink py-3 text-sm font-medium text-paper transition hover:opacity-90"
          >
            로그인
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">
            아이디 또는 비밀번호가 올바르지 않습니다.
          </p>
        )}
      </div>
    </div>
  );
}
