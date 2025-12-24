"use client"
import { useState } from "react"
import { GALLERY_IMAGE_URLS, GALLERY_VIDEO_THUMBNAILS } from "@/config"

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "image" | "video" | "note">("all")
  const isActive = (key: "all" | "image" | "video" | "note") =>
    filter === key
      ? "px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-[0_0_15px_rgba(238,43,108,0.4)] transition-all"
      : "px-6 py-2.5 rounded-full glass-panel hover:bg-white/10 text-white/90 font-medium text-sm border border-white/10 transition-all flex items-center gap-2"
  const show = (key: "image" | "video" | "note") => filter === "all" || filter === key
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
        <span className="material-symbols-outlined absolute top-20 left-[10%] text-white/10 text-4xl animate-float" style={{ animationDelay: "0s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute top-40 right-[15%] text-white/5 text-2xl animate-float" style={{ animationDelay: "2s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute bottom-1/3 left-[5%] text-white/5 text-6xl animate-float" style={{ animationDelay: "4s" }}>ac_unit</span>
        <span className="material-symbols-outlined absolute top-1/2 right-[5%] text-white/10 text-3xl animate-float" style={{ animationDelay: "1s" }}>ac_unit</span>
      </div>
      <header className="w-full flex justify-center px-4 py-4 md:px-10 sticky top-0 z-50">
        <div className="max-w-[960px] w-full flex items-center justify-between glass-panel rounded-full px-6 py-3">
          <div className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center size-8 bg-primary rounded-full shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
            <h2 className="text-white text-base md:text-lg font-bold leading-tight tracking-tight">Gửi Người Anh Thương ❤️</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-white/60 font-medium">Last Christmas - Wham!</span>
            <button className="size-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">music_note</span>
            </button>
            <a href="/" className="size-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors ml-2" title="Trang chủ">
              <span className="material-symbols-outlined text-[20px]">home</span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center w-full">
        <section className="w-full max-w-[1200px] px-4 py-10 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-dark border border-white/10 mb-6 animate-float">
            <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">Gallery 2024-2025</span>
          </div>
          <h1 className="text-white text-glow text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6">
            Những Kỷ Niệm <span className="text-primary">Khác</span> Của Chúng Ta
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Mỗi bức ảnh là một khoảnh khắc, mỗi lời nhắn là một nhịp đập con tim. Anh đã lưu giữ tất cả ở đây, để chúng mình cùng nhìn lại hành trình yêu thương này.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <button className={isActive("all")} onClick={() => setFilter("all")}>
              Tất cả
            </button>
            <button className={isActive("image")} onClick={() => setFilter("image")}>
              <span className="material-symbols-outlined text-[18px]">image</span> Hình ảnh
            </button>
            <button className={isActive("video")} onClick={() => setFilter("video")}>
              <span className="material-symbols-outlined text-[18px]">videocam</span> Video
            </button>
            <button className={isActive("note")} onClick={() => setFilter("note")}>
              <span className="material-symbols-outlined text-[18px]">favorite</span> Lời nhắn
            </button>
          </div>
        </section>
        <section className="w-full max-w-[1200px] px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            <div className="group relative md:row-span-2 rounded-[2rem] overflow-hidden cursor-pointer bg-surface-dark border border-white/5 shadow-2xl transition-all duration-300 hover:shadow-primary/20" style={{ display: show("image") ? undefined : "none" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${GALLERY_IMAGE_URLS[0] || ""}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="size-10 rounded-full glass-panel flex items-center justify-center text-white/80 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">fullscreen</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">calendar_month</span> Dec 24, 2024
                </div>
                <h3 className="text-white text-2xl font-bold leading-tight mb-2">Đêm Giáng Sinh Đầu Tiên</h3>
                <p className="text-white/70 text-sm line-clamp-2">Khoảnh khắc tay trong tay dưới ánh đèn lấp lánh của nhà thờ lớn. Nụ cười của em làm ấm cả mùa đông.</p>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#fcf8f2] text-slate-800 p-6 flex flex-col shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:rotate-1" style={{ display: show("note") ? undefined : "none" }}>
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-repeat" style={{ backgroundImage: `url('${GALLERY_IMAGE_URLS[1] || GALLERY_IMAGE_URLS[0] || ""}')` }}></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary/40 text-4xl mb-2">format_quote</span>
                  <h4 className="font-display font-bold text-lg mb-2 text-slate-900">Điều ước nhỏ nhoi</h4>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    &quot;Ước gì thời gian ngừng trôi mỗi khi anh nhìn vào mắt em. Cảm ơn em vì đã đến bên anh...&quot;
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">Trần Minh Đức</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-surface-dark border border-white/5 shadow-xl aspect-[4/3] md:aspect-auto" style={{ display: show("video") ? undefined : "none" }}>
              <div className="absolute inset-0 bg-gray-800">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${GALLERY_VIDEO_THUMBNAILS[0] || ""}')`, backgroundPosition: "center top" }}></div>
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">VIDEO</span>
                <h3 className="text-white font-bold mt-1 truncate">Video: Những khoảnh khắc bên nhau</h3>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-surface-dark border border-white/5 shadow-xl aspect-square" style={{ display: show("image") ? undefined : "none" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${GALLERY_IMAGE_URLS[1] || GALLERY_IMAGE_URLS[0] || ""}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-lg">Món quà bất ngờ</h3>
                <p className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity delay-100">Anh nhớ mãi vẻ mặt ngạc nhiên của em.</p>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer glass-panel p-6 flex flex-col justify-between border border-white/10 hover:border-primary/50 transition-colors" style={{ display: show("note") ? undefined : "none" }}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">favorite</span>
                  <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Note #2</span>
                </div>
                <p className="text-white/90 italic text-lg leading-relaxed">
                  &quot;Hạnh phúc không phải là đích đến, mà là hành trình chúng ta đi cùng nhau. Merry Christmas, my love!&quot;
                </p>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <span className="text-xs text-white/40 font-mono">25.12.2025</span>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-surface-dark border border-white/5 shadow-xl md:row-span-2" style={{ display: show("image") ? undefined : "none" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${GALLERY_IMAGE_URLS[2] || GALLERY_IMAGE_URLS[0] || ""}')`, backgroundPosition: "80% center" }}></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-bold border border-white/10">
                  Kỷ Niệm
                </span>
              </div>
            </div>
            <div className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-surface-dark border border-white/5 shadow-xl aspect-video md:col-span-2 lg:col-span-1" style={{ display: show("video") ? undefined : "none" }}>
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" style={{ backgroundImage: `url('${GALLERY_VIDEO_THUMBNAILS[1] || GALLERY_VIDEO_THUMBNAILS[0] || ""}')` }}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-white/80 text-5xl mb-2 drop-shadow-lg group-hover:scale-110 transition-transform">slow_motion_video</span>
                <h3 className="text-white font-bold text-xl drop-shadow-md">Video Tổng Kết Năm</h3>
                <p className="text-white/80 text-sm mt-1">12 tháng yêu thương gói gọn trong 5 phút</p>
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-surface-dark hover:bg-surface-dark/80 border border-white/10 text-white text-base font-bold rounded-full transition-all duration-300">
              <span className="mr-2 group-hover:animate-pulse">Xem Thêm Kỷ Niệm Cũ</span>
              <span className="material-symbols-outlined">history</span>
            </button>
          </div>
        </section>
      </main>
      <footer className="w-full py-8 text-center text-white/40 text-sm relative z-10">
        <p>Designed with ❤️ for Vũ Như Phương. © Christmas 2025</p>
      </footer>
    </div>
  )
}
