"use client"

import { useState, useRef, useEffect } from "react"
import { VIDEO_URL } from "@/config"

interface VideoPlayerProps {
  thumbnailUrl?: string
  title?: string
  description?: string
}

/**
 * Component phát video kỷ niệm
 * Hiển thị modal với video player khi click vào play button
 */
export default function VideoPlayer({
  thumbnailUrl,
  title = "Video: Một năm nhìn lại",
  description = "Click để xem lại những khoảnh khắc đẹp nhất.",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (!VIDEO_URL) {
      alert("Video chưa được cấu hình. Vui lòng thêm VIDEO_URL vào src/config.ts")
      return
    }

    setShowModal(true)
    setIsPlaying(true)
  }

  const handleClose = () => {
    // Thoát fullscreen trước nếu đang ở chế độ fullscreen (hỗ trợ các prefix)
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else if ((document as any).webkitFullscreenElement) {
      ;(document as any).webkitExitFullscreen().catch(() => {})
    } else if ((document as any).mozFullScreenElement) {
      ;(document as any).mozCancelFullScreen().catch(() => {})
    } else if ((document as any).msFullscreenElement) {
      ;(document as any).msExitFullscreen().catch(() => {})
    }
    
    setShowModal(false)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    
    // Dispatch event để có thể bật lại nhạc khi video dừng
    window.dispatchEvent(new CustomEvent("video-stopped"))
  }

  // Đóng modal khi click ra ngoài
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        handleClose()
      }
    }

    if (showModal) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showModal])

  // Phát video khi modal mở và tự động fullscreen trên mobile
  useEffect(() => {
    if (showModal && videoRef.current) {
      const video = videoRef.current
      const isMobile = window.innerWidth < 768
      
      // Phát video
      video.play().catch((error) => {
        console.error("Lỗi khi phát video:", error)
      })
      
      // Dispatch event khi video thực sự bắt đầu phát
      const handleVideoPlay = async () => {
        window.dispatchEvent(new CustomEvent("video-playing"))
        
        // Tự động fullscreen trên mobile sau khi video bắt đầu phát
        if (isMobile) {
          // Đợi một chút để video bắt đầu phát trước khi fullscreen
          setTimeout(() => {
            // Thử các phương thức fullscreen khác nhau (hỗ trợ nhiều browser)
            if (video.requestFullscreen) {
              video.requestFullscreen().catch((err) => {
                console.log("Fullscreen không khả dụng:", err)
              })
            } else if ((video as any).webkitRequestFullscreen) {
              ;(video as any).webkitRequestFullscreen().catch((err: any) => {
                console.log("Webkit fullscreen không khả dụng:", err)
              })
            } else if ((video as any).mozRequestFullScreen) {
              ;(video as any).mozRequestFullScreen().catch((err: any) => {
                console.log("Moz fullscreen không khả dụng:", err)
              })
            } else if ((video as any).msRequestFullscreen) {
              ;(video as any).msRequestFullscreen().catch((err: any) => {
                console.log("MS fullscreen không khả dụng:", err)
              })
            }
          }, 300)
        }
      }
      
      video.addEventListener("play", handleVideoPlay)
      
      // Lắng nghe khi thoát fullscreen (người dùng swipe down trên mobile)
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement && showModal) {
          // Nếu user thoát fullscreen bằng gesture, đóng modal
          handleClose()
        }
      }
      
      // Hỗ trợ các prefix khác nhau cho fullscreen API
      document.addEventListener("fullscreenchange", handleFullscreenChange)
      document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.addEventListener("mozfullscreenchange", handleFullscreenChange)
      document.addEventListener("MSFullscreenChange", handleFullscreenChange)
      
      return () => {
        video.removeEventListener("play", handleVideoPlay)
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
        document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
        document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
        document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
      }
    }
  }, [showModal])
  
  // Lắng nghe khi video dừng hoặc kết thúc
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoPause = () => {
      window.dispatchEvent(new CustomEvent("video-stopped"))
    }
    const handleVideoEnded = () => {
      window.dispatchEvent(new CustomEvent("video-stopped"))
    }

    video.addEventListener("pause", handleVideoPause)
    video.addEventListener("ended", handleVideoEnded)

    return () => {
      video.removeEventListener("pause", handleVideoPause)
      video.removeEventListener("ended", handleVideoEnded)
    }
  }, [showModal])

  return (
    <>
      {/* Video thumbnail với play button */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] group cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: thumbnailUrl
              ? `url('${thumbnailUrl}')`
              : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ar7T_OlO4Imu8gHaWk3tprBo5V4Mkfm9mjYfF2E_M_g5gQTYy7EsTwg2VBpCODGHI_ftrNwih2i1VPCfcc0xU_M0uiZMzkD-zCMHIEUtcvxdKKmteg3kHkpYtTRM-i46SFTUhMStE5s1Gamd3YZKrucJvQEctlaaejgxzNWTA1HzqyYUFhx2TsGBCl0pr6L2sxoUgl_sUSHt1jFxPEUJ6BI-DjnPaK2AOeNMEySOl8f27u9Z5bAjmS7qM5UPw6vkH1Igygs8F5rj')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none z-10">
          <div className="inline-flex items-center gap-1 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[14px]">videocam</span>
            Kỷ Niệm Của Chúng Mình
          </div>
          <h3 className="text-white text-xl font-bold leading-tight">{title}</h3>
          <p className="text-white/70 text-sm mt-1">{description}</p>
        </div>
        <div
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px] z-20"
        >
          <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
          </div>
        </div>
      </div>

      {/* Modal video player */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full h-full md:h-auto md:max-w-4xl md:mx-4 bg-black md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - lớn hơn và dễ bấm trên mobile */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 size-12 md:size-10 flex items-center justify-center bg-black/60 hover:bg-black/80 md:bg-white/10 md:hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm shadow-lg"
              aria-label="Đóng video"
            >
              <span className="material-symbols-outlined text-3xl md:text-base">close</span>
            </button>

            {/* Video player */}
            {VIDEO_URL ? (
              <video
                ref={videoRef}
                src={VIDEO_URL}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onEnded={() => {
                  setIsPlaying(false)
                  // Thoát fullscreen khi video kết thúc
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {})
                  }
                  handleClose()
                }}
              >
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            ) : (
              <div className="w-full aspect-video flex items-center justify-center bg-surface-dark text-white">
                <div className="text-center">
                  <span className="material-symbols-outlined text-6xl mb-4">error</span>
                  <p className="text-lg">Video chưa được cấu hình</p>
                  <p className="text-sm text-white/60 mt-2">
                    Vui lòng thêm VIDEO_URL vào src/config.ts
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

