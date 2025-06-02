import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Order } from '../../lib/supabase';
import { CheckCircle, Package, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) throw error;
      setOrder(data as Order);
    } catch (error: any) {
      toast.error('Failed to load order details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link 
            to="/products" 
            className="btn btn-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Received!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll process it shortly.
            </p>

            <div className="bg-gray-50  rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Order ID</p>
              <p className="text-lg font-medium">{order.order_id}</p>
            </div>

            <div className="space-y-4 mb-8">
              <Link 
                to={`/track-order?id=${order.order_id}`}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Package className="h-5 w-5 mr-2" />
                Track Order
              </Link>

              <Link 
                to="/products"
                className="btn btn-outline w-full"
              >
                Continue Shopping
              </Link>
            </div>

            {order.payment_method === 'whatsapp' && (
              <p className="text-sm text-gray-500">
                Please check WhatsApp for order confirmation and payment instructions.
              </p>
            )}

            {order.payment_method === 'bank_transfer' && (
              <p className="text-sm text-gray-500">
                Please complete your bank transfer and send the payment proof via WhatsApp.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;