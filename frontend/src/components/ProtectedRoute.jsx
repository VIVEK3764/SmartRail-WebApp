import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuthStore();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    if (!isAuthenticated) {
        // Redirect to login page but save the attempted url
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
} 