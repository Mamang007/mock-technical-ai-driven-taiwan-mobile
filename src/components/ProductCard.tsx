import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">圖片載入中...</div>
      <div className="product-title">{product.name}</div>
      <div className="product-price">NT$ {product.price}</div>
      <button 
        className="add-to-cart-btn" 
        onClick={() => onAddToCart(product.id)}
      >
        加入購物車
      </button>
    </div>
  );
};

export default ProductCard;
