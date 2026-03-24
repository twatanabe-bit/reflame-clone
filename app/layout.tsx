import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star Interview Avatar | 芸能人AI面接官",
  description:
    "芸能人の価値観・話し方を再現したAIアバターが、27卒就活生の面接力を鍛え上げる。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
