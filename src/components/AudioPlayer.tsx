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

    let hasTriedAutoplay = false

    // Hàm thử phát nhạc
    const tryPlay = async () => {
      if (hasTriedAutoplay && isPlaying) return
      
      try {
        if (AUDIO_CONFIG.autoPlay) {
          // Thử phát nhạc tự động
          await audio.play()
          localStorage.setItem("audio-playing", "true")
          hasTriedAutoplay = true
        } else {
          // Nếu không autoplay, chỉ load từ localStorage
          const savedState = localStorage.getItem("audio-playing")
          if (savedState === "true") {
            await audio.play()
            hasTriedAutoplay = true
          }
        }
      } catch (error) {
        // Autoplay bị chặn - bình thường trên mobile
        console.log("Autoplay bị chặn, sẽ thử lại sau user interaction:", error)
        // Lưu trạng thái muốn phát để thử lại sau
        if (AUDIO_CONFIG.autoPlay) {
          localStorage.setItem("audio-should-play", "true")
        }
      }
    }

    // Thử phát ngay khi component mount
    const timer = setTimeout(tryPlay, 500)

    // Trên mobile, autoplay thường bị chặn, nên thử lại sau user interaction đầu tiên
    const handleUserInteraction = async () => {
      if (!isPlaying && !hasTriedAutoplay) {
        // Kiểm tra xem có nên tự động phát không
        const shouldAutoPlay = AUDIO_CONFIG.autoPlay || localStorage.getItem("audio-should-play") === "true"
        if (shouldAutoPlay) {
          await tryPlay()
          localStorage.removeItem("audio-should-play")
        }
      }
    }

    // Lắng nghe user interaction để trigger autoplay trên mobile (chỉ một lần)
    const options = { once: true, passive: true }
    document.addEventListener("click", handleUserInteraction, options)
    document.addEventListener("touchstart", handleUserInteraction, options)
    document.addEventListener("scroll", handleUserInteraction, options)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("scroll", handleUserInteraction)
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

  // Lắng nghe event từ VideoPlayer để tự động tắt nhạc khi video phát
  useEffect(() => {
    const handleVideoPlaying = () => {
      const audio = audioRef.current
      if (audio && isPlaying) {
        audio.pause()
        localStorage.setItem("audio-playing", "false")
      }
    }

    const handleVideoStopped = () => {
      // Tùy chọn: Tự động bật lại nhạc khi video dừng
      // Có thể bật/tắt trong config nếu cần
      // const audio = audioRef.current
      // if (audio && !isPlaying) {
      //   audio.play().catch(() => {})
      // }
    }

    window.addEventListener("video-playing", handleVideoPlaying)
    window.addEventListener("video-stopped", handleVideoStopped)

    return () => {
      window.removeEventListener("video-playing", handleVideoPlaying)
      window.removeEventListener("video-stopped", handleVideoStopped)
    }
  }, [isPlaying])

  // Lắng nghe event khi user đăng nhập để tự động bật nhạc
  useEffect(() => {
    const handleAutoPlayMusic = async () => {
      const audio = audioRef.current
      if (!audio || hasError) return

      try {
        // Thử phát nhạc ngay lập tức
        await audio.play()
        localStorage.setItem("audio-playing", "true")
        localStorage.setItem("audio-should-play", "true")
      } catch (error) {
        // Nếu bị chặn, lưu flag để thử lại sau user interaction
        console.log("Autoplay bị chặn, sẽ thử lại sau:", error)
        localStorage.setItem("audio-should-play", "true")
        
        // Thử lại sau một chút
        setTimeout(async () => {
          try {
            await audio.play()
            localStorage.setItem("audio-playing", "true")
          } catch (e) {
            // Bỏ qua nếu vẫn không được
          }
        }, 500)
      }
    }

    window.addEventListener("auto-play-music", handleAutoPlayMusic)
    return () => {
      window.removeEventListener("auto-play-music", handleAutoPlayMusic)
    }
  }, [hasError])

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

