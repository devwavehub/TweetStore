import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, ContactMessage } from '../../lib/supabase';
import { 
  MessageSquare, 
  Search, 
  Mail,
  Loader,
  Trash2 
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageContactMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  },
 []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data as ContactMessage[]);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted successfully');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleEmailReply = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full"
          />
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No messages found
          </h3>
          <p className="text-gray-500">
            {messages.length === 0
              ? "You haven't received any contact messages yet"
              : "No messages match your search criteria"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">{message.subject}</h3>
                  <p className="text-sm text-gray-500">
                    From: {message.name} ({message.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEmailReply(message.email)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                    title="Reply via Email"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Message"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 whitespace-pre-line">
                  {message.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageContactMessagesPage;