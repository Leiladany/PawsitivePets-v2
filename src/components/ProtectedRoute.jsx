import { Navigate, useLocation } from 'react-router-dom';
import useAppContext from '../context/useAppContext.js';

function ProtectedRoute({ children }) {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
