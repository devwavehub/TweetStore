import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Scale, Clock } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Terms & Conditions</h1>

          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Introduction</h2>
              </div>
              <p className="text-gray-600">
                Welcome to NextGadgets NG. By accessing our website and using our services,
                you agree to these terms and conditions. Please read them carefully before making
                any purchase or booking.
              </p>
            </div>

            {/* Products & Services */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Products & Services</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  All products sold through our platform are genuine and come with applicable warranties.
                  Product images are for illustration purposes and may slightly vary from the actual item.
                </p>
                <h3 className="font-medium text-gray-900">Product Returns</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Products must be returned within 7 days of delivery</li>
                  <li>Items must be unused and in original packaging</li>
                  <li>Shipping costs for returns are borne by the customer</li>
                  <li>Refunds will be processed within 5-7 business days</li>
                </ul>
              </div>
            </div>

            {/* Payment & Pricing */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Payment & Pricing</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  All prices are in Nigerian Naira (NGN) and include applicable taxes.
                  We accept payments through:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Bank Transfer</li>
                  <li>WhatsApp Payment Confirmation</li>
                </ul>
                <p>
                  Orders are processed only after payment confirmation. For bank transfers,
                  please send proof of payment via WhatsApp.
                </p>
              </div>
            </div>

            {/* Repair Services */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Repair Services</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our repair services are carried out by qualified technicians. By booking a repair:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You agree to our diagnostic process</li>
                  <li>Repair times may vary based on complexity</li>
                  <li>Parts replacement requires customer approval</li>
                  <li>We provide a 30-day warranty on repairs</li>
                </ul>
              </div>
            </div>

            {/* Privacy & Data */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Privacy & Data</h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  We collect and process personal data in accordance with Nigerian data protection laws:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Contact information for order processing</li>
                  <li>Device details for repair services</li>
                  <li>Payment information for transactions</li>
                </ul>
                <p>
                  Your data is securely stored and never shared with third parties without consent.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-gray-600">
                For any questions about these terms, please contact us at{' '}
                <a 
                  href="mailto:dammytechhub@gmail.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  dammytechhub@gmail.com
                </a>
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Last updated: March 15, 2025
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
