import React, { useState, useEffect } from 'react'
import { InputGroup, Form, Button, Container, Table } from 'react-bootstrap'
import {
  addActivity,
  deleteActivity,
  fetchAllActivities
} from '../../services/API'

const Activities = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = () => {
    fetchAllActivities()
      .then(data => {
        setActivities(data)
      })
      .catch(error => {
        console.error('Error fetching activities:', error)
      })
  }

  const handleAddActivity = () => {
    const activityName = document.getElementById('activityNameInput').value
    if (activityName === '') {
      alert('Please enter an activity name')
    }
    if (activityName) {
      addActivity({ activityName })
        .then(() => {
          fetchActivities()
        })
        .catch(error => {
          console.error('Error adding activity:', error)
        })
    }
  }

  const handleDeleteActivity = activityName => {
    deleteActivity({ activityName })
      .then(() => {
        fetchActivities()
      })
      .catch(error => {
        console.error('Error deleting activity:', error)
      })
  }

  return (
    <Container>
      <h1 className='text-center'>Activities</h1>
      <div>
        <InputGroup className='m-3'>
          <Form.Control
            id='activityNameInput'
            placeholder='Add Activity'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
          />
          <Button
            variant='primary'
            id='button-addon2'
            onClick={handleAddActivity}
          >
            Add
          </Button>
        </InputGroup>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Activity Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity =>
              <tr key={activity.activityId}>
                <td>
                  {activity.activityId}
                </td>
                <td>
                  {activity.activityName}
                </td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteActivity(activity.activityName)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default Activities
