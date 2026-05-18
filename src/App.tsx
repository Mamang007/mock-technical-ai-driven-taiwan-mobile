import { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import Loading from './components/Loading';
import Toast from './components/Toast';
import { Product, CartItemType } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const cartSidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  // Click outside to close cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCartOpen && 
          cartSidebarRef.current && 
          !cartSidebarRef.current.contains(event.target as Node) &&
          !(event.target as HTMLElement).closest('.cart-icon')) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const loadProducts = () => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      try {
        if (Math.random() < 0.05) {
          throw new Error('無法載入商品，請稍後再試。');
        }

        const mockProducts: Product[] = [
          { id: 1, name: '無線藍牙耳機', price: 2999, image: 'earphones.jpg' },
          { id: 2, name: '智慧手錶', price: 8999, image: 'smartwatch.jpg' },
          { id: 3, name: '便攜式充電器', price: 1299, image: 'powerbank.jpg' },
          { id: 4, name: '無線滑鼠', price: 899, image: 'mouse.jpg' },
          { id: 5, name: '機械鍵盤', price: 3999, image: 'keyboard.jpg' },
          { id: 6, name: '網路攝影機', price: 2199, image: 'webcam.jpg' },
          { id: 7, name: 'USB隨身碟', price: 599, image: 'usb.jpg' },
          { id: 8, name: '桌面擴音器', price: 1599, image: 'speaker.jpg' }
        ];
        setProducts(mockProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === productId);
      if (existingItem) {
        return currentCart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...currentCart, { product, quantity: 1 }];
      }
    });
    showToast(`已將 ${product.name} 加入購物車`);
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(currentCart => {
      return currentCart
        .map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity + change } 
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const checkout = () => {
    if (cart.length === 0) {
      showToast('購物車是空的！');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('結帳成功！感謝您的購買。');
      setCart([]);
      setIsCartOpen(false);
    }, 1500);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Header 
        cartCount={cartCount} 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartToggle={toggleCart} 
      />
      
      <main aria-busy={isLoading}>
        {isLoading && <Loading />}
        
        {error ? (
          <section className="error-section" style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>{error}</p>
            <button className="add-to-cart-btn" style={{ width: 'auto' }} onClick={loadProducts}>
              重試
            </button>
          </section>
        ) : (
          !isLoading && (
            <section aria-label="產品列表">
              <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
            </section>
          )
        )}
      </main>

      <CartSidebar 
        ref={cartSidebarRef}
        isOpen={isCartOpen}
        cart={cart}
        totalPrice={totalPrice}
        onToggle={toggleCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={checkout}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default App;
