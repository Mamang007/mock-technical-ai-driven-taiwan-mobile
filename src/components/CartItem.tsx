import React from 'react';
import { CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, change: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">圖片</div>
      <div className="cart-item-details">
        <div className="cart-item-title">{item.product.name}</div>
        <div className="cart-item-price">NT$ {item.product.price}</div>
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.product.id, -1)}
          >
            -
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button 
            className="quantity-btn" 
            onClick={() => onUpdateQuantity(item.product.id, 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
