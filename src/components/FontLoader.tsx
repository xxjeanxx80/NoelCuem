"use client"

import { useEffect } from "react"

/**
 * Component đảm bảo Material Symbols font được load đúng cách
 * Inject link tag vào head để load font sớm
 */
export default function FontLoader() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Kiểm tra xem link đã tồn tại chưa
      const existingLink = document.querySelector(
        'link[href*="Material+Symbols+Outlined"]'
      )
      
      if (!existingLink) {
        // Tạo và thêm preconnect links
        const preconnect1 = document.createElement("link")
        preconnect1.rel = "preconnect"
        preconnect1.href = "https://fonts.googleapis.com"
        document.head.appendChild(preconnect1)

        const preconnect2 = document.createElement("link")
        preconnect2.rel = "preconnect"
        preconnect2.href = "https://fonts.gstatic.com"
        preconnect2.crossOrigin = "anonymous"
        document.head.appendChild(preconnect2)

        // Tạo và thêm font stylesheet
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href =
          "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        document.head.appendChild(link)
      }

      // Đảm bảo font được load
      const loadFont = async () => {
        try {
          if (document.fonts && document.fonts.check) {
            await document.fonts.load('400 24px "Material Symbols Outlined"')
          }
        } catch (error) {
          console.warn("Lỗi khi load Material Symbols font:", error)
        }
      }
      loadFont()
    }
  }, [])

  return null
}

