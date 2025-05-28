const users = require('../../users'); 
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const getProfile = async (request, h) => {
  const user = request.auth; // data hasil decode JWT
  return h.response({
    error: false,
    message: 'Berhasil mendapatkan profil',
    user,
  }).code(200);
};

const updateProfile = async (request, h) => {
  const { name, photo } = request.payload;
  const userId = request.auth.credentials.id;

  if (!name || name.length < 3) {
    return Boom.badRequest("Nama harus diisi minimal 3 karakter.");
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return Boom.notFound("User tidak ditemukan");
  }

  user.name = name;
  user.photo = photo || "";

  return h.response({
    error: false,
    message: "Profil berhasil diperbarui",
    user: { id: user.id, name: user.name, photo: user.photo, email: user.email }
  });
};

const updatePassword = async (request, h) => {
  const { currentPassword, newPassword } = request.payload;
  const userId = request.auth.credentials.id;

  const user = users.find(u => u.id === userId);
  if (!user) return Boom.notFound("User tidak ditemukan");

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return Boom.unauthorized("Password saat ini salah");

  if (newPassword.length < 8) return Boom.badRequest("Password baru minimal 8 karakter");

  user.password = await bcrypt.hash(newPassword, 10);

  return h.response({ error: false, message: "Password berhasil diperbarui" });
};

module.exports = { getProfile, updateProfile, updatePassword };
