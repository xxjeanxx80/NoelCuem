"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { LOGIN_CONFIG } from "@/config"
import Snow from "@/components/Snow"

/**
 * Trang đăng nhập
 * Dựa trên design từ logindemo/code.html
 */
export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Kiểm tra mật khẩu
    if (password === LOGIN_CONFIG.password) {
      // Lưu trạng thái đăng nhập
      localStorage.setItem(LOGIN_CONFIG.storageKey, "true")
      
      // Dispatch event để bật nhạc khi đăng nhập thành công
      // Dispatch cả hai event để đảm bảo nhạc được bật
      window.dispatchEvent(new CustomEvent("user-logged-in"))
      window.dispatchEvent(new CustomEvent("auto-play-music"))
      
      // Lưu flag để AudioPlayer tự động phát khi mount
      localStorage.setItem("audio-should-play", "true")
      localStorage.setItem("audio-playing", "true")
      
      // Redirect về trang chính
      router.push("/")
    } else {
      setError("Mật khẩu không đúng. Hãy thử lại!")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-hidden">
      {/* Hiệu ứng tuyết rơi */}
      <Snow />
      
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Cozy Christmas lights background with dark bokeh"
          className="h-full w-full object-cover opacity-40 dark:opacity-30"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6lojCSujjvMhHf4iJ8I7RcuI0t0aDGz4IhP9dF8KV_VEwA0Lw-F-2_0Sm_QZ6nCVk2TScMplx9Bkl6Dv3cRH7JMnBsJjhQ9NO6hD-5M_GKXsYinNHeI43KEJpmqx3zio_-k18E2-An_fhrBnPtvfvmamtU19xGd1Cdh1gQIevDNLHIaafs4UVzScv6Crw_-QBKcdobbQpj-lbOcL8Ween1VWMhJ8YofAQQryacyb6Sjn7x_wYY8MZ2EwT8x4UQssZMtoAzsSycexr"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/50 to-background-dark/90"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Top Navigation */}
        <header className="w-full px-6 py-4 flex justify-end">
          <div className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-white/10 backdrop-blur-md text-white px-4 gap-2 text-sm font-bold shadow-lg border border-white/5">
            <span className="material-symbols-outlined text-primary text-[20px]">music_note</span>
            <span className="hidden sm:inline">Last Christmas - Wham!</span>
          </div>
        </header>

        {/* Centered Login Card */}
        <div className="flex flex-1 flex-col justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="glass-card w-full max-w-md rounded-xl p-8 shadow-2xl flex flex-col items-center gap-6 animate-[fadeIn_1s_ease-out]">
            {/* Icon/Avatar */}
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-rose-400 p-0.5 shadow-lg shadow-primary/30">
              <div className="h-full w-full rounded-full bg-background-dark flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary text-[40px] fill-1">redeem</span>
              </div>
            </div>

            {/* Headings */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Giáng Sinh 2025</h1>
              <p className="text-rose-200/80 text-lg font-medium">Món quà nhỏ dành tặng em ❤️</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6 mt-4">
              <div className="space-y-4">
                <label className="block relative w-full group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-rose-200/50 group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[24px]">lock</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    className="w-full rounded-full bg-black/20 border border-white/10 text-white placeholder-rose-200/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-12 pr-12 py-4 text-base transition-all shadow-inner"
                    placeholder="Nhập mật khẩu..."
                    disabled={isLoading}
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-rose-200/50">
                    <span className="material-symbols-outlined text-[24px] fill-1">favorite</span>
                  </div>
                </label>

                {/* Error message */}
                {error && (
                  <div className="text-center">
                    <p className="text-red-400 text-sm flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      {error}
                    </p>
                  </div>
                )}

                {/* Hint */}
                <div className="text-center">
                  <p className="text-rose-200/60 text-sm italic flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                    {LOGIN_CONFIG.hint}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !password.trim()}
                className="group w-full relative overflow-hidden rounded-full bg-primary hover:bg-rose-500 active:bg-rose-600 transition-all duration-300 py-4 px-6 text-white font-bold text-lg shadow-lg shadow-primary/40 hover:shadow-primary/60 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? "Đang kiểm tra..." : "Mở Quà"}
                  {!isLoading && (
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  )}
                </span>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </button>
            </form>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-xs">Made with love for you</p>
          </div>
        </div>
      </div>
    </div>
  )
}

