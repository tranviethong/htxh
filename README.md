# Hệ thống lấy số tự động QMS — Trung tâm PVHCC xã Đan Hải

Hướng dẫn này viết cho người **chưa biết code**, làm theo từng bước là chạy được.
Toàn bộ hệ thống chạy bằng **HTML/JS thuần** (không cần cài Node, không cần build),
dữ liệu lưu trên **Firebase (Firestore)**, host miễn phí trên **Firebase Hosting**,
mã nguồn lưu trên **GitHub**.

## 1. Hệ thống gồm những trang nào

| Trang | Đường dẫn | Dùng để |
|---|---|---|
| Trang chủ | `/` | Menu điều hướng |
| Khởi tạo hệ thống | `/setup` | Chạy **1 lần** sau khi deploy để tạo 6 quầy + tài khoản mặc định |
| Trang hiển thị (TV) | `/hienthi` | Màn hình lớn treo ở sảnh, hiện số đang gọi, phát loa |
| Kiosk lấy số | `/kiosk` | Màn hình cảm ứng đứng, in phiếu qua máy in nhiệt XP-58 |
| Lấy số từ xa | `/mobile` | Người dân dùng điện thoại/máy tính lấy số trước |
| Quầy cán bộ | `/quay` | Cán bộ đăng nhập, bấm gọi số |
| Quản trị | `/admin` | Xem báo cáo, đổi mật khẩu quầy, thêm/bớt quầy |

Tài khoản mặc định (đổi được sau khi khởi tạo):
- Quản trị: `admin` / `Admin@123`
- Quầy 1–6: `quay1`…`quay6` / `Quay1@123`…`Quay6@123`

---

## 2. Bước 1 — Tạo/​mở dự án Firebase

Bạn đã có dự án Firebase tên **"He thong xep hang"**, dùng lại dự án đó:

1. Vào https://console.firebase.google.com → chọn dự án **He thong xep hang**.
2. Vào mục **Build > Firestore Database** → bấm **Create database** (nếu chưa tạo)
   → chọn **Start in production mode** → chọn khu vực gần Việt Nam (ví dụ `asia-southeast1`) → **Enable**.
3. Vào **Project settings** (icon bánh răng góc trên trái) → mục **Your apps**
   → nếu chưa có app Web, bấm **Add app > Web** (icon `</>`), đặt tên tuỳ ý, **không** cần tick Firebase Hosting lúc này (Bước 6 sẽ làm) → **Register app**.
4. Bạn sẽ thấy một đoạn cấu hình dạng:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "he-thong-xep-hang.firebaseapp.com",
     projectId: "he-thong-xep-hang",
     storageBucket: "he-thong-xep-hang.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
   Copy toàn bộ 6 dòng này.

## 3. Bước 2 — Dán cấu hình vào code

Mở file `js/firebase-config.js` trong bộ code này, thay các dòng
`"DÁN_API_KEY_VÀO_ĐÂY"`, `"TEN-DU-AN..."`, v.v. bằng đúng giá trị bạn vừa copy ở Bước 1.
Chỉ sửa phần `firebaseConfig`, không cần sửa gì khác trong file.

## 4. Bước 3 — Đưa code lên GitHub (`tranviethong/htxh`)

Nếu bạn dùng máy tính có sẵn Git:
```bash
cd đường-dẫn-tới-thư-mục-code-này
git init
git remote add origin https://github.com/tranviethong/htxh.git
git add .
git commit -m "Khoi tao he thong QMS"
git branch -M main
git push -u origin main
```

Nếu bạn **không quen dùng lệnh**, cách dễ hơn:
1. Vào https://github.com/tranviethong/htxh
2. Bấm **Add file > Upload files**
3. Kéo thả toàn bộ các file/thư mục trong bộ code này vào (giữ nguyên cấu trúc thư mục `css/`, `js/`)
4. Bấm **Commit changes**

## 5. Bước 4 — Cài Firestore Rules & Indexes

Cách đơn giản nhất (không cần cài gì):
1. Vào Firebase Console → **Firestore Database** → tab **Rules**.
2. Xoá hết nội dung, dán toàn bộ nội dung file `firestore.rules` (trong bộ code) vào → **Publish**.
3. Chỉ mục (Indexes) sẽ được Firestore **tự đề xuất**: khi bạn dùng thử trang `/quay` hoặc `/mobile`
   lần đầu, nếu Firestore báo lỗi thiếu chỉ mục, trong lỗi đó sẽ có **một đường link** —
   bấm vào link đó, Firebase tự điền sẵn thông tin, bạn chỉ cần bấm **Create Index** và đợi 1–2 phút.
   (Chỉ mục cần thiết cũng đã được khai báo sẵn trong `firestore.indexes.json` nếu bạn dùng Firebase CLI ở Bước 6b).

## 6. Bước 5 — Đưa lên Firebase Hosting

### Cách A — Dùng Firebase CLI (khuyên dùng, làm 1 lần)

1. Cài Node.js: tải tại https://nodejs.org (bản LTS), cài như phần mềm bình thường.
2. Mở **Command Prompt** (Windows) hoặc **Terminal** (Mac), gõ lần lượt:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
   → cửa sổ trình duyệt mở ra, đăng nhập bằng tài khoản Google đang quản lý Firebase.
3. Di chuyển vào thư mục chứa code này rồi chạy:
   ```bash
   cd đường-dẫn-tới-thư-mục-code-này
   firebase use --add
   ```
   → chọn dự án **He thong xep hang** → đặt alias là `default`.
4. Deploy:
   ```bash
   firebase deploy
   ```
