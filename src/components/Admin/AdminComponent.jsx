import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Projects from './Projects'
import Activities from './Activities'
import UserRecord from '../UserRecord'
import GetAllData from './GetAllData'
const AdminComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GetAllData />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/user-records' element={<UserRecord />} />
      </Routes>
    </div>
  )
}

export default AdminComponent
