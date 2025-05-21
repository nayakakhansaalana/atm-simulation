const { clearSession } = require('../auth.js');

function logout() {
  if (clearSession()) {
    console.log('Logout berhasil.');
  } else {
    console.log('Tidak ada akun yang login.');
  }
}

module.exports = logout;
