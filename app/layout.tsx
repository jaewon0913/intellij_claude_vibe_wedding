import type { Metadata } from "next";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
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

// root layout은 이제 html/body와 공통 폰트/메타데이터만 담당한다.
// 480px 카드 프레임 + Petals + BGM + Toast 같은 "메인(파스텔) 테마" 전용 장치는
// app/(main)/layout.tsx로 옮겨서, developer/terminal 같은 다른 테마 라우트는
// 이 프레임의 영향을 받지 않도록 분리했다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-ink text-ink">{children}</body>
    </html>
  );
}
