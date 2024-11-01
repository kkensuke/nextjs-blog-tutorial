export type ProductId = 'basic' | 'pro' | 'enterprise';

export interface Product {
  id: ProductId;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular: boolean;
}

export interface CartItem {
  productId: ProductId;
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  addToCart: (productId: ProductId) => void;
  removeFromCart: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartTax: () => number;
}