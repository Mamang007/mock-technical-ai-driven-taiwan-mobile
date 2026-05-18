import React from 'react';
import { CartItemType } from '../types';
import CartItem from './CartItem';

interface CartSidebarProps {
  isOpen: boolean;
  cart: CartItemType[];
  totalPrice: number;
  onToggle: () => void;
  onUpdateQuantity: (productId: number, change: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  cart,
  totalPrice,
  onToggle,
  onUpdateQuantity,
  onCheckout
}) => {
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>購物車</h2>
        <button className="close-cart" onClick={onToggle}>×</button>
      </div>
      <div id="cartItems">
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>
            購物車是空的
          </p>
        ) : (
          cart.map((item) => (
            <CartItem 
              key={item.product.id} 
              item={item} 
              onUpdateQuantity={onUpdateQuantity} 
            />
          ))
        )}
      </div>
      <div className="cart-total">
        <div className="total-price">
          總計: NT$ <span>{totalPrice}</span>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          結帳
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
