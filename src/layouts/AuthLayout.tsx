import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <Smartphone className="h-12 w-12 text-primary-600" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Dammy Tweak & Store
        </h2>
      </div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;