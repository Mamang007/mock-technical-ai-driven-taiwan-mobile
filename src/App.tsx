import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import Loading from './components/Loading';
import { Product, CartItemType } from './types';

function App() {
  const [products] = useState<Product[]>([]);
  const [cart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const addToCart = (productId: number) => console.log('Add to cart', productId);
  const updateQuantity = (productId: number, change: number) => console.log('Update quantity', productId, change);
  const checkout = () => console.log('Checkout');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="container">
      <Header cartCount={cartCount} onCartToggle={toggleCart} />
      
      {isLoading && <Loading />}
      
      <ProductGrid products={products} onAddToCart={addToCart} />

      <CartSidebar 
        isOpen={isCartOpen}
        cart={cart}
        totalPrice={totalPrice}
        onToggle={toggleCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={checkout}
      />
    </div>
  );
}

export default App;
