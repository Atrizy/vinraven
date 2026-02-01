import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VinRaven Admin',
  description: 'Admin dashboard for VinRaven',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`bg-bg text-text antialiased ${inter.className}`}>
    {children}
    </body>
    </html>
  )
}
