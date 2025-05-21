const { getSession } = require('../auth');

function validateSession() {
  const user = getSession();
  if (!user) {
    throw new Error('Silakan login terlebih dahulu!');
  }
  return user;
}

module.exports = validateSession;
