const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.get('/sorted', (req, res) => {
  db.query('SELECT * FROM produk ORDER BY nama ASC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nama, harga } = req.body;
  db.query('INSERT INTO produk (nama, harga) VALUES (?, ?)', 
    [nama, harga], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, nama, harga });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM produk WHERE id = ?', 
    [req.params.id], 
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Produk dihapus' });
    }
  );
});

module.exports = router;