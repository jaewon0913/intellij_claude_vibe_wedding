import type { Metadata } from "next";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { getSiteSettings } from "@/lib/supabase/queries";
import Petals from "@/components/ui/Petals";
import BgmPlayer from "@/components/ui/BgmPlayer";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "@fontsource/gowun-batang/400.css";
import "@fontsource/gowun-batang/700.css";
import "./globals.css";

const { meta, hero } = invitationConfig;

// 카카오톡 인앱 브라우저 호환을 위해 og:image는 반드시 절대경로(https://...) URL이어야 함
const ogImageUrl = getCloudinaryUrl(hero.backgroundImagePublicId, {
  width: 1200,
  height: 630,
  crop: "fill",
  gravity: "auto",
});

export const metadata: Metadata = {
  title: meta.siteTitle,
  description: meta.siteDescription,
  metadataBase: new URL(meta.siteUrl),
  openGraph: {
    title: meta.siteTitle,
    description: meta.siteDescription,
    url: meta.siteUrl,
    siteName: meta.siteTitle,
    images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    type: "website",
    locale: "ko_KR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 재배포 없이 관리자 페이지에서 즉시 켜고 끌 수 있도록, 매 요청마다 최신 설정을 읽는다.
  const { petalsEnabled } = await getSiteSettings();

  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-ink text-ink">
        <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-paper shadow-2xl">
          {petalsEnabled && <Petals />}
          <BgmPlayer />
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
