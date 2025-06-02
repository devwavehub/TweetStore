import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Loader, AlertCircle } from 'lucide-react';
import { supabase, Order } from '../../lib/supabase';
import { formatPrice } from '../../lib/supabase';

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderId) {
      setError('Please enter an order ID');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) throw error;

      if (!data) {
        setError('Order not found');
        return;
      }

      setOrder(data as Order);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch order');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <Package className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-gray-600">
              Enter your order ID to check the current status
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orderId" className="form-label">
                  Order ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="orderId"
                    placeholder="e.g., ORD-DTX73KLM"
                    className="form-input pl-10"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin mx-auto" />
                ) : (
                  'Track Order'
                )}
              </button>
            </form>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
            >
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 space-y-6"
            >
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.order_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Order Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div>
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center font-medium">
                      <p>Total</p>
                      <p>{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {order.user_details && (
                <div>
                  <h3 className="font-medium mb-3">Delivery Details</h3>
                  <div className="text-gray-600">
                    <p>{order.user_details.name}</p>
                    <p>{order.user_details.phone}</p>
                    <p className="whitespace-pre-line">{order.user_details.address}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;