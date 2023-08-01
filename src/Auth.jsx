import React,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem('isLoggedIn'));
};

export const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return element;
};

export const ProtectedSignupRoute = ({ element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/user" />;
  }

  return element;
};

export const AuthGuard = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const roleId = localStorage.getItem('roleId');
  const userRole = roleId === '1' ? 'user' : roleId === '2' ? 'hr' : roleId === '3' ? 'admin' : '';

  useEffect(() => {
    // Save the userRole in localStorage if the user is logged in
    if (isLoggedIn) {
      localStorage.setItem('userRole', userRole);
    }
  }, [isLoggedIn, userRole]);

  return isLoggedIn ? <Navigate to={`/${userRole}`} /> : element;
};



export const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('userRole');
  if (userRole === role) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
