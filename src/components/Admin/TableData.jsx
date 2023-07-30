import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Modal, Form } from 'react-bootstrap'
import {
  fetchUserDataByUserId,
  editTaskByTimesheetId,
  deleteTimesheetByTimesheetId,
  fetchAllActivities,
  fetchAllProjects
} from '../../services/API'
import { useLocation } from 'react-router-dom'

const TableData = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('userId')

  const [tasksData, setTasksData] = useState([
    {
      timeSheetId: null,
      projectName: '',
      activityName: '',
      task: '',
      hours: '',
      createdDate: ''
    }
  ])
  const [projectNames, setProjectNames] = useState([])
  const [activityNames, setActivityNames] = useState([])

  const [showEditModal, setShowEditModal] = useState(false)
  const [editedTask, setEditedTask] = useState({
    timeSheetId: null,
    task: '',
    hours: 0,
    createdDate: '',
    projectId: 0,
    userId: 0,
    activityId: 0
  })

  const today = new Date()

  const generateWeekDates = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const weekStart = new Date(today)

    // Skip Sunday (dayOfWeek = 0) by adding 1 to the start day
    weekStart.setDate(today.getDate() - dayOfWeek + 1)

    const dates = [...Array(6)].map((_, i) => {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      return date
    })

    return dates
  }

  const calculateTotalHours = date => {
    const totalHours = tasksData.reduce((sum, taskData) => {
      const taskCreatedDate = new Date(taskData.createdDate)
      if (date.toDateString() === taskCreatedDate.toDateString()) {
        return sum + parseFloat(taskData.hours)
      }
      return sum
    }, 0)
    return totalHours
  }

  useEffect(
    () => {
      fetchAllProjects().then(projects => {
        setProjectNames(projects)
      })
      fetchAllActivities().then(activities => {
        setActivityNames(activities)
      })
      fetchUserDataByUserId(userId)
        .then(data => {
          setTasksData(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    },
    [userId]
  )

  const mapProjectName = projectId => {
    const project = projectNames.find(
      project => project.projectId === projectId
    )
    return project ? project.projectName : ''
  }

  const mapActivityName = activityId => {
    const activity = activityNames.find(
      activity => activity.activityId === activityId
    )
    return activity ? activity.activityName : ''
  }
  const formatDate = date => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      weekday: 'long'
    }
    return date.toLocaleDateString(undefined, options)
  }

  const weekDates = generateWeekDates()

  const handleEdit = timesheet => {
    setEditedTask({
      timeSheetId: timesheet.timeSheetId,
      task: timesheet.task,
      hours: timesheet.hours,
      createdDate: timesheet.createdDate,
      projectId: timesheet.projectId,
      userId: timesheet.userId,
      activityId: timesheet.activityId
    })
    setShowEditModal(true)
  }

  const handleDelete = timesheetId => {
    if (
      window.confirm('Are you sure you want to delete this timesheet entry?')
    ) {
      deleteTimesheetByTimesheetId(timesheetId)
        .then(() => {
          // Remove the deleted entry from the tasksData state
          setTasksData(prevData =>
            prevData.filter(taskData => taskData.timeSheetId !== timesheetId)
          )
        })
        .catch(error => {
          console.error('Error deleting timesheet entry:', error)
        })
    }
  }
  const handleInputChange = event => {
    const { name, value } = event.target
    setEditedTask(prevEditedTask => ({
      ...prevEditedTask,
      [name]: value
    }))
  }
  const handleSaveEdit = () => {
    if (editedTask.timeSheetId) {
      // Make an API call to edit the timesheet entry
      editTaskByTimesheetId(editedTask.timeSheetId, editedTask)
        .then(editedTimesheet => {
          // Update the tasksData state with the edited timesheet entry
          setTasksData(prevData => {
            return prevData.map(
              taskData =>
                taskData.timeSheetId === editedTimesheet.timeSheetId
                  ? editedTimesheet
                  : taskData
            )
          })
          setShowEditModal(false)
        })
        .catch(error => {
          console.error('Error editing timesheet entry:', error)
        })
    }
  }

  return (
    <Container className='text-align-center'>
      <Table bordered>
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
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasksData.map((taskData, index) =>
            <tr key={index}>
              <td>
                {taskData.projectName}
              </td>
              <td>
                {taskData.activityName}
              </td>
              <td>
                {taskData.task}
              </td>
              {weekDates.map((date, index) => {
                const taskCreatedDate = new Date(taskData.createdDate)
                return (
                  <td key={index}>
                    {date.toDateString() === taskCreatedDate.toDateString() &&
                      <span>
                        {taskData.hours}
                      </span>}
                  </td>
                )
              })}
              <td>
                <Button variant='primary' onClick={() => handleEdit(taskData)}>
                  Edit
                </Button>{' '}
                <Button
                  variant='danger'
                  onClick={() => handleDelete(taskData.timeSheetId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={3}>Total Hours</td>
            {weekDates.map((date, index) =>
              <td key={index}>
                {calculateTotalHours(date)}
              </td>
            )}
            <td />
          </tr>
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Timesheet Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formTask'>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type='text'
                name='task'
                value={editedTask.task}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formHours'>
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type='number'
                name='hours'
                value={editedTask.hours}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='formProject'>
              <Form.Label>Project</Form.Label>
              <Form.Control
                as='select'
                name='projectId'
                value={editedTask.projectId}
                onChange={handleInputChange}
              >
                <option value=''>Select a Project</option>
                {projectNames.map(project =>
                  <option key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formActivity'>
              <Form.Label>Activity</Form.Label>
              <Form.Control
                as='select'
                name='activityId'
                value={editedTask.activityId}
                onChange={handleInputChange}
              >
                <option value=''>Select an Activity</option>
                {activityNames.map(activity =>
                  <option key={activity.activityId} value={activity.activityId}>
                    {activity.activityName}
                  </option>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default TableData
