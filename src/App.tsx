import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './lib/auth';

// Layout components
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import ContactPage from './pages/public/ContactPage';
import TermsPage from './pages/public/TermsPage';
import AdminLoginPage from './pages/public/AdminLoginPage';
import OrderTrackingPage from './pages/public/OrderTrackingPage';

// Authenticated user pages
import ProductsPage from './pages/user/ProductsPage';
import ProductDetailsPage from './pages/user/ProductDetailsPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import OrderConfirmationPage from './pages/user/OrderConfirmationPage';
import BookingPage from './pages/user/BookingPage';
import BookingSuccessPage from './pages/user/BookingSuccessPage';
import UserDashboardPage from './pages/user/dashboard/UserDashboardPage';
import UserProfilePage from './pages/user/dashboard/UserProfilePage';
import UserOrdersPage from './pages/user/dashboard/UserOrdersPage';
import UserBookingsPage from './pages/user/dashboard/UserBookingsPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageBookingsPage from './pages/admin/ManageBookingsPage';
import ManageContactMessagesPage from './pages/admin/ManageContactMessagesPage';
import UpdateBankInfoPage from './pages/admin/UpdateBankInfoPage';

// Route guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  const location = useLocation();
  const { session, isLoading } = useAuth();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/track-order" element={<OrderTrackingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
      </Route>

      {/* Protected user routes */}
      <Route element={<ProtectedRoute session={session} />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        
        {/* User dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/profile" element={<UserProfilePage />} />
          <Route path="/dashboard/orders" element={<UserOrdersPage />} />
          <Route path="/dashboard/bookings" element={<UserBookingsPage />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<ManageProductsPage />} />
          <Route path="/admin/orders" element={<ManageOrdersPage />} />
          <Route path="/admin/bookings" element={<ManageBookingsPage />} />
          <Route path="/admin/messages" element={<ManageContactMessagesPage />} />
          <Route path="/admin/bank-info" element={<UpdateBankInfoPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;