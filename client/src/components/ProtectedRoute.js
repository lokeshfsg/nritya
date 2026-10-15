import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Verifying access..." />;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
}
