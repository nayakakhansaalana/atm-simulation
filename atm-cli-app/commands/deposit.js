const db = require('../db');
const validateSession = require('../utils/validateSession');

module.exports = async function deposit(amount) {
  try {
    const user = validateSession();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log('Jumlah deposit tidak valid.');
      return;
    }

    // Update saldo
    await db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [numericAmount, user.id]);

    // Catat transaksi
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, created_at) VALUES (?, ?, ?, NOW())',
      [user.id, 'deposit', numericAmount]
    );

    console.log(`Deposit berhasil. Jumlah: Rp ${numericAmount}`);
  } catch (error) {
    console.error('Gagal melakukan deposit:', error.message);
  }
};
