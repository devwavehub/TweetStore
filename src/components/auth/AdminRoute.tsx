import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

const AdminRoute = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin()) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;