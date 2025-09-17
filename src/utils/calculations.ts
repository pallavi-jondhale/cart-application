import type { CartItem, Totals } from '../types';

export const specialOffers = {
  2: { 
    type: 'none' as const
  },
  3: { 
    type: 'buy_one_get_one_free' as const,
    description: 'When you buy a Cheese, you get a second Cheese free!'
  },
  4: { 
    type: 'soup_enables_bread_discount' as const,
    description: 'When you buy a Soup, you get a half price Bread!'
  },
  5: { 
    type: 'third_off' as const,
    discount: 0.333,
    description: 'Get a third off Butter!'
  }
};

export const calculateSavings = (item: CartItem, cart: CartItem[]): number => {
  // Cheese: Buy one get one free
  if (item.id === 3) {
    const freeItems = Math.floor(item.quantity / 2);
    return freeItems * item.price;
  }

  // Bread: Half-price per loaf, unlocked by soups in basket
  if (item.id === 1) {
    const soupInCart = cart.find(cartItem => cartItem.id === 4);
    if (!soupInCart) return 0;
    const discountedBreads = Math.min(item.quantity, soupInCart.quantity);
    return discountedBreads * (item.price / 2);
  }

  // Soup: No direct savings (it unlocks bread discount)
  if (item.id === 4) {
    return 0;
  }

  // Butter: One-third off each
  if (item.id === 5) {
    const butterOffer = specialOffers[5];
    return item.quantity * item.price * butterOffer.discount;
  }

  return 0;
};

export const calculateTotals = (cart: CartItem[]): Totals => {
  let subtotal = 0;
  let totalSavings = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  cart.forEach(item => {
    totalSavings += calculateSavings(item, cart);
  });

  return {
    subtotal: subtotal.toFixed(2),
    totalSavings: totalSavings.toFixed(2),
    total: (subtotal - totalSavings).toFixed(2)
  };
};


