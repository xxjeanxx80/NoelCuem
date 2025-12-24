"use client"

// Page replicates demo/code.html design with Material Symbols icons

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AudioPlayer from "@/components/AudioPlayer"
import GiftBox from "@/components/GiftBox"
import DemoCountdown from "@/components/DemoCountdown"
import VideoPlayer from "@/components/VideoPlayer"
import Snow from "@/components/Snow"
import { LOGIN_CONFIG } from "@/config"

export default function Page() {
  const [isGiftOpened, setIsGiftOpened] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  // Kiểm tra authentication khi component mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem(LOGIN_CONFIG.storageKey)
      if (authStatus === "true") {
        setIsAuthenticated(true)
      } else {
        // Redirect đến trang login nếu chưa đăng nhập
        router.push("/login")
      }
      setIsChecking(false)
    }

    checkAuth()

    // Lắng nghe event khi user đăng nhập từ trang khác
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOGIN_CONFIG.storageKey) {
        if (e.newValue === "true") {
          setIsAuthenticated(true)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [router])

  // Lắng nghe event khi quà được mở
  useEffect(() => {
    const handleGiftOpened = () => {
      setIsGiftOpened(true)
    }

    window.addEventListener("gift-opened", handleGiftOpened)
    return () => {
      window.removeEventListener("gift-opened", handleGiftOpened)
    }
  }, [])

  // Lắng nghe event khi user đăng nhập để tự động bật nhạc
  useEffect(() => {
    const handleUserLoggedIn = () => {
      // Dispatch event để AudioPlayer tự động phát nhạc
      window.dispatchEvent(new CustomEvent("auto-play-music"))
    }

    window.addEventListener("user-logged-in", handleUserLoggedIn)
    return () => {
      window.removeEventListener("user-logged-in", handleUserLoggedIn)
    }
  }, [])

  // Hiển thị loading khi đang kiểm tra authentication
  if (isChecking) {
    return (
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center">
        <div className="text-white text-xl">Đang kiểm tra...</div>
      </div>
    )
  }

  // Không hiển thị nội dung nếu chưa đăng nhập
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      {/* Hiệu ứng tuyết rơi */}
      <Snow />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
        <span className="material-symbols-outlined absolute top-20 left-[10%] text-white/10 text-4xl animate-float" style={{ animationDelay: "0s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute top-40 right-[15%] text-white/5 text-2xl animate-float" style={{ animationDelay: "2s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute bottom-1/3 left-[5%] text-white/5 text-6xl animate-float" style={{ animationDelay: "4s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute top-1/2 right-[5%] text-white/10 text-3xl animate-float" style={{ animationDelay: "1s" }}>ac_unit</span>
      </div>
      <header className="w-full flex justify-center px-4 py-4 md:px-10 relative z-10">
        <div className="max-w-[960px] w-full flex items-center justify-between glass-panel rounded-full px-6 py-3">
          <div className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center size-8 bg-primary rounded-full shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <h2 className="text-white text-base md:text-lg font-bold leading-tight tracking-tight">Gửi Vũ Như Phương ❤️</h2>
          </div>
          <AudioPlayer />
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center w-full relative z-10">
        <section className="w-full max-w-[960px] px-4 py-10 md:py-20 flex flex-col items-center text-center">
          <GiftBox />
          <h1 className="text-white text-glow text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Merry Christmas <span className="text-primary">2025</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto mb-8 font-light">
            Giáng sinh này, anh có một món quà nhỏ muốn gửi tặng em. Hy vọng nó sẽ mang lại cho em một chút ấm áp giữa mùa đông lạnh giá.
          </p>
          <a
            href="#reveal"
            onClick={(e) => {
              e.preventDefault()
              // Trigger custom event để mở quà
              window.dispatchEvent(new CustomEvent("open-gift-box"))
            }}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-dark text-white text-base font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(238,43,108,0.4)] hover:shadow-[0_0_30px_rgba(238,43,108,0.6)]"
          >
            <span className="material-symbols-outlined mr-2 group-hover:animate-bounce">card_giftcard</span>
            Mở Quà Ngay
          </a>
        </section>
        <section className="w-full max-w-[960px] px-4 mb-16">
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">timer</span>
                <span className="text-white text-lg font-bold">Thời gian đến Giáng Sinh</span>
              </div>
              <DemoCountdown />
            </div>
          </div>
        </section>
        <section
          id="reveal"
          className={`w-full max-w-[960px] px-4 pb-20 scroll-mt-24 transition-all duration-1000 ease-out ${
            isGiftOpened
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 translate-y-10 invisible pointer-events-none"
          }`}
          style={{
            display: isGiftOpened ? "block" : "none",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              <div className="bg-surface-dark p-3 rounded-[2rem] shadow-xl border border-white/5">
                <VideoPlayer
                  thumbnailUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ar7T_OlO4Imu8gHaWk3tprBo5V4Mkfm9mjYfF2E_M_g5gQTYy7EsTwg2VBpCODGHI_ftrNwih2i1VPCfcc0xU_M0uiZMzkD-zCMHIEUtcvxdKKmteg3kHkpYtTRM-i46SFTUhMStE5s1Gamd3YZKrucJvQEctlaaejgxzNWTA1HzqyYUFhx2TsGBCl0pr6L2sxoUgl_sUSHt1jFxPEUJ6BI-DjnPaK2AOeNMEySOl8f27u9Z5bAjmS7qM5UPw6vkH1Igygs8F5rj"
                  title="Video: Một năm nhìn lại"
                  description="Click để xem lại những khoảnh khắc đẹp nhất."
                />
              </div>
              <div className="glass-panel p-5 rounded-[2rem] flex items-center gap-4">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">redeem</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">Quà Tặng</h4>
                  <p className="text-white/60 text-sm">Anh đã đặt quà cho em vào ngày 25/12/2025!</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12">
              <div className="h-full bg-[#fcf8f2] dark:bg-[#eaddcf] text-slate-800 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARhZwu90hXedm3UwIepJ7YmoqOUytrJIbss_21fQJ87miQExzihzXG4LD6PcTpbKE4NNtEZecNRABvd_Iprzl5iEc4R6YQejtjGypiYqzlfuGsK-03-39--cbCbrXZgNqJh9U0QuYT8XsONu6gaMfINeYEYcT2A7cmRcWyD7UKIIYoBIctCpAz-CcOZPOF6JOjDGnxKiJ4EnJOcP7W5VGgF8N5O6YRliGg6DBiDS95M3ZziAxaEXHBCtNNH6WIK6yw1KIogFnyTvsr')"
                  }}
                ></div>
                <div className="absolute top-6 right-6 opacity-80 rotate-12">
                  <div className="border-2 border-primary/30 p-2 rounded-lg">
                    <div className="size-16 bg-primary/10 rounded flex items-center justify-center flex-col text-primary/60">
                      <span className="material-symbols-outlined text-2xl">local_post_office</span>
                      <span className="text-[10px] font-bold mt-1">XMAS 25</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 font-body">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6 flex items-center gap-3">
                    Gửi em yêu, <span className="text-primary animate-pulse-slow">❤️</span>
                  </h3>
                  <div className="space-y-4 text-base md:text-lg leading-relaxed text-slate-700">
                    <p>
                      Chào cô gái nhỏ của anh. Cảm ơn em đã luôn ở bên anh trong suốt thời gian qua. Giáng sinh này, dù không thể hái sao trên trời xuống tặng em, nhưng anh hứa sẽ luôn là người sưởi ấm tay em trong những ngày đông lạnh giá.
                    </p>
                    <p>
                      Anh nhớ lần đầu tiên chúng mình gặp nhau, em đã hôn anh trong quán coffee. Nụ cười ấy chính là món quà lớn nhất đối với anh.
                    </p>
                    <p>
                      Năm nay, anh chuẩn bị món quà nhỏ này với tất cả tình yêu thương. Mong rằng mỗi khi nhìn thấy nó, em sẽ nhớ rằng luôn có một người yêu em, thương em và sẵn sàng làm mọi thứ để em vui.
                    </p>
                    <p>
                      Chúc em một mùa Giáng sinh an lành, hạnh phúc và thật nhiều niềm vui.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-col items-start gap-1">
                    <p className="text-slate-900 font-bold text-lg">Yêu em nhiều,</p>
                    <p className="text-slate-600">Trần Minh Đức.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-white/40 text-sm relative z-10">
        <p>Designed with ❤️ for Vũ Như Phương. © Christmas 2025</p>
      </footer>
    </div>    
  )
}
