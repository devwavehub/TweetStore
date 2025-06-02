import { Navigate, Outlet } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

type ProtectedRouteProps = {
  session: Session | null;
  redirectPath?: string;
};

const ProtectedRoute = ({ 
  session, 
  redirectPath = '/login'
}: ProtectedRouteProps) => {
  if (!session) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;