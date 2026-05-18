import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartToggle }) => {
  return (
    <div className="header">
      <h1>精品商店</h1>
      <div className="cart-icon" onClick={onCartToggle}>
        🛒 購物車
        <div className="cart-count">{cartCount}</div>
      </div>
    </div>
  );
};

export default Header;
