const db = require('../db');
const { setSession } = require('../auth');

async function login(id, pin) {
  try {
    const [rows] = await db.query('SELECT * FROM accounts WHERE id = ? AND pin = ?', [id, pin]);

    if (rows.length === 0) {
      console.log('Login gagal: ID atau PIN salah.');
      return;
    }

    const account = rows[0];
    setSession(account); // <=== Ini fungsi yang benar
    console.log(`Login berhasil. Selamat datang, ${account.name}!`);
  } catch (err) {
    console.error('Terjadi kesalahan saat login:', err.message);
  }
}

module.exports = login;
