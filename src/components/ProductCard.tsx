import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-medium text-gray-700">{product.name}</span>
        <span className="text-lg text-gray-600">£ {product.price.toFixed(2)}</span>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
      >
        Add
      </button>
    </div>
  );
};

export default ProductCard;


