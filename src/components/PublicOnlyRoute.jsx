import { Navigate } from 'react-router-dom';
import useAppContext from '../context/useAppContext.js';

function PublicOnlyRoute({ children }) {
  const { currentUser } = useAppContext();

  if (currentUser) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default PublicOnlyRoute;
