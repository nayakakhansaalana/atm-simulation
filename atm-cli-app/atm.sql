-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS atm;

-- Gunakan database atm
USE atm;

-- Buat tabel accounts
CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  pin VARCHAR(10) NOT NULL, -- Simpan dalam bentuk plain/hashing jika perlu
  balance DECIMAL(15, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel transactions
CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  type ENUM('deposit', 'withdraw', 'transfer_in', 'transfer_out') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  target_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (target_id) REFERENCES accounts(id)
);
