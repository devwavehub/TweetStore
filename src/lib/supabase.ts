import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Phones' | 'Laptops' | 'Accessories';
  images: string[];
  created_at: string;
};

export type CartItem = {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product: Product;
  created_at: string;
};

export type Order = {
  id: string;
  order_id: string;
  user_id: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'whatsapp' | 'bank_transfer';
  created_at: string;
  user_details?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};

export type Booking = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  device_type: 'Phone' | 'Laptop';
  problem_description: string;
  admin_response?: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export type BankInfo = {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
  updated_at: string;
};

// Helper function to generate a unique order ID
export const generateOrderId = () => {
  const prefix = 'ORD-DTX';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${prefix}${result}`;
};

// Format price in Naira
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};