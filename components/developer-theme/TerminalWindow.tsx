// 에디터/터미널 창처럼 보이게 하는 공통 "크롬"(제목표시줄 + 신호등 버튼) 래퍼.
// developer 테마의 여러 섹션이 이 안에 콘텐츠를 담아 카드 형태로 보여준다.

export default function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        borderColor: "var(--dev-border)",
        backgroundColor: "var(--dev-bg-panel)",
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderColor: "var(--dev-border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span
          className="ml-2 truncate text-xs"
          style={{ color: "var(--dev-text-dim)" }}
        >
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
