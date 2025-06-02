import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, Booking } from '../../lib/supabase';
import { 
  Settings, 
  Search, 
  Filter,
  MessageSquare,
  Smartphone,
  Laptop,
  Loader,
  X,
  Check 
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data as Booking[]);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (!selectedBooking || !response.trim()) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ admin_response: response })
        .eq('id', selectedBooking.id);

      if (error) throw error;

      setBookings(bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, admin_response: response }
          : booking
      ));
      setSelectedBooking(null);
      setResponse('');
      toast.success('Response submitted successfully');
    } catch (error) {
      toast.error('Failed to submit response');
    }
  };

  const handleWhatsAppChat = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.problem_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice = deviceFilter === 'all' || booking.device_type === deviceFilter;
    return matchesSearch && matchesDevice;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Manage Repair Bookings</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full md:w-64"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">All Devices</option>
              <option value="Phone">Phones</option>
              <option value="Laptop">Laptops</option>
            </select>
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Respond to Booking</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Booking Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p><strong>Customer:</strong> {selectedBooking.name}</p>
                <p><strong>Device:</strong> {selectedBooking.device_type}</p>
                <p><strong>Problem:</strong> {selectedBooking.problem_description}</p>
              </div>

              <label className="form-label">Your Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="form-input"
                rows={4}
                placeholder="Enter your response..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="btn btn-primary"
              >
                Submit Response
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                {booking.device_type === 'Phone' ? (
                  <Smartphone className="h-6 w-6 text-primary-600" />
                ) : (
                  <Laptop className="h-6 w-6 text-primary-600" />
                )}
                <div>
                  <h3 className="font-medium">{booking.name}</h3>
                  <p className="text-sm text-gray-500">{booking.phone}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleWhatsAppChat(booking.phone)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
                {booking.admin_response ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Responded
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Pending
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">{booking.problem_description}</p>
            </div>

            {booking.admin_response && (
              <div className="bg-primary-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-primary-700 mb-1">Your Response:</p>
                <p className="text-primary-600">{booking.admin_response}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedBooking(booking);
                  setResponse(booking.admin_response || '');
                }}
                className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
              >
                {booking.admin_response ? 'Edit Response' : 'Respond'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookingsPage;