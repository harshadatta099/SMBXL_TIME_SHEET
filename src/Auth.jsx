import React from 'react';
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
  return isLoggedIn ? <Navigate to={`/${userRole}`} /> : element;
};
