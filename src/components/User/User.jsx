import React from 'react'
import AddTasks from './AddTasks'
import FetchData from './FetchData'

const User = () => {
  return (
    <div>
      <div className='mt-3'>
        <AddTasks />
      </div>
      <br />
      <FetchData />
    </div>
  )
}

export default User
