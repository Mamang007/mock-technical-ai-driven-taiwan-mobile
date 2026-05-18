import { forwardRef } from 'react';
import type { CartItemType } from '../types';
import CartItem from './CartItem';

interface CartSidebarProps {
  isOpen: boolean;
  cart: CartItemType[];
  totalPrice: number;
  onToggle: () => void;
  onUpdateQuantity: (productId: number, change: number) => void;
  onCheckout: () => void;
}

const CartSidebar = forwardRef<HTMLDivElement, CartSidebarProps>(({
  isOpen,
  cart,
  totalPrice,
  onToggle,
  onUpdateQuantity,
  onCheckout
}, ref) => {
  return (
    <aside 
      ref={ref}
      className={`cart-sidebar ${isOpen ? 'open' : ''}`}
      aria-labelledby="cart-title"
      aria-hidden={!isOpen}
    >
      <div className="cart-header">
        <h2 id="cart-title">購物車</h2>
        <button 
          className="close-cart" 
          onClick={onToggle}
          aria-label="關閉購物車"
        >
          ×
        </button>
      </div>
      <div id="cartItems" role="list">
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>
            購物車是空的
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.product.id} role="listitem">
              <CartItem 
                item={item} 
                onUpdateQuantity={onUpdateQuantity} 
              />
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <div className="total-price" aria-live="polite">
          總計: NT$ <span>{totalPrice}</span>
        </div>
        <button 
          className="checkout-btn" 
          onClick={onCheckout}
          disabled={cart.length === 0}
        >
          結帳
        </button>
      </div>
    </aside>
  );
});

CartSidebar.displayName = 'CartSidebar';

export default CartSidebar;
