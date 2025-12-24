import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Noto_Sans } from "next/font/google"
import FontLoader from "@/components/FontLoader"
import "./globals.css"

const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display" })
const body = Noto_Sans({ subsets: ["latin"], variable: "--font-body" })

export const metadata: Metadata = {
  title: "Gửi Người Thương Của Anh - Giáng Sinh 2025",
  description: "Trang quà tặng Noel dành riêng cho em Phương",
  metadataBase: new URL("https://noel-gift.vercel.app"),
  openGraph: {
    title: "Gửi Người Thương Của Anh - Giáng Sinh 2025",
    description: "Trang quà tặng Noel dành riêng cho em Phương",
    type: "website",
    images: ["/og.svg"],
    url: "https://noel-gift.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gửi Người Thương Của Anh - Giáng Sinh 2025",
    description: "Trang quà tặng Noel dành riêng cho em Phương",
    images: ["/og.svg"]
  },
  icons: {
    icon: "/favicon.svg"
  }
}

export const viewport = {
  themeColor: "#0B1026"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <body className={`min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased ${display.variable} ${body.variable} font-display overflow-x-hidden transition-colors duration-300`}>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}
