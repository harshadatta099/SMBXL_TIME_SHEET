import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserRecordHistory from './UserRecordHistory'
import EditDelete from './EditDelete'
import User from './User'
const UserComponent = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/edit' element={<EditDelete />} />
        <Route path='/user-records' element={<UserRecordHistory />} />
      </Routes>
    </div>
  )
}

export default UserComponent