5. Sau khi chạy xong, Firebase sẽ in ra một địa chỉ dạng
   `https://he-thong-xep-hang.web.app` — đây là trang web đã hoạt động thật.

Từ lần sau, mỗi khi bạn (hoặc tôi) sửa code, chỉ cần chạy lại `firebase deploy` là cập nhật.

### Cách B — Không cài gì, deploy bằng tay qua Console

Firebase Hosting bắt buộc cần công cụ CLI để upload file tĩnh, nên **Cách A là bắt buộc**
làm ít nhất 1 lần. Nếu bạn thực sự không thể cài đặt, nhờ người quen làm giúp bước này
(chỉ mất khoảng 10 phút), các bước sau đó bạn tự làm được hết qua giao diện web.

## 7. Bước 6 — Trỏ tên miền `htxh.danhai.id.vn` về Firebase Hosting

1. Vào Firebase Console → **Hosting** → **Add custom domain**.
2. Nhập `htxh.danhai.id.vn` → Firebase sẽ cho bạn 1–2 bản ghi DNS (dạng `A` hoặc `TXT`).
3. Vào nơi bạn quản lý domain `danhai.id.vn` (nhà cung cấp tên miền) → mục quản lý **DNS Records**
   → thêm đúng các bản ghi Firebase vừa cho.
4. Đợi 15 phút–24 giờ để DNS cập nhật, Firebase sẽ tự cấp SSL (https) miễn phí.

## 8. Bước 7 — Khởi tạo dữ liệu lần đầu

Sau khi trang web đã chạy (dù là `https://xxx.web.app` hay `https://htxh.danhai.id.vn`):
1. Mở `https://htxh.danhai.id.vn/setup`
2. Bấm **Khởi tạo ngay** → hệ thống tự tạo 6 quầy + 7 tài khoản mặc định trong Firestore.
3. Xong, vào trang chủ để bắt đầu sử dụng.

⚠️ Chỉ chạy `/setup` **một lần**. Nếu chạy lại, quầy/tài khoản sẽ bị ghi đè về mặc định
(số phiếu đã lấy trong ngày không bị ảnh hưởng).

---

## 9. Hướng dẫn dùng từng trang

- **`/hienthi`**: mở trên TV/màn hình lớn, để trình duyệt toàn màn hình (F11). Có tự phát loa
  bằng giọng đọc có sẵn của trình duyệt/máy tính khi cán bộ bấm gọi số — đảm bảo loa máy tính
  chạy trang này được bật.
- **`/kiosk`**: cắm máy in nhiệt XP-58 vào máy tính/máy tính bảng chạy trình duyệt, đặt làm
  **máy in mặc định** của hệ điều hành. Khi công dân ấn chọn quầy, trình duyệt sẽ mở hộp thoại in —
  bấm In (hoặc cấu hình Chrome chạy ở chế độ kiosk-printing để in thẳng không cần xác nhận, xem mục 11).
- **`/mobile`**: người dân tự mở bằng điện thoại (có thể dán mã QR trỏ tới link này ở sảnh).
- **`/quay`**: cán bộ từng quầy đăng nhập đúng tài khoản `quay1`…`quay6` của mình.
- **`/admin`**: đăng nhập `admin`, có 3 tab — Báo cáo theo khoảng ngày, Đổi mật khẩu quầy,
  Thêm/tạm ngưng/xoá quầy.

## 10. Cấu hình máy in nhiệt XP-58 cho Kiosk (nâng cao)

Trình duyệt in qua hộp thoại in chuẩn của hệ điều hành, khổ giấy đã được đặt sẵn 58mm trong code.
Để in **tự động không cần bấm xác nhận** (khuyên dùng cho Kiosk chạy Google Chrome):
1. Cài driver máy in XP-58 (theo hãng máy in cung cấp), đặt làm máy in mặc định.
2. Tạo shortcut mở Chrome với cờ:
   ```
   chrome.exe --kiosk-printing --app=https://htxh.danhai.id.vn/kiosk
   ```
   Cờ `--kiosk-printing` giúp Chrome in thẳng vào máy in mặc định, bỏ qua hộp thoại xác nhận.

## 11. Về bảo mật (nâng cao, không bắt buộc)

Để dễ triển khai, hệ thống dùng cơ chế đăng nhập đơn giản (so khớp mật khẩu lưu trong Firestore),
phù hợp với hệ thống nội bộ quy mô nhỏ, dùng trong nội bộ trụ sở. Nếu sau này muốn nâng cao bảo mật
(chống dò mật khẩu qua mạng), có thể nâng cấp lên **Firebase Authentication** + **Cloud Functions**
để xử lý đăng nhập/đổi mật khẩu phía máy chủ — phần này cần thêm code, có thể nhờ hỗ trợ sau.

## 12. Xử lý sự cố thường gặp

| Hiện tượng | Nguyên nhân thường gặp | Cách xử lý |
|---|---|---|
| Trang trắng, lỗi console | Chưa dán đúng `firebaseConfig` | Kiểm tra lại Bước 2 |
| Đăng nhập báo "Tài khoản không tồn tại" | Chưa chạy `/setup` | Vào `/setup` bấm Khởi tạo |
| Lỗi "The query requires an index" | Thiếu chỉ mục Firestore | Bấm vào link trong thông báo lỗi để tạo chỉ mục |
| Không nghe thấy loa gọi số | Trình duyệt/máy tính đang tắt tiếng, hoặc chưa từng tương tác với trang | Bật âm lượng; bấm 1 lần vào trang `/hienthi` trước |
| Không in được phiếu | Máy in chưa đặt mặc định / chưa cài driver | Kiểm tra Cài đặt máy in trong hệ điều hành |
