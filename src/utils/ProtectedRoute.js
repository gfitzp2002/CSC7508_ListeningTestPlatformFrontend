import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo, inverse = false }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if ((isLoggedIn && inverse) || (!isLoggedIn && !inverse)) {
    // Redirect to the specified route
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
