// AuthGuard.js
import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

export const AuthGuard = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const roleId = localStorage.getItem('roleId');
  const userRole = roleId === '1' ? 'user' : roleId === '2' ? 'hr' : roleId === '3' ? 'admin' : '';

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  return isLoggedIn ? <Navigate to={`/${userRole}`} /> : element;
};

export const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('userRole');

  return userRole === role ? children : <Navigate to="/" />;
};
