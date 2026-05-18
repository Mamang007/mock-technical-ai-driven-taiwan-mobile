import React from 'react';

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, searchTerm, onSearchChange, onCartToggle }) => {
  return (
    <div className="header">
      <h1>精品商店</h1>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="搜尋商品..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="cart-icon" onClick={onCartToggle}>
        🛒 購物車
        <div className="cart-count">{cartCount}</div>
      </div>
    </div>
  );
};

export default Header;
