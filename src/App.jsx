// App.js
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate
} from 'react-router-dom'

import UserComponent from './components/User/UserComponent'
import HRComponent from './components/HR/HRComponent'
import AdminComponent from './components/Admin/AdminComponent'

import Navbar from './components/Navbar'
import GetUsers from './components/HR/GetUsers'
import GetAllData from './components/Admin/GetAllData'
import TableData from './components/Admin/TableData'
import Login from './components/Login'
import Signup from './components/Signup'
import User from './components/User/User'
import NotFoundPage from './components/NotFound/NotFound'

const App = () => {
  var role = localStorage.getItem('roleId')
  const userRole =
    role == 1 ? 'user' : role == 2 ? 'hr' : role == 3 ? 'admin' : ''
  const PrivateRoute = ({ role, children }) => {
    if (userRole === role) {
      return children
    } else {
      return <Navigate to='/' />
    }
  }

  return (
    <Router>
      <Navbar userRole={userRole} />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* User Routes */}
        <Route
          path='/user/*'
          element={
            <PrivateRoute role='user'>
              <UserComponent />
            </PrivateRoute>
          }
        />

        {/* HR Routes */}
        <Route
          path='/hr/*'
          element={
            <PrivateRoute role='hr'>
              <HRComponent />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin/*'
          element={
            <PrivateRoute role='admin'>
              <AdminComponent />
            </PrivateRoute>
          }
        />
        <Route path='/user-details' element={<TableData />} />
        {/* Default route for unknown URLs */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
