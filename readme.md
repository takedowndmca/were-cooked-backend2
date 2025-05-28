# 🍳 WereCooked - Aplikasi Rekomendasi Resep

WereCooked adalah aplikasi web yang memberikan rekomendasi resep makanan berdasarkan bahan yang dimiliki pengguna. Dibangun menggunakan React, Hapi.js, dan TensorFlow untuk fitur pencarian cerdas berbasis ML.

## 📦 Fitur Utama
- 🔍 Cari resep berdasarkan bahan
- 🎲 Rekomendasi resep acak
- 💾 Bookmark resep favorit
- 📄 Cetak atau export resep ke PDF
- 🌙 Mode gelap (dark mode)
- 📱 PWA support (offline & installable)
- 👤 Login, Register, Profile

## ⚙️ Tech Stack
- **Frontend:** React + TailwindCSS + Vite + IndexedDB
- **Backend:** Node.js + Hapi + JWT
- **ML:** Content-Based Filtering (Cosine Similarity)
- **PWA:** Service Worker + Web Manifest

## 🔧 Cara Menjalankan
### backend
```bash
cd were-cooked-backend
npm install
node server.js
```
