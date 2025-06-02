import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Order, Booking, formatPrice } from '../../../lib/supabase';
import { useAuth } from '../../../lib/auth';
import { 
  Package, 
  Settings, 
  User,
  Clock,
  ChevronRight,
  Loader,
  Smartphone,
  Laptop
} from 'lucide-react';

const UserDashboardPage = () => {
  const { session } = useAuth();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (ordersError) throw ordersError;
      setRecentOrders(orders as Order[]);

      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (bookingsError) throw bookingsError;
      setRecentBookings(bookings as Booking[]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    
    <div>
      <div className="mt-6 text-center text-sm">
        <Link
          to="/"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Back to Homepage
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>
          <p className="text-gray-600 mb-4">{session?.user.email}</p>
          <Link
            to="/dashboard/profile"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            Update Profile
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>

        {/* Orders Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center mb-4">
            <Package className="h-6 w-6 text-secondary-600 mr-2" />
            <h2 className="text-lg font-semibold">Orders</h2>
          </div>
          <p className="text-gray-600 mb-4">{recentOrders.length} recent orders</p>
          <Link
            to="/dashboard/orders"
            className="text-secondary-600 hover:text-secondary-700 font-medium flex items-center"
          >
            View Orders
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>

        {/* Bookings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-accent-600 mr-2" />
            <h2 className="text-lg font-semibold">Bookings</h2>
          </div>
          <p className="text-gray-600 mb-4">{recentBookings.length} recent bookings</p>
          <Link
            to="/dashboard/bookings"
            className="text-accent-600 hover:text-accent-700 font-medium flex items-center"
          >
            View Bookings
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link
            to="/dashboard/orders"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{order.order_id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <span
                    className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}
                    `}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link
            to="/dashboard/bookings"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View All
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {booking.device_type === 'Phone' ? (
                      <Smartphone className="h-5 w-5 text-primary-600 mr-2" />
                    ) : booking.device_type === 'Laptop' ? (
                      <Laptop className="h-5 w-5 text-primary-600 mr-2" />
                    ) : (
                      <Settings className="h-5 w-5 text-primary-600 mr-2" />
                    )}
                    <span className="font-medium">{booking.device_type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(booking.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{booking.problem_description}</p>
                {booking.admin_response && (
                  <p className="text-sm bg-primary-50 text-primary-700 p-2 rounded">
                    Response: {booking.admin_response}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
