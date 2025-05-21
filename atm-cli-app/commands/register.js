const db = require('../db');

module.exports = async function register(name, pin) {
  try {
    if (!name || !pin) {
      console.log('Nama dan PIN wajib diisi.');
      return;
    }

    const [result] = await db.query(
      'INSERT INTO accounts (name, pin, balance, created_at) VALUES (?, ?, 0, NOW())',
      [name, pin]
    );

    console.log(`Akun berhasil dibuat. Nomor akun Anda: ${result.insertId}`);
  } catch (error) {
    console.error('Gagal membuat akun:', error.message);
  }
};
