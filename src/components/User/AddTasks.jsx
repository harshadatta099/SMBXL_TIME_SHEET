import React, { useState, useEffect } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'
import {
  fetchAllProjects,
  fetchAllActivities,
  addTask
} from '../../services/API'
const AddTasks = ({onTaskAdded }) => {
  const [projectNames, setProjectNames] = useState([])
  const [activityNames, setActivityNames] = useState([])
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')
  const [task, setTask] = useState('')
  const [relatedActivities, setRelatedActivities] = useState([]);

  const [dayDates, setDayDates] = useState(Array(6).fill('')) // Reduced to 6 days, excluding Sunday

  const generateWeekDates = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const weekStart = new Date(today)

    weekStart.setDate(today.getDate() - dayOfWeek + 1)

    const dates = [...Array(6)].map((_, i) => {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      return date
    })

    return dates
  }
  useEffect(() => {
    fetchAllProjects().then(data => {setProjectNames(data)
   
    })
    fetchAllActivities().then(data => {
      setActivityNames(data)
     
    })
  }, []);


  useEffect(() => {
    if (selectedProject) {
      const filteredActivities = activityNames.filter(
        (activity) => activity.projectId === parseInt(selectedProject)
      );
      setRelatedActivities(filteredActivities);
    } else {
      setRelatedActivities([]);
    }
  }, [selectedProject, activityNames]);
  // const tokenid = localStorage.getItem('tokenid');

  const formatDate = date => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      weekday: 'long'
    }
    return date.toLocaleDateString(undefined, options)
  }

  const handleAdd = async () => {
    const todayIndex = weekDates.findIndex(
      date => date.toDateString() === today.toDateString()
    )

    if (
      !selectedProject ||
      !selectedActivity ||
      !task ||
      !dayDates[todayIndex]
    ) {
      
      alert('Please fill in all the fields before adding the task.')
      return
    }

    const userId = localStorage.getItem('userId') 
    if (!userId) {
      alert('User ID not found in localStorage. Please login again.')
      return
    }

    const data = {
      task: task,
      hours: dayDates[todayIndex],
      createdDate: new Date().toISOString().slice(0, 10), // Convert to YYYY-MM-DD format
      projectId: parseInt(selectedProject),
      userId: parseInt(userId), 
      activityId: parseInt(selectedActivity)
    }
   
   addTask(data).then(()=>onTaskAdded()) // Add task API 
    
   // Rest the input fields

    setSelectedProject('')
    setSelectedActivity('')
    setTask('')
    setDayDates(Array(6).fill(''))
  }

  const handleChangeDayDate = (index, value) => {
    const updatedDayDates = [...dayDates]
    updatedDayDates[index] = value
    setDayDates(updatedDayDates)
  }

  const weekDates = generateWeekDates()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Container>
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Activity</th>
            <th>Task</th>
            {weekDates.map((date, index) =>
              <th key={index}>
                {formatDate(date)}
                {date.toDateString() === today.toDateString() &&
                  <span> (Today)</span>}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                as='select'
                value={selectedProject}
                style={{ width: '150px' }}
                onChange={e => {setSelectedProject(e.target.value)
                  let id = parseInt(e.target.value);
                  
                }}
                required
              >
                <option value=''>Select Project</option>
                {projectNames.map(project =>
                  <option key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </option>
                )}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                as='select'
                style={{ width: '150px' }}
                value={selectedActivity}
                onChange={e => setSelectedActivity(e.target.value)}

                required
              >
                <option value=''>Select Activity</option>
                {relatedActivities.map(activity =>
                  <option key={activity.activityId} value={activity.activityId}>
                    {activity.activityName}
                  </option>
                )}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                type='text'
                style={{ width: '300px' }}
                placeholder='Enter task'
                value={task}
                onChange={e => setTask(e.target.value)}
              />
            </td>
            {weekDates.map((date, index) => {
              const formattedDate = formatDate(date)
              const isDateDisabled =
                date.toDateString() !== today.toDateString()
              const minDate = isDateDisabled ? formattedDate : ''
              const maxDate = date < today ? formattedDate : ''

              return (
                <td key={index}>
                  <Form.Control
                    type='number'
                    value={dayDates[index]}
                    onChange={e => handleChangeDayDate(index, e.target.value)}
                    min={minDate}
                    max={maxDate}
                    disabled={isDateDisabled}
                  />
                </td>
              )
            })}
          </tr>
        </tbody>
      </Table>
      <Button variant='primary' onClick={handleAdd}>
        Add
      </Button>
    </Container>
  )
}

export default AddTasks
