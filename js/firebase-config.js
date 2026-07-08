// ==========================================================================
// CẤU HÌNH FIREBASE
// ==========================================================================
// Vào Firebase Console > Project Settings > General > "Your apps" > Web app
// để lấy các thông tin bên dưới, rồi dán đè vào đây.
// Xem hướng dẫn chi tiết trong README.md, Bước 2.
// ==========================================================================

export const firebaseConfig = {
  apiKey: "DÁN_API_KEY_VÀO_ĐÂY",
  authDomain: "TEN-DU-AN.firebaseapp.com",
  projectId: "TEN-DU-AN",
  storageBucket: "TEN-DU-AN.appspot.com",
  messagingSenderId: "DÁN_SENDER_ID",
  appId: "DÁN_APP_ID",
};

// Danh sách quầy mặc định khi khởi tạo hệ thống lần đầu (xem setup.html)
export const DEFAULT_COUNTERS = [
  { id: "1", name: "Quầy 1", field: "Văn phòng đăng ký đất đai", startNumber: 1001 },
  { id: "2", name: "Quầy 2", field: "Thi đua - Khen thưởng, Thanh tra", startNumber: 2001 },
  { id: "3", name: "Quầy 3", field: "BHXH, Chính sách, LĐTBXH", startNumber: 3001 },
  { id: "4", name: "Quầy 4", field: "Xây dựng, Đất đai, Tài nguyên - Môi trường", startNumber: 4001 },
  { id: "5", name: "Quầy 5", field: "Hộ tịch, Kinh tế, Y tế, Giáo dục", startNumber: 5001 },
  { id: "6", name: "Quầy 6", field: "Chứng thực", startNumber: 6001 },
];

export const DEFAULT_ACCOUNTS = [
  { username: "admin", password: "Admin@123", role: "admin" },
  { username: "quay1", password: "Quay1@123", role: "counter", counterId: "1" },
  { username: "quay2", password: "Quay2@123", role: "counter", counterId: "2" },
  { username: "quay3", password: "Quay3@123", role: "counter", counterId: "3" },
  { username: "quay4", password: "Quay4@123", role: "counter", counterId: "4" },
  { username: "quay5", password: "Quay5@123", role: "counter", counterId: "5" },
  { username: "quay6", password: "Quay6@123", role: "counter", counterId: "6" },
];

export const CENTER_NAME = "TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG XÃ ĐAN HẢI";
export const WORKING_HOURS =
  "Thời gian làm việc: Sáng từ 7h30 đến 11h30, Chiều từ 13h30 đến 17h30.";
