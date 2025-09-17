export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Totals {
  subtotal: string;
  totalSavings: string;
  total: string;
}

