import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/auth';
import { ShoppingCart, Menu, X, Smartphone, User, Search } from 'lucide-react';
import { useStore } from '../../store/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useStore((state) => state.cart);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 text-transparent bg-clip-text">
             NextGadgets NG
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Track Order
            </Link>
            
            {/* Auth links or user menu */}
            {session ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <Link 
                  to="/cart" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            {session && (
              <Link 
                to="/cart" 
                className="text-gray-700 hover:text-primary-600 transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-4">
              <Link 
                to="/products" 
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Contact
              </Link>
              <Link 
                to="/track-order" 
                className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Track Order
              </Link>
              
              {/* Auth links */}
              {session ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    My Account
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;