import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
