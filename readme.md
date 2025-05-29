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

---

## 📘 API Documentation

### Base URL

```
http://<your-domain>/ (atau http://localhost:port)
```

---

## 🔐 Authentication

### POST `/register`

* **Description**: Register akun pengguna baru.
* **Request Body**:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
* **Response**:

  * `201 Created`: Akun berhasil dibuat.
  * `400 Bad Request`: Data tidak valid atau sudah digunakan.

---

### POST `/login`

* **Description**: Login pengguna dan mendapatkan token autentikasi.
* **Request Body**:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
* **Response**:

  * `200 OK`: Login berhasil.

    ```json
    {
      "token": "jwt-token"
    }
    ```
  * `401 Unauthorized`: Email atau password salah.

---

## 👤 User Profile (Auth Required)

### GET `/profile`

* **Description**: Mendapatkan profil pengguna yang sedang login.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Response**:

  * `200 OK`: Data profil pengguna.

---

### PUT `/profile`

* **Description**: Memperbarui data profil pengguna.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Request Body** (contoh):

  ```json
  {
    "username": "new_username",
    "email": "new_email@example.com"
  }
  ```
* **Response**:

  * `200 OK`: Profil berhasil diperbarui.

---

### PUT `/profile/password`

* **Description**: Mengubah password pengguna.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Request Body**:

  ```json
  {
    "oldPassword": "string",
    "newPassword": "string"
  }
  ```
* **Response**:

  * `200 OK`: Password berhasil diubah.
  * `400 Bad Request`: Password lama salah atau validasi gagal.

---

## 🍲 Recipe

### GET `/resep`

* **Description**: Mendapatkan daftar semua resep.
* **Response**:

  * `200 OK`: Array resep.

---

### GET `/resep/{id}`

* **Description**: Mendapatkan detail resep berdasarkan ID.
* **Params**:

  * `id`: ID dari resep.
* **Response**:

  * `200 OK`: Detail resep.
  * `404 Not Found`: Resep tidak ditemukan.

---

## 🔖 Bookmark (Auth Required)

### GET `/bookmark`

* **Description**: Mendapatkan semua bookmark pengguna.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Response**:

  * `200 OK`: Daftar bookmark.

---

### POST `/bookmark`

* **Description**: Menambahkan bookmark baru.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Request Body**:

  ```json
  {
    "recipeId": "string"
  }
  ```
* **Response**:

  * `201 Created`: Bookmark berhasil ditambahkan.

---

### DELETE `/bookmark/{id}`

* **Description**: Menghapus bookmark berdasarkan ID.
* **Headers**:

  ```
  Authorization: Bearer <token>
  ```
* **Params**:

  * `id`: ID dari bookmark.
* **Response**:

  * `200 OK`: Bookmark berhasil dihapus.
  * `404 Not Found`: Bookmark tidak ditemukan.


