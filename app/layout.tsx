import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "キャリアクエスト | MBTI×RPG 就活キャリア診断",
  description: "12問の質問に答えるだけで、MBTIに基づく16タイプの職業適性をRPG風に診断。あなたのステータス・得意武器・伝説の相棒まで丸わかり。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
