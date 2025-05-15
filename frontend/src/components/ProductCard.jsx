import React from 'react';

function ProductCard({ product, isAdmin = false, onDelete, onBuy }) {
  return (
    <div className="product-card">
      <h3>{product.nama}</h3>
      <p className="price">Rp {product.harga.toLocaleString()}</p>
      <div className="button-group">
        {isAdmin && (
          <button 
            className="delete-btn"
            onClick={() => onDelete(product.id)}
          >
            Hapus
          </button>
        )}
        <button 
          className="buy-btn"
          onClick={() => onBuy(product)}
        >
          Bayar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;