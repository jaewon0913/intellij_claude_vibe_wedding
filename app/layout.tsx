import type { Metadata } from "next";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import Petals from "@/components/ui/Petals";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-ink text-ink">
        {/* transform을 줘서 이 div를 fixed 자식들(Petals/Toast/모달)의
            containing block으로 만듦 → 데스크탑에서도 480px 카드 안에서만 떠다님 */}
        <div
          className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-paper shadow-2xl"
          style={{ transform: "translateZ(0)" }}
        >
          <Petals />
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
