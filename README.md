﻿# manajemen-produk
 Tugas Eksplorasi Pertemuan 11 Pemrograman Web Lanjut 
 - Integrasi antara Frontend(React.js) dan backend(Node.js + Express.js) yang terhubung dengan database MySQL melalui studi kasus manajemen produk dan transaksi pembayaran
 - Database:
CREATE DATABASE db_p11;
USE db_p11;
CREATE TABLE produk (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nama VARCHAR(100),
 harga INT
);
CREATE TABLE pembayaran (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nama_pembeli VARCHAR(100),
 nama_produk VARCHAR(100),
 jumlah INT,
 total_harga INT,
 tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
);
