const db = require('../db');
const validateSession = require('../utils/validateSession');

module.exports = async function withdraw(amount) {
  try {
    const user = validateSession();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log('Jumlah penarikan tidak valid.');
      return;
    }

    // Ambil saldo terbaru
    const [rows] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);
    const currentBalance = rows[0]?.balance || 0;

    if (numericAmount > currentBalance) {
      console.log('Saldo tidak mencukupi untuk penarikan.');
      return;
    }

    // Update saldo
    await db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [numericAmount, user.id]);

    // Catat transaksi
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, created_at) VALUES (?, ?, ?, NOW())',
      [user.id, 'withdraw', numericAmount]
    );

    console.log(`Penarikan berhasil. Jumlah: Rp ${numericAmount}`);
  } catch (error) {
    console.error('Gagal melakukan penarikan:', error.message);
  }
};
