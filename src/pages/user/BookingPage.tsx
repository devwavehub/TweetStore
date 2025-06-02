import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { 
  Smartphone, 
  Laptop, 
  MessageSquare, 
  Loader,
  ArrowLeft,
  Home
} from 'lucide-react';
import toast from 'react-hot-toast';

type DeviceType = 'Phone' | 'Laptop';

const BookingPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device_type: 'Phone' as DeviceType,
    problem_description: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppBooking = (bookingDetails: typeof formData) => {
    const message = `New Repair Booking:\n\nName: ${bookingDetails.name}\nPhone: ${bookingDetails.phone}\nDevice Type: ${bookingDetails.device_type}\n\nProblem Description:\n${bookingDetails.problem_description}`;

    const whatsappUrl = `https://wa.me/2348172452411?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please log in to book a repair');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: session.user.id,
          ...formData
        });

      if (error) throw error;

      handleWhatsAppBooking(formData);
      navigate('/booking-success');
    } catch (error: any) {
      toast.error('Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Link>
              <h1 className="text-3xl font-bold">Book a Repair Service</h1>
            </div>
            <Link 
              to="/"
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="John Doe"
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 08012345678"
                />
              </div>

              <div>
                <label htmlFor="device_type" className="form-label">
                  Device Type
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <label className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                    ${formData.device_type === 'Phone' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}>
                    <input
                      type="radio"
                      name="device_type"
                      value="Phone"
                      checked={formData.device_type === 'Phone'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <Smartphone className="h-6 w-6 mr-2" />
                    <span>Phone</span>
                  </label>

                  <label className={`
                    flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                    ${formData.device_type === 'Laptop' 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}>
                    <input
                      type="radio"
                      name="device_type"
                      value="Laptop"
                      checked={formData.device_type === 'Laptop'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <Laptop className="h-6 w-6 mr-2" />
                    <span>Laptop</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="problem_description" className="form-label">
                  Problem Description
                </label>
                <textarea
                  id="problem_description"
                  name="problem_description"
                  required
                  value={formData.problem_description}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input"
                  placeholder="Please describe the issue you're experiencing..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Book Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 bg-primary-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                  1
                </span>
                <span>Submit your booking details above</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                  2
                </span>
                <span>Receive confirmation via WhatsApp</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                  3
                </span>
                <span>Get a repair quote and schedule your service</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;