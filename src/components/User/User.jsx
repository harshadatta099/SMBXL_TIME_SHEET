import React,{useState,useEffect} from 'react'
import AddTasks from './AddTasks'
import FetchData from './FetchData'

const User = () => {
  const [fetchDataFlag, setFetchDataFlag] = useState(false);

  const triggerFetchData = () => {
    setFetchDataFlag(!fetchDataFlag);
  }
  useEffect(() => {
    if (fetchDataFlag) {
      setFetchDataFlag(false);
    }
  }, [fetchDataFlag]);
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
