#!/usr/bin/env node
const { program } = require('commander');

// Import semua command
const register = require('./commands/register');
const login = require('./commands/login');
const checkBalance = require('./commands/checkBalance');
const deposit = require('./commands/deposit');
const withdraw = require('./commands/withdraw');
const transfer = require('./commands/transfer');
const history = require('./commands/history');
const logout = require('./commands/logout'); // Tambahkan ini jika belum

// Register Command
program
  .command('register <name> <pin>')
  .description('Membuat akun baru')
  .action(register);

// Login Command
program
  .command('login <accountId> <pin>')
  .description('Login ke akun')
  .action(login);

// Check Balance Command
program
  .command('check-balance')
  .description('Cek saldo akun login')
  .action(checkBalance);

// Deposit Command
program
  .command('deposit <amount>')
  .description('Setor saldo ke akun login')
  .action(deposit);

// Withdraw Command
program
  .command('withdraw <amount>')
  .description('Tarik tunai dari akun login')
  .action(withdraw);

// Transfer Command
program
  .command('transfer <targetAccountId> <amount>')
  .description('Transfer saldo ke akun lain')
  .action(transfer);

// Tambahkan logout
program
  .command('logout')
  .description('Logout dari akun saat ini')
  .action(logout);

// Tambahkan history
program
  .command('history')
  .description('Menampilkan riwayat transaksi dan menyimpannya ke file')
  .action(history);

// Harus berada DI BAWAH semua perintah
program.parse(process.argv);
