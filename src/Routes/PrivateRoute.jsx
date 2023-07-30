// PrivateRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('roleId')
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

  if (userRole === role) {
    return children
  } else {
    return <Navigate to='/' />
  }
}

export default PrivateRoute
