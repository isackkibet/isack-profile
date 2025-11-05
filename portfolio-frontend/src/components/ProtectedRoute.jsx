import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div style={{ fontSize: '1.5rem', color: 'var(--color-accent)' }}>
          Loading...
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
