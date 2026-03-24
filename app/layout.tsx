import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShukatsuOS — 就活管理プラットフォーム",
  description:
    "メール・ES・面接・OB訪問をAIで一元管理。手入力ゼロ、情報断片化ゼロの次世代就活OS。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col bg-white text-slate-900"
        style={{
          fontFamily:
            "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
