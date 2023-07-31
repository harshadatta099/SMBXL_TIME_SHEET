import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Projects from './Projects'
import Activities from './Activities'
import UserRecord from '../UserRecord'
import TableData from './TableData'
import GetAllData from './GetAllData'
const AdminComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GetAllData />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/user-records' element={<UserRecord />} />
        <Route path='/user-details' element={<TableData />} />
      </Routes>
    </div>
  )
}

export default AdminComponent
