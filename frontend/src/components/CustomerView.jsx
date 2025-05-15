import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import PaymentModal from './PaymentModal';

function CustomerView() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async (sort = false) => {
    try {
      const endpoint = sort 
        ? 'http://localhost:5000/api/produk/sorted' 
        : 'http://localhost:5000/api/produk';
        
      const res = await axios.get(endpoint);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (type) => {
    if (type === 'alphabet') {
      fetchProducts(true);
    }
  };

  const handlePaymentSuccess = () => {
    alert('Pembayaran berhasil!');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="customer-view">
      <h2>Katalog Produk</h2>
      
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={false}
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

export default CustomerView;