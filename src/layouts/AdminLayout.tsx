import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/auth';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  Settings,
  Home
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminSignOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    adminSignOut();
    navigate('/');
  };

  const navigation = [
    { name: 'Back to Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', href: '/admin/orders', icon: Package },
    { name: 'Bookings', href: '/admin/bookings', icon: Settings },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Bank Info', href: '/admin/bank-info', icon: CreditCard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`md:hidden ${sidebarOpen ? 'fixed inset-0 flex z-40' : ''}`}>
        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0\" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
        )}

        {/* Sidebar component */}
        <div className={`fixed inset-y-0 left-0 flex flex-col w-full max-w-xs transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white`}>
          <div className="flex items-center justify-between px-4 py-5 bg-primary-700">
            <div className="text-xl font-semibold text-white">Admin Panel</div>
            <button
              type="button"
              className="text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? 'text-primary-700' : 'text-gray-500 group-hover:text-gray-500'
                    } mr-3 h-6 w-6`}
                  />
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md w-full"
              >
                <LogOut className="text-gray-500 group-hover:text-gray-500 mr-3 h-6 w-6" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 py-2 bg-primary-700 text-white">
                <div className="text-xl font-semibold">Admin Panel</div>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive(item.href) ? 'text-primary-700' : 'text-gray-500 group-hover:text-gray-500'
                      } mr-3 h-5 w-5`}
                    />
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                >
                  <LogOut className="text-gray-500 group-hover:text-gray-500 mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <motion.div 
            className="py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;