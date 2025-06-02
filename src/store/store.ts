import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, Product } from '../lib/supabase';

// Cart item type
export type CartItem = {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
};

// Store state type
interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

// Create store with persistence
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      // Add item to cart
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product_id === product.id);
        
        if (existingItem) {
          // Update quantity if item exists
          set({
            cart: cart.map(item => 
              item.product_id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            )
          });
        } else {
          // Add new item
          set({
            cart: [...cart, {
              id: crypto.randomUUID(),
              product_id: product.id,
              product,
              quantity
            }]
          });
        }
      },
      
      // Remove item from cart
      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.product_id !== productId)
        });
      },
      
      // Update item quantity
      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map(item => 
            item.product_id === productId 
              ? { ...item, quantity } 
              : item
          )
        });
      },
      
      // Clear entire cart
      clearCart: () => set({ cart: [] }),
      
      // Toggle cart visibility
      toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
      
      // Close cart
      closeCart: () => set({ isCartOpen: false }),
      
      // Open cart
      openCart: () => set({ isCartOpen: true }),
    }),
    {
      name: 'cart-storage', // local storage key
      partialize: (state) => ({ cart: state.cart }), // only persist cart items
    }
  )
);