import React, { createContext, useContext, useMemo, useState } from 'react';
import * as api from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ userId, children }) {
  const [cart, setCart] = useState({ items: [], promoCode: null });
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, taxes: 0, deliveryFee: 0, total: 0 });

  async function refreshCart() {
    const response = await api.getCart(userId);
    setCart(response.cart);
    setTotals(response.totals);
  }

  async function addItem(item) {
    const response = await api.addToCart(userId, item);
    setCart(response.cart);
    setTotals(response.totals);
  }

  async function changeQuantity(menuItemId, quantity) {
    const response = await api.updateQuantity(userId, menuItemId, quantity);
    setCart(response.cart);
    setTotals(response.totals);
  }

  async function applyPromo(code) {
    const response = await api.applyPromoCode(userId, code);
    setCart(response.cart);
    setTotals(response.totals);
    return response;
  }

  const value = useMemo(
    () => ({ cart, totals, refreshCart, addItem, changeQuantity, applyPromo }),
    [cart, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
