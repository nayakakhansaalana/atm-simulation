const db = require('../db');
const validateSession = require('../utils/validateSession');

module.exports = async function checkBalance() {
  try {
    const user = validateSession();

    const [rows] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);

    if (rows.length === 0) {
      console.log('❌ Akun tidak ditemukan.');
      return;
    }

    const balance = rows[0].balance;
    console.log(`Saldo saat ini: Rp ${balance}`);
  } catch (error) {
    console.error('Gagal mengecek saldo:', error.message);
  }
};
