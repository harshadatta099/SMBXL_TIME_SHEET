import { Navigate } from 'react-router-dom'

export const AuthGuard = ({ element }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const userRole = localStorage.getItem('roleId')

  if (isLoggedIn) {
    switch (userRole) {
      case '1':
        return <Navigate to='/user' replace />
      case '2':
        return <Navigate to='/hr' replace />
      case '3':
        return <Navigate to='/admin' replace />
      default:
        break // For any other role, continue with the regular rendering.
    }
  }

  return element // User is not logged in, render the requested element.
}
