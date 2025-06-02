import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../../store/store';
import { supabase, formatPrice, generateOrderId } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { 
  CreditCard, 
  MessageSquare, 
  Loader,
  Copy,
  CheckCircle,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

type PaymentMethod = 'whatsapp' | 'bank_transfer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp');
  const [bankInfo, setBankInfo] = useState<{
    bank_name: string;
    account_number: string;
    account_holder_name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: session?.user?.email || '',
    phone: '',
    address: ''
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const fetchBankInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_details')
        .select('*')
        .single();

      if (error) throw error;
      setBankInfo(data);
    } catch (error) {
      toast.error('Failed to load bank details');
    }
  };

  useEffect(() => {
    if (paymentMethod === 'bank_transfer') {
      fetchBankInfo();
    }
  }, [paymentMethod]);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleWhatsAppCheckout = (orderId: string) => {
    const items = cart.map(
      item => `${item.quantity}x ${item.product.name} @ ${formatPrice(item.product.price)}`
    ).join('\n');

    const message = `New Order #${orderId}:\n\n${items}\n\nTotal: ${formatPrice(total)}\n\nCustomer Details:\nName: ${userDetails.name}\nPhone: ${userDetails.phone}\nAddress: ${userDetails.address}`;

    const whatsappUrl = `https://wa.me/2348172452411?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please log in to continue');
      return;
    }

    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const orderId = generateOrderId();
      
      const { error } = await supabase
        .from('orders')
        .insert({
          order_id: orderId,
          user_id: session.user.id,
          items: cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name
          })),
          total,
          status: 'pending',
          payment_method: paymentMethod,
          user_details: userDetails
        });

      if (error) throw error;

      if (paymentMethod === 'whatsapp') {
        handleWhatsAppCheckout(orderId);
      }

      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error: any) {
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="btn btn-primary flex items-center justify-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Checkout</h1>
              <Link
                to="/products"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Shopping
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <p>Total</p>
                    <p>{formatPrice(total)}</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="form-label">
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      value={userDetails.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="whatsapp"
                        checked={paymentMethod === 'whatsapp'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-green-500 mr-2" />
                        WhatsApp Order
                      </span>
                    </label>
                    {paymentMethod === 'whatsapp' && (
                      <p className="mt-2 text-sm text-gray-600 ml-7">
                        Complete your order via WhatsApp for easy communication and payment instructions
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="flex items-center">
                        <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                        Bank Transfer
                      </span>
                    </label>
                  </div>

                  {paymentMethod === 'bank_transfer' && bankInfo && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-3">Bank Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Bank Name</p>
                          <div className="flex items-center">
                            <p className="font-medium mr-2">{bankInfo.bank_name}</p>
                            <button
                              type="button"
                              onClick={() => handleCopyText(bankInfo.bank_name)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Account Number</p>
                          <div className="flex items-center">
                            <p className="font-medium mr-2">{bankInfo.account_number}</p>
                            <button
                              type="button"
                              onClick={() => handleCopyText(bankInfo.account_number)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">Account Name</p>
                          <div className="flex items-center">
                            <p className="font-medium mr-2">{bankInfo.account_holder_name}</p>
                            <button
                              type="button"
                              onClick={() => handleCopyText(bankInfo.account_holder_name)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-gray-600">
                        Please transfer the exact amount and send your payment proof via WhatsApp
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin mx-auto" />
                ) : paymentMethod === 'whatsapp' ? (
                  'Continue to WhatsApp'
                ) : (
                  'Complete Order'
                )}
              </button>

              <Link
                to="/products"
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;