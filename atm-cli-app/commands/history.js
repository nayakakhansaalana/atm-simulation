const db = require('../db');
const fs = require('fs');
const path = require('path');
const validateSession = require('../utils/validateSession');

async function history() {
  const session = validateSession();
  try {
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE account_id = ? ORDER BY created_at DESC LIMIT 10`,
      [session.id]
    );

    const lines = [];

    if (rows.length === 0) {
      console.log('Tidak ada transaksi terakhir.');
      lines.push('Tidak ada transaksi terakhir.\n');
    } else {
      console.log('Riwayat Transaksi:');
      lines.push('Riwayat Transaksi:\n');

      rows.forEach(tx => {
        const info = `${tx.created_at.toISOString()} | ${tx.type.toUpperCase()} | Rp${tx.amount} ${tx.target_id ? `(ke/dari Akun #${tx.target_id})` : ''}`;
        console.log(info);
        lines.push(info);
      });
    }

    const filename = path.join(__dirname, '../transaction-history.txt');
    fs.writeFileSync(filename, lines.join('\n'), 'utf8');
    console.log(`Riwayat disimpan ke file: ${filename}`);

  } catch (err) {
    console.error('Gagal mengambil atau menyimpan riwayat transaksi:', err.message);
  }
}

module.exports = history;
