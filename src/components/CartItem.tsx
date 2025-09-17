import React from 'react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  savings: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, savings }) => {
  const itemTotal = (item.price * item.quantity).toFixed(2);
  const applySavingsToItem = item.id !== 4;
  const finalCost = applySavingsToItem
    ? (item.price * item.quantity - savings).toFixed(2)
    : itemTotal;

  return (
    <div className="mb-5 last:mb-0 border-t border-gray-200 pt-3 first:border-t-0">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-base font-medium text-gray-800 w-1/3">{item.name}</span>
        <span className="text-base text-gray-600 font-semibold w-1/3 text-center">
          £ {item.price.toFixed(2)}
        </span>
        <div className="flex items-center space-x-2 w-1/3 justify-end">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
          >
            +
          </button>
          <span className="text-base font-medium min-w-[1.5rem] text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-7 h-7 rounded flex items-center justify-center text-sm font-bold"
          >
            -
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-1">
        <div className="text-right">
          <span>
            Item price £{item.price.toFixed(2)} * {item.quantity} = £{itemTotal}
          </span>
        </div>

        {savings > 0 && item.id !== 4 && (
          <div className="text-right text-red-500">
            <span>Savings £{savings.toFixed(2)}</span>
          </div>
        )}

        <div className="text-right text-gray-800 font-medium">
          <span>Item cost £{finalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;


