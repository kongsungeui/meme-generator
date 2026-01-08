import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ImgFlip Meme Generator',
  description: 'ImgFlip API를 사용하여 밈(Meme)을 생성하는 웹 애플리케이션입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="flex items-center justify-center">{children}</body>
    </html>
  )
}
