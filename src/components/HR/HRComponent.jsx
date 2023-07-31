import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRecord from '../UserRecord'
import GetUsers from './GetUsers'
import GetUserDataById from './GetUserDataById'
const HRComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<GetUsers />} />
        <Route path='/user-records' element={<UserRecord />} />
        <Route path='/user-detials' element={<GetUserDataById />} />
      </Routes>
    </div>
  )
}

export default HRComponent
