"use client"

import { useEffect, useRef, useState } from "react"
import { MUSIC_URL, AUDIO_CONFIG, APP_INFO } from "@/config"

/**
 * Component phát nhạc nền
 * Cho phép play/pause nhạc và lưu trạng thái
 */
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Tự động phát nhạc khi component mount (nếu được bật trong config)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Nếu autoplay được bật, thử phát nhạc
    if (AUDIO_CONFIG.autoPlay) {
      // Đợi một chút để đảm bảo audio đã sẵn sàng
      const timer = setTimeout(() => {
        audio.play().catch((error) => {
          // Nếu autoplay bị chặn, lưu trạng thái để user có thể bật sau
          console.log("Autoplay bị chặn, cần user interaction:", error)
          // Thử load từ localStorage
          const savedState = localStorage.getItem("audio-playing")
          if (savedState === "true") {
            audio.play().catch(() => {
              // Bỏ qua nếu vẫn không được
            })
          }
        })
      }, 500)

      return () => clearTimeout(timer)
    } else {
      // Nếu không autoplay, chỉ load từ localStorage
      const savedState = localStorage.getItem("audio-playing")
      if (savedState === "true" && audio) {
        audio.play().catch(() => {
          // Bỏ qua lỗi autoplay bị chặn
        })
      }
    }
  }, [])

  // Xử lý khi audio được load và xử lý lỗi
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      setHasError(false)
      audio.volume = AUDIO_CONFIG.volume
      audio.loop = AUDIO_CONFIG.loop
    }

    const handleError = (e: Event) => {
      console.error("Lỗi khi load nhạc:", e)
      setHasError(true)
      setIsLoaded(false)
      setIsPlaying(false)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("error", handleError)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Toggle play/pause
  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || hasError) return

    try {
      if (isPlaying) {
        audio.pause()
        localStorage.setItem("audio-playing", "false")
      } else {
        await audio.play()
        localStorage.setItem("audio-playing", "true")
      }
    } catch (error) {
      console.error("Lỗi khi phát nhạc:", error)
      setHasError(true)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden md:inline text-xs text-white/60 font-medium">
        {APP_INFO.musicTitle}
      </span>
      <button
        onClick={togglePlay}
        disabled={hasError}
        className="size-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={hasError ? "Nhạc không khả dụng" : isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
        title={hasError ? "Vui lòng thêm file nhạc vào thư mục public (xem src/config.ts)" : undefined}
      >
        <span className="material-symbols-outlined text-[20px]">
          {hasError ? "error" : isPlaying ? "pause" : "music_note"}
        </span>
      </button>
      <audio ref={audioRef} src={MUSIC_URL} preload="metadata" crossOrigin="anonymous" />
    </div>
  )
}

