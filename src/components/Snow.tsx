"use client"
import { useEffect, useMemo, useState } from "react"

/**
 * Tạo số ngẫu nhiên trong khoảng min-max
 */
function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/**
 * Component hiệu ứng tuyết rơi
 * Tạo nhiều bông tuyết với kích thước, tốc độ và vị trí ngẫu nhiên
 * Tự động điều chỉnh số lượng bông tuyết dựa trên kích thước màn hình để tối ưu performance
 */
export default function Snow() {
  const [flakeCount, setFlakeCount] = useState(150)

  // Điều chỉnh số lượng bông tuyết dựa trên kích thước màn hình
  useEffect(() => {
    const updateFlakeCount = () => {
      if (typeof window !== "undefined") {
        // Mobile: ít bông tuyết hơn để tối ưu performance
        if (window.innerWidth < 768) {
          setFlakeCount(80)
        } else if (window.innerWidth < 1024) {
          setFlakeCount(120)
        } else {
          setFlakeCount(150)
        }
      }
    }

    updateFlakeCount()
    window.addEventListener("resize", updateFlakeCount)
    return () => window.removeEventListener("resize", updateFlakeCount)
  }, [])

  // Tạo bông tuyết với số lượng động
  const flakes = useMemo(() => Array.from({ length: flakeCount }, (_, i) => i), [flakeCount])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".snowflake")
    elements.forEach((el, index) => {
      // Kích thước ngẫu nhiên từ 2px đến 10px
      const size = random(2, 10)
      // Vị trí ngang ngẫu nhiên
      const left = random(0, 100)
      // Tốc độ rơi ngẫu nhiên từ 8s đến 20s (chậm hơn = rơi nhanh hơn)
      const duration = random(8, 20)
      // Delay ngẫu nhiên để bông tuyết không rơi cùng lúc
      const delay = random(0, 15)
      // Độ mờ ngẫu nhiên
      const opacity = random(0.4, 0.95)
      // Độ lắc lư ngẫu nhiên (sway)
      const sway = random(-30, 30)

      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.left = `${left}%`
      el.style.animationDuration = `${duration}s`
      el.style.animationDelay = `${delay}s`
      el.style.opacity = `${opacity}`
      // Thêm độ lắc lư khi rơi
      el.style.setProperty("--sway", `${sway}px`)
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {flakes.map((i) => (
        <span key={i} className="snowflake animate-snow" />
      ))}
    </div>
  )
}
