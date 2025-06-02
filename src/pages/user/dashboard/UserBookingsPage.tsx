import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, Booking } from '../../../lib/supabase';
import { useAuth } from '../../../lib/auth';
import { 
  Settings, 
  Search, 
  MessageSquare,
  Smartphone,
  Laptop,
  Loader 
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserBookingsPage = () => {
  const { session } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookings(session.user.id);
    }
  }, [session]);

  const fetchBookings = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data as Booking[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.problem_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice = deviceFilter === 'all' || booking.device_type === deviceFilter;
    return matchesSearch && matchesDevice;
  });

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/2348172452411', '_blank');
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
      <h1 className="text-2xl font-bold mb-8">My Repair Bookings</h1>

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

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500 mb-6">
            {bookings.length === 0
              ? "You haven't made any repair bookings yet"
              : "No bookings match your search criteria"}
          </p>
          <button
            onClick={handleWhatsAppChat}
            className="btn btn-primary flex items-center justify-center mx-auto"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat on WhatsApp
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {booking.device_type === 'Phone' ? (
                    <Smartphone className="h-6 w-6 text-primary-600" />
                  ) : (
                    <Laptop className="h-6 w-6 text-primary-600" />
                  )}
                  <div>
                    <h3 className="font-medium">{booking.name}</h3>
                    <p className="text-sm text-gray-500">{booking.phone}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 mb-4">
                  {booking.problem_description}
                </p>
                {booking.admin_response && (
                  <div className="bg-primary-50 text-primary-700 p-4 rounded-lg">
                    <p className="font-medium mb-1">Response:</p>
                    <p>{booking.admin_response}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleWhatsAppChat}
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookingsPage;
