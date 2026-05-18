import React from 'react';

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, searchTerm, onSearchChange, onCartToggle }) => {
  return (
    <header className="header">
      <h1>精品商店</h1>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="搜尋商品..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="搜尋商品"
        />
      </div>
      <button 
        className="cart-icon" 
        onClick={onCartToggle}
        aria-label={`購物車, ${cartCount} 件商品`}
      >
        🛒 購物車
        <div className="cart-count" aria-hidden="true">{cartCount}</div>
      </button>
    </header>
  );
};

export default Header;
