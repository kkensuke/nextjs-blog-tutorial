'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { STORE_CONFIG } from './config';
import type { ProductId, StoreState, CartItem } from './types';

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: ProductId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: ProductId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: ProductId, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const product = STORE_CONFIG.products[item.productId];
      return total + (product.price * item.quantity);
    }, 0);
  }, [cart]);

  const getCartTax = useCallback(() => {
    return getCartTotal() * STORE_CONFIG.tax.rate;
  }, [getCartTotal]);

  const value: StoreState = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartTax
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Utility functions
export function formatCurrency(amount: number): string {
  return `${STORE_CONFIG.currency.symbol}${amount.toFixed(2)}`;
}