import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShukatsuOS — 日本一の就活管理プラットフォーム",
  description:
    "メール・ES・面接・OB訪問をAIで一元管理。手入力ゼロ、情報断片化ゼロ、不安ゼロの次世代就活OS。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0A0E1A] text-white" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
