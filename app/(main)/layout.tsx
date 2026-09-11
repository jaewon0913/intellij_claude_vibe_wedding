import { ToastProvider } from "@/components/providers/ToastProvider";
import { getSiteSettings } from "@/lib/supabase/queries";
import Petals from "@/components/ui/Petals";
import BgmPlayer from "@/components/ui/BgmPlayer";

// 메인(파스텔) 테마 전용 레이아웃: 480px 모바일 카드 프레임 + 꽃잎 + BGM + Toast.
// developer/terminal 같은 다른 테마는 이 프레임을 쓰지 않으므로 root layout이 아니라
// 이 라우트 그룹((main))에만 적용되도록 분리했다.
export default async function MainThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { petalsEnabled } = await getSiteSettings();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-paper shadow-2xl">
      {petalsEnabled && <Petals />}
      <BgmPlayer />
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
