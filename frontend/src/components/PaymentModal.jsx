import React, { useState } from 'react';
import axios from 'axios';

function PaymentModal({ product, onClose, onPaymentSuccess }) {
  const [nama_pembeli, setNamaPembeli] = useState('');
  const [jumlah, setJumlah] = useState(1);
  const [error, setError] = useState('');

  const totalHarga = product ? product.harga * jumlah : 0;

  const handlePayment = async () => {
    if (!nama_pembeli || !jumlah || jumlah < 1) {
      setError('Lengkapi semua data!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bayar', {
        nama_pembeli,
        nama_produk: product.nama,
        jumlah,
        total_harga: totalHarga
      });

      if (response.data) {
        onPaymentSuccess();
        onClose();
      }
    } catch (error) {
      setError('Gagal melakukan pembayaran.');
      console.error('Payment error:', error);
    }
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <h2>Pembayaran untuk: {product.nama}</h2>
        <div className="form-group">
          <label>Nama Pembeli:</label>
          <input
            type="text"
            value={nama_pembeli}
            onChange={(e) => setNamaPembeli(e.target.value)}
            placeholder="Masukkan nama pembeli"
          />
        </div>
        <div className="form-group">
          <label>Jumlah:</label>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(parseInt(e.target.value) || 0)}
            min="1"
          />
        </div>
        <div className="total">
          <p>Total Harga: Rp {totalHarga.toLocaleString()}</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>
            Batal
          </button>
          <button className="pay-btn" onClick={handlePayment}>
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;