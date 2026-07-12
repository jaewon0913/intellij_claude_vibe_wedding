import type { Metadata } from "next";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "@fontsource/gowun-batang/400.css";
import "@fontsource/gowun-batang/700.css";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
