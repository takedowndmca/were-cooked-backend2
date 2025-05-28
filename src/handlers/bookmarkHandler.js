const fs = require('fs');
const path = require('path');
const bookmarksPath = path.join(__dirname, '../data/bookmarks.json');

function loadBookmarks() {
  try {
    const raw = fs.readFileSync(bookmarksPath, 'utf-8');
    return raw ? JSON.parse(raw) : []; // ✅ fallback jika kosong
  } catch (err) {
    return []; // ✅ fallback jika file belum ada
  }
}

// Ambil semua bookmark milik user
async function getBookmarks(request, h) {
  const userId = request.auth.credentials.id;
  const allBookmarks = loadBookmarks();

  const userBookmarks = allBookmarks.filter(b => b.userId === userId);
  return h.response({ error: false, data: userBookmarks }).code(200);
}

// Tambah bookmark
async function addBookmark(request, h) {
  const userId = request.auth.credentials.id;
  const { recipeId, title, image } = request.payload;

  let allBookmarks = loadBookmarks();
  fs.writeFileSync(bookmarksPath, JSON.stringify(allBookmarks, null, 2));

  const exists = allBookmarks.find(b => b.userId === userId && b.recipeId === recipeId);
  if (exists) {
    return h.response({ error: true, message: 'Resep sudah dibookmark' }).code(409);
  }

  const newBookmark = {
    id: Date.now().toString(),
    userId,
    recipeId,
    title,
    image
  };

  allBookmarks.push(newBookmark);
  fs.writeFileSync(bookmarksPath, JSON.stringify(allBookmarks, null, 2));
  return h.response({ error: false, message: 'Bookmark berhasil ditambahkan' }).code(201);
}

// Hapus bookmark
async function deleteBookmark(request, h) {
  const userId = request.auth.credentials.id;
  const { id } = request.params;

  let allBookmarks = loadBookmarks();
  fs.writeFileSync(bookmarksPath, JSON.stringify(allBookmarks, null, 2));

  const beforeLength = allBookmarks.length;
  allBookmarks = allBookmarks.filter(b => !(b.userId === userId && b.id === id));

  if (allBookmarks.length === beforeLength) {
    return h.response({ error: true, message: 'Bookmark tidak ditemukan' }).code(404);
  }

  fs.writeFileSync(bookmarksPath, JSON.stringify(allBookmarks, null, 2));
  return h.response({ error: false, message: 'Bookmark dihapus' }).code(200);
}

module.exports = {
  getBookmarks,
  addBookmark,
  deleteBookmark
};
