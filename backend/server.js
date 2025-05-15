const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const produkRoutes = require('./routes/produk');
const pembayaranRoutes = require('./routes/pembayaran');

app.use('/api/produk', produkRoutes);
app.use('/api/bayar', pembayaranRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});