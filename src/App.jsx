import React,{useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

import UserComponent from './components/User/UserComponent'
import HRComponent from './components/HR/HRComponent'
import AdminComponent from './components/Admin/AdminComponent'


import Navbar from './components/Navbar'
import GetUserDataById from './components/HR/GetUserDataById'
import TableData from './components/Admin/TableData'
import AuthLogin from './components/Auth/AuthLogin'
import NotFoundPage from './components/NotFound/NotFound'
import { AuthGuard, PrivateRoute } from './components/Auth/Auth'

const App = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const roleId = localStorage.getItem('roleId');

    
    if (isLoggedIn) {
      const userRole = roleId === '1' ? 'user' : roleId === '2' ? 'hr' : roleId === '3' ? 'admin' : '';
      setUserRole(userRole);
    }
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} />

      <Routes>
        <Route path='/' element={
          <AuthGuard element={<AuthLogin/>}/>
        } />
       

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
        <Route path='/user-records' element={<GetUserDataById />} />
        {/* Default route for unknown URLs */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App
