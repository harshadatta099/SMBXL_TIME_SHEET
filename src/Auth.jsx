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
  useEffect(() => {
    const roleId = localStorage.getItem('roleId');
    const userRole = roleId === 1 ? 'user' : roleId === 2 ? 'hr' : roleId === 3 ? 'admin' : '';
    localStorage.setItem('userRole', userRole);
  }, []);
  return isLoggedIn ? <Navigate to={`/${userRole}`} /> : element;
};


const userRole = localStorage.getItem('roleId') === '1' ? 'user' : localStorage.getItem('roleId') === '2' ? 'hr' : localStorage.getItem('roleId') === '3' ? 'admin' : ''
export const PrivateRoute = ({ role, children }) => {
  if (userRole === role) {
    return children
  } else {
    return <Navigate to='/' />
  }
}