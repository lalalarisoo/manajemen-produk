const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM pembayaran ORDER BY tanggal DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/filter', (req, res) => {
  const { filter } = req.query;
  let query = '';
  
  switch(filter) {
    case 'today':
      query = 'SELECT * FROM pembayaran WHERE DATE(tanggal) = CURDATE() ORDER BY tanggal DESC';
      break;
    case 'yesterday':
      query = 'SELECT * FROM pembayaran WHERE DATE(tanggal) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) ORDER BY tanggal DESC';
      break;
    case 'tomorrow':
      query = 'SELECT * FROM pembayaran WHERE DATE(tanggal) = DATE_ADD(CURDATE(), INTERVAL 1 DAY) ORDER BY tanggal DESC';
      break;
    default:
      query = 'SELECT * FROM pembayaran ORDER BY tanggal DESC';
  }
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/total', (req, res) => {
  const { filter } = req.query;
  let query = '';
  
  switch(filter) {
    case 'today':
      query = 'SELECT SUM(total_harga) as total FROM pembayaran WHERE DATE(tanggal) = CURDATE()';
      break;
    case 'yesterday':
      query = 'SELECT SUM(total_harga) as total FROM pembayaran WHERE DATE(tanggal) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)';
      break;
    case 'tomorrow':
      query = 'SELECT SUM(total_harga) as total FROM pembayaran WHERE DATE(tanggal) = DATE_ADD(CURDATE(), INTERVAL 1 DAY)';
      break;
    default:
      query = 'SELECT SUM(total_harga) as total FROM pembayaran';
  }
  
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ total: results[0].total || 0 });
  });
});

router.post('/', (req, res) => {
  const { nama_pembeli, nama_produk, jumlah, total_harga } = req.body;
  
  if (!nama_pembeli || !nama_produk || !jumlah || !total_harga) {
    return res.status(400).json({ message: 'Lengkapi semua data!' });
  }
  
  db.query(
    'INSERT INTO pembayaran (nama_pembeli, nama_produk, jumlah, total_harga) VALUES (?, ?, ?, ?)',
    [nama_pembeli, nama_produk, jumlah, total_harga],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Pembayaran berhasil dicatat', id: result.insertId });
    }
  );
});

module.exports = router;