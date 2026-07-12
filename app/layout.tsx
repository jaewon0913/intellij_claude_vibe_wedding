import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

// 제목/Hero용 세리프 폰트 (기획서 9.2 참고)
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// 본문/UI용 산세리프 폰트
// Pretendard를 쓰고 싶다면 추후 public/fonts에 로컬 폰트로 추가하고
// 이 부분을 next/font/local로 교체하면 됩니다.
const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "재원 ❤ 선영 결혼합니다",
  description: "저희 두 사람의 결혼식에 초대합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKR.variable} ${notoSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
