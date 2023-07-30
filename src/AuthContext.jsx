// AuthContext.js
import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null)

  // Add a login function to set the user's role after successful authentication
  const login = role => {
    setUserRole(role)
  }

  // Add a logout function to clear the user's role on logout
  const logout = () => {
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
