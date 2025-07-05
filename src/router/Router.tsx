import { createBrowserRouter, Navigate } from 'react-router-dom';
import ModernLoginPage from '../signin/SignIn';
import ModernSignUpPage from '../signup/SignUp';
import Webpage from '../dashboard/webpage/Webpage';
import { AuthProvider } from '../dashboard/auth-context';
import { useAuth } from '../dashboard/auth-context'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
  
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />
  },
  {
    path: '/signin',
    element: <ModernLoginPage />
  },
  {
    path: '/signup',
    element: <ModernSignUpPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Webpage />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/signin" replace />
  }
]);

export default router;