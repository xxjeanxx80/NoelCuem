"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ANIMATION_CONFIG } from "@/config"

interface GiftBoxProps {
  onOpen?: () => void
  canOpen?: boolean // Cho phép mở quà hay không (dựa vào thời gian)
}

/**
 * Component hộp quà với animation mở quà
 * Khi click sẽ có hiệu ứng mở hộp và scroll đến phần reveal
 * Chỉ cho phép mở khi canOpen = true
 */
export default function GiftBox({ onOpen, canOpen = true }: GiftBoxProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const handleOpen = useCallback(() => {
    // Không cho mở nếu canOpen = false
    if (!canOpen || isOpening || isOpened) return

    setIsOpening(true)

    // Sau khi animation mở quà hoàn thành, hiện phần reveal và scroll
    setTimeout(() => {
      setIsOpened(true)
      setIsOpening(false)

      // Dispatch event để báo cho page biết quà đã được mở (trước khi scroll)
      window.dispatchEvent(new CustomEvent("gift-opened"))

      // Đợi một chút để phần reveal hiện ra trước khi scroll
      setTimeout(() => {
        // Scroll mượt đến phần reveal
        const revealSection = document.getElementById("reveal")
        if (revealSection) {
          revealSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }

        // Gọi callback nếu có
        onOpen?.()
      }, 300)
    }, ANIMATION_CONFIG.giftBoxOpenDuration)
  }, [isOpening, isOpened, onOpen, canOpen])

  // Lắng nghe custom event để trigger từ bên ngoài
  useEffect(() => {
    window.addEventListener("open-gift-box", handleOpen)
    return () => {
      window.removeEventListener("open-gift-box", handleOpen)
    }
  }, [handleOpen])

  return (
    <div className={`animate-float mb-8 relative group ${canOpen ? "cursor-pointer" : "cursor-not-allowed"}`}>
      {/* Glow behind box */}
      <div
        className={`absolute inset-0 ${canOpen ? "bg-primary/40" : "bg-gray-500/20"} blur-[60px] rounded-full scale-75 transition-transform duration-700 ${
          isOpening ? "scale-110" : canOpen ? "group-hover:scale-90" : ""
        }`}
      ></div>

      {/* Icon khóa khi chưa cho phép mở */}
      {!canOpen && !isOpened && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <span className="material-symbols-outlined text-white/90 text-6xl drop-shadow-2xl">lock</span>
            <p className="text-white/90 text-sm font-bold text-center drop-shadow-lg">Chưa đến giờ</p>
          </div>
        </div>
      )}

      {/* Gift Box Image */}
      <div
        ref={boxRef}
        data-gift-box
        onClick={handleOpen}
        className={`relative w-64 h-64 md:w-80 md:h-80 bg-contain bg-center bg-no-repeat z-10 drop-shadow-2xl transition-all duration-500 ${
          !canOpen
            ? "opacity-40 grayscale-[50%]"
            : isOpening
              ? "gift-box-opening scale-110 rotate-12 opacity-80"
              : isOpened
                ? "gift-box-opened scale-95 opacity-60"
                : "hover:scale-105"
        }`}
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTz5DNvzijPWK5Hpjci8iIg25CpD7C9otsCn4xrzTkhShn9qqOqKaNkbe80AAtaTt6dYOwnlASJOuJ4Aig8z8gZFz1nZukdXfYdV-9qm0i0FgEznp0L-Xj-c7_BwB8QQj6VAX0NHbbz2OsV8hxMWQn_A9wwJS4wLVttDzPjkJVIayR0Oc5CizleJfdnQSBss1eGlnH86uH8bh8BoqRma6GrHXfGX26czMltq9JkeD5KNaeD4jhnSh2TsWAoQkvolo6Om-Ovp5vEh1O')",
        }}
      ></div>

      {/* Hiệu ứng particles khi mở quà */}
      {isOpening && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 gift-particle"
              style={{
                animationDelay: `${(i * 50) / 1000}s`,
                transform: `rotate(${(360 / 20) * i}deg) translateY(-100px)`,
              }}
            >
              <span className="material-symbols-outlined text-primary text-2xl">
                favorite
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

