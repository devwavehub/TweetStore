import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MessageSquare, Home, ArrowLeft } from 'lucide-react';

const BookingSuccessPage = () => {
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/2348172452411', '_blank');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/booking"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Booking
            </Link>
            <Link 
              to="/"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Booking Successful!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for choosing our repair service. We'll be in touch with you shortly via WhatsApp.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppChat}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </button>

              <Link 
                to="/booking"
                className="btn btn-outline w-full flex items-center justify-center"
              >
                Make Another Booking
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t text-left">
              <h2 className="font-medium text-gray-900 mb-4">What happens next?</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                    1
                  </span>
                  <span>Our technician will review your booking details</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                    2
                  </span>
                  <span>We'll contact you via WhatsApp with a repair quote</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                    3
                  </span>
                  <span>Schedule a convenient time for your repair service</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;