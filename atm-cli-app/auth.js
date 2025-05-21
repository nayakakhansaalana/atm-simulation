const fs = require('fs');
const path = require('path');
const sessionPath = path.join(__dirname, 'session.json');

function setSession(account) {
  fs.writeFileSync(sessionPath, JSON.stringify(account), 'utf8');
}

function getSession() {
  if (!fs.existsSync(sessionPath)) return null;
  const data = fs.readFileSync(sessionPath, 'utf8');
  return JSON.parse(data);
}

function clearSession() {
  if (fs.existsSync(sessionPath)) {
    fs.unlinkSync(sessionPath);
    return true;
  }
  return false;
}

module.exports = {
  setSession,
  getSession,
  clearSession
};
