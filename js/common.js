// ==========================================================================
// MODULE DÙNG CHUNG CHO TOÀN BỘ ỨNG DỤNG
// ==========================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  Timestamp,
};

// -------------------- Ngày giờ --------------------
export function todayStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function nowStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} ${p(
    d.getDate()
  )}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

// -------------------- Phiên đăng nhập (đơn giản, lưu ở trình duyệt) --------------------
export function saveSession(account) {
  sessionStorage.setItem("htxh_session", JSON.stringify(account));
}
export function getSession() {
  const raw = sessionStorage.getItem("htxh_session");
  return raw ? JSON.parse(raw) : null;
}
export function clearSession() {
  sessionStorage.removeItem("htxh_session");
}
export function requireRole(role) {
  const s = getSession();
  if (!s || s.role !== role) {
    window.location.href = "index.html";
    return null;
  }
  return s;
}

// -------------------- Đăng nhập bằng tài khoản Firestore --------------------
// LƯU Ý BẢO MẬT: đây là cơ chế đăng nhập đơn giản (so khớp mật khẩu trong
// Firestore), phù hợp cho hệ thống nội bộ quy mô nhỏ. Không dùng cho hệ
// thống cần bảo mật cao. Xem README mục "Về bảo mật" để nâng cấp lên
// Firebase Authentication khi cần.
export async function login(username, password) {
  const ref = doc(db, "accounts", username);
  const snap = await getDoc(ref);
  if (!snap.exists()) return { ok: false, message: "Tài khoản không tồn tại" };
  const data = snap.data();
  if (data.password !== password) {
    return { ok: false, message: "Sai mật khẩu" };
  }
  saveSession(data);
  return { ok: true, account: data };
}

// -------------------- Đọc số & phát loa --------------------
export function speakCall(number, counterName) {
  try {
    const text = `Xin mời công dân số ${digitsToVietnamese(
      number
    )}, đến ${counterName}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "vi-VN";
    utter.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn("Không thể phát âm thanh:", e);
  }
}

function digitsToVietnamese(n) {
  // Đọc số nguyên bằng giọng đọc mặc định của trình duyệt (đã hỗ trợ tiếng Việt tốt),
  // chỉ cần trả về chuỗi số, trình duyệt tự đọc đúng.
  return String(n);
}

// -------------------- Toast thông báo nhỏ --------------------
export function toast(msg, isError = false) {
  let el = document.getElementById("htxh-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "htxh-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = isError ? "htxh-toast error show" : "htxh-toast show";
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 3000);
}
