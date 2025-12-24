/**
 * File cấu hình chính của ứng dụng
 * Lưu trữ các hằng số, URL API, và các thiết lập quan trọng
 */

// URL nhạc nền - Last Christmas by Wham!
// 
// CÁCH 1: Sử dụng file local trong thư mục public (KHUYẾN NGHỊ)
// - Đặt file nhạc vào thư mục public (ví dụ: public/music.mp3)
// - Sử dụng đường dẫn: "/music.mp3" hoặc "/audio/christmas.mp3"
// - ✅ Khi deploy lên Vercel, file trong public sẽ được copy lên server và hoạt động bình thường
// - ✅ Không bị lỗi CORS
// - ⚠️ Lưu ý: File quá lớn (>100MB) có thể gặp vấn đề, nên nén file nhạc (MP3 128kbps)
//
// CÁCH 2: Sử dụng URL từ CDN/Storage (cho file lớn)
// - Upload file lên CDN (Cloudinary, AWS S3, hoặc dịch vụ khác)
// - Sử dụng URL: "https://your-cdn.com/music.mp3"
// - ✅ Không giới hạn kích thước
// - ⚠️ Cần đảm bảo server cho phép CORS
//
// CÁCH 3: Sử dụng URL từ internet (không khuyến nghị)
// - Ví dụ: "https://example.com/music.mp3"
// - ⚠️ Có thể bị chặn CORS, không ổn định
export const MUSIC_URL = "/music.mp3" // Thay đổi thành đường dẫn file nhạc của bạn

// Thời gian đếm ngược đến Giáng Sinh 2025
// Format: YYYY-MM-DDTHH:mm:ss+07:00 (GMT+7)
export const CHRISTMAS_DATE = "2025-12-25T00:00:00+07:00"

// Cấu hình audio player
export const AUDIO_CONFIG = {
  autoPlay: true, // Tự động phát nhạc khi load trang
  volume: 0.7, // Âm lượng mặc định (0-1)
  loop: true, // Lặp lại nhạc
}

// Cấu hình animation
export const ANIMATION_CONFIG = {
  giftBoxOpenDuration: 1500, // Thời gian animation mở quà (ms)
  scrollDuration: 800, // Thời gian scroll mượt (ms)
}

// Thông tin hiển thị
export const APP_INFO = {
  title: "Gửi Người Thương Của Anh - Giáng Sinh 2025",
  musicTitle: "Last Christmas - Wham!",
}

