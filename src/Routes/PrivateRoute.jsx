import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, userRole, isLoggedIn, children }) => {
  if (isLoggedIn && userRole === role) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
