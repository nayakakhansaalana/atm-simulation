const db = require('../db');
const validateSession = require('../utils/validateSession');

module.exports = async function transfer(targetId, amount) {
  try {
    const user = validateSession();

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.log('Jumlah transfer tidak valid.');
      return;
    }

    if (user.id === parseInt(targetId)) {
      console.log('Tidak bisa transfer ke akun sendiri.');
      return;
    }

    // Cek saldo user
    const [rows] = await db.query('SELECT balance FROM accounts WHERE id = ?', [user.id]);
    const currentBalance = rows[0]?.balance || 0;

    if (numericAmount > currentBalance) {
      console.log('Saldo tidak mencukupi untuk transfer.');
      return;
    }

    // Cek apakah target account ada
    const [targetRows] = await db.query('SELECT * FROM accounts WHERE id = ?', [targetId]);
    if (targetRows.length === 0) {
      console.log('Akun tujuan tidak ditemukan.');
      return;
    }

    // Jalankan transaksi atomik
    await db.query('START TRANSACTION');

    // Kurangi saldo pengirim
    await db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [numericAmount, user.id]);

    // Tambah saldo penerima
    await db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [numericAmount, targetId]);

    // Catat transaksi transfer_out
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, target_id, created_at) VALUES (?, ?, ?, ?, NOW())',
      [user.id, 'transfer_out', numericAmount, targetId]
    );

    // Catat transaksi transfer_in
    await db.query(
      'INSERT INTO transactions (account_id, type, amount, target_id, created_at) VALUES (?, ?, ?, ?, NOW())',
      [targetId, 'transfer_in', numericAmount, user.id]
    );

    await db.query('COMMIT');

    console.log(`Transfer berhasil ke akun #${targetId} sebesar Rp ${numericAmount}`);
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Gagal melakukan transfer:', error.message);
  }
};
