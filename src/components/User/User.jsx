import React,{useState} from 'react'
import AddTasks from './AddTasks'
import FetchData from './FetchData'

const User = () => {
  const [fetchDataFlag, setFetchDataFlag] = useState(false);

  const triggerFetchData = () => {
    setFetchDataFlag(!fetchDataFlag);
  }
  return (
    <div>
      <div className='mt-3'>
        <AddTasks onTaskAdded={triggerFetchData} />
      </div>
      <br />
      <FetchData fetchDataFlag={fetchDataFlag}/>
    </div>
  )
}

export default User
