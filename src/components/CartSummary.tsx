import React from 'react';

interface CartSummaryProps {
  subtotal: string;
  totalSavings: string;
  total: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, totalSavings, total }) => {
  return (
    <div className="space-y-3 text-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Sub Total:</span>
        <span>£ {subtotal}</span>
      </div>
      
      {parseFloat(totalSavings) > 0 && (
        <div className="flex justify-between text-black-600">
          <span className="font-semibold">Savings:</span>
          <span>£ {totalSavings}</span>
        </div>
      )}
      
      <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
        <span>Total Amount:</span>
        <span>£ {total}</span>
      </div>
    </div>
  );
};

export default CartSummary;


