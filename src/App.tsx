import React from 'react';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import { calculateSavings, calculateTotals } from './utils/calculations';
import type { Product } from './types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { addToCart, updateQuantity } from './store/cartSlice';

const initialProducts: Product[] = [
  { id: 1, name: 'Bread', price: 1.10 },
  { id: 2, name: 'Milk', price: 0.50 },
  { id: 3, name: 'Cheese', price: 0.90 },
  { id: 4, name: 'Soup', price: 0.60 },
  { id: 5, name: 'Butter', price: 1.20 }
];

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const products = initialProducts;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const totals = calculateTotals(cart);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>
            <div className="space-y-3">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Basket</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your basket is empty</p>
            ) : (
              <>
                <div className="space-y-0">
                  {cart.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      savings={calculateSavings(item, cart)}
                    />
                  ))}
                </div>

                <CartSummary
                  subtotal={totals.subtotal}
                  totalSavings={totals.totalSavings}
                  total={totals.total}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


