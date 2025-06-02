import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { motion } from 'framer-motion';
import { Lock, Loader, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { adminSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password) {
      setError('Password is required');
      return;
    }

    setIsSubmitting(true);
    
    const { success } = await adminSignIn(password);
    
    setIsSubmitting(false);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center mb-6">
        <ShieldAlert className="h-12 w-12 text-primary-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Admin Access Only
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="form-label">
            Admin Password
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              'Access Admin Panel'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          to="/"
          className="font-medium text-primary-600 hover:text-primary-500"
        >
          Back to Homepage
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminLoginPage;