import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRecord from '../UserRecord'
import GetUsers from './GetUsers'
const HRComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GetUsers />} />
        <Route path='/user-records' element={<UserRecord />} />
      </Routes>
    </div>
  )
}

export default HRComponent
