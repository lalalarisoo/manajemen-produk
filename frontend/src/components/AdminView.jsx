import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import PaymentModal from './PaymentModal';

function AdminView() {
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [form, setForm] = useState({ nama: '', harga: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async (sort = false) => {
    try {
      const endpoint = sort ? 'http://localhost:5000/api/produk/sorted' : 'http://localhost:5000/api/produk';
      const res = await axios.get(endpoint);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchPayments = async (filter = 'all') => {
    try {
      const endpoint = filter === 'all' 
        ? 'http://localhost:5000/api/bayar' 
        : `http://localhost:5000/api/bayar/filter?filter=${filter}`;
      
      const res = await axios.get(endpoint);
      setPayments(res.data);
      
      const totalRes = await axios.get(`http://localhost:5000/api/bayar/total?filter=${filter}`);
      setTotalRevenue(totalRes.data.total);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const addProduct = async () => {
    if (!form.nama || !form.harga) {
      alert('Nama dan harga produk harus diisi!');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/produk', {
        nama: form.nama,
        harga: Number(form.harga)
      });
      fetchProducts();
      setForm({ nama: '', harga: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/produk/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleFilterChange = (type, value = null) => {
    if (type === 'alphabet') {
      fetchProducts(true);
    } else if (type === 'date') {
      setDateFilter(value);
      fetchPayments(value);
    }
  };

  const handlePaymentSuccess = () => {
    fetchPayments(dateFilter);
    alert('Pembayaran berhasil!');
  };

  useEffect(() => {
    fetchProducts();
    fetchPayments();
  }, []);

  return (
    <div className="admin-view">
      <h2>Panel Admin</h2>
      
      <div className="add-product-form">
        <h3>Tambah Produk Baru</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nama Produk"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
          <input
            type="number"
            placeholder="Harga"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
          />
          <button onClick={addProduct}>Tambah</button>
        </div>
      </div>

      <div className="product-section">
        <h3>Daftar Produk</h3>
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={true}
                onDelete={deleteProduct}
                onBuy={(product) => {
                  setSelectedProduct(product);
                  setShowModal(true);
                }}
              />
            ))
          ) : (
            <p>Tidak ada produk tersedia.</p>
          )}
        </div>
      </div>

      <div className="payment-section">
        <h3>Riwayat Pembayaran</h3>
        <FilterBar onFilterChange={handleFilterChange} showDateFilter={true} />
        
        <div className="total-revenue">
          <h4>Total Pendapatan: Rp {totalRevenue ? totalRevenue.toLocaleString() : '0'}</h4>
        </div>
        
        <table className="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pembeli</th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Total Harga</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.nama_pembeli}</td>
                  <td>{payment.nama_produk}</td>
                  <td>{payment.jumlah}</td>
                  <td>Rp {payment.total_harga.toLocaleString()}</td>
                  <td>{new Date(payment.tanggal).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Tidak ada data pembayaran.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PaymentModal
          product={selectedProduct}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default AdminView;