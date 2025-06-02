import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../lib/auth';
import { 
  User, 
  Mail, 
  Lock,
  Loader,
  CheckCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { session, updateProfile, updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    if (session?.user.user_metadata?.full_name) {
      setFormData(prev => ({
        ...prev,
        full_name: session.user.user_metadata.full_name
      }));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success } = await updateProfile({
        full_name: formData.full_name
      });

      if (success) {
        toast.success('Profile updated successfully');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { success } = await updatePassword(formData.new_password);

      if (success) {
        setFormData(prev => ({
          ...prev,
          new_password: '',
          confirm_password: ''
        }));
        toast.success('Password updated successfully');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold">Profile Information</h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={session?.user.email}
                  disabled
                  className="form-input pl-10 bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="full_name" className="form-label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="form-input pl-10"
                  placeholder="John Doe"
                />
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
                'Update Profile'
              )}
            </button>
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center mb-6">
            <Lock className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="new_password" className="form-label">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  className="form-input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm_password" className="form-label">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className="form-input pl-10"
                  placeholder="••••••••"
                />
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
                'Update Password'
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Security Tips */}
      <div className="mt-8 bg-primary-50 rounded-lg p-6">
        <h3 className="font-medium text-primary-900 mb-4">Security Tips</h3>
        <ul className="space-y-2 text-primary-800">
          <li className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
            Use a strong password with at least 8 characters
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
            Include numbers, symbols, and uppercase letters
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
            Don't reuse passwords from other accounts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;