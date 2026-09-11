import { ToastProvider } from "@/components/providers/ToastProvider";
import DevNav from "@/components/developer-theme/DevNav";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";

// developer 테마는 메인 테마의 480px 흰 카드 프레임(app/(main)/layout.tsx)을 쓰지 않고,
// 다크 IDE 톤의 전체 화면 레이아웃을 새로 구성한다.
export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-dev-theme="dark"
      className="mx-auto min-h-screen w-full max-w-2xl"
      style={{
        backgroundColor: "var(--dev-bg)",
        color: "var(--dev-text)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <ToastProvider>
        <DevNav />
        {children}
      </ToastProvider>
    </div>
  );
}
