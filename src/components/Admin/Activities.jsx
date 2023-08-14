import React, { useState, useEffect } from 'react'
import { InputGroup, Form, Button, Container, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash } from "@fortawesome/free-solid-svg-icons";
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
      <div style={{maxWidth:"830px", margin:"0 auto"}}>
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
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
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
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#FF0000", cursor: "pointer",}}
                  onClick={() => handleDeleteActivity(activity.activityName)}
                />
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
