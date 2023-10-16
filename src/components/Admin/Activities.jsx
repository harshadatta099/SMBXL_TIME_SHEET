import React, { useState, useEffect } from 'react'
import { InputGroup, Form, Button, Container, Table, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  addActivity,
  deleteActivity,
  fetchAllActivities,
  fetchAllProjects
} from '../../services/API'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);
  const [relatedActivities, setRelatedActivities] = useState([]);

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
    fetchAllProjects().then(
      data => {
        setProjects(data)
      }
    )
  }
  useEffect(() => {
    if (selectedProject) {
      const filteredActivities = activities.filter(
        (activity) => activity.projectId === parseInt(selectedProject)
      );
      setRelatedActivities(filteredActivities);
    } else {
      setRelatedActivities([]);
    }
  }, [selectedProject, activities]);

  const handleAddActivity = () => {
    const activityName = document.getElementById('activityNameInput').value
    if (activityName === '' && !selectedProject) {
      alert('Please enter an activity name!')
    }
    if(selectedProject=== '' && !activityName){
      alert("Please Select any project!")
    }else if(activityName==='' && selectedProject === ''){
      alert("Some fields are missing!!")
    }
    if (activityName) {
      const data = { activityName: activityName,projectId: selectedProject }
      addActivity(data)
        .then(() => {
          fetchActivities()
        })
        .catch(error => {
          console.error('Error adding activity:', error)
        })
    }
  }

  const handleDeleteActivity = activityName => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Activity?");
    
    if (confirmDelete) {
      deleteActivity({ activityName })
        .then(() => {
          fetchActivities();
        })
        .catch(error => {
          console.error('Error deleting activity:', error);
        });
    }
  };
  

  return (
    <Container>
      <h1 className='text-center'>Activities</h1>
      <div style={{ maxWidth: "830px", margin: "0 auto" }}>
        <Row>
          <Col xs={6} className='mt-3'>
            <Form.Select
              id='activityDropdown'
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select a Project</option>
              {projects.map(project => (
                <option key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6}>
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
          </Col>
        </Row>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Activity Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {relatedActivities.map(activity => (
              <tr key={activity.activityId}>
                <td>
                  {activity.activityId}
                </td>
                <td>
                  {activity.activityName}
                </td>
                <td className='text-center'>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#FF0000", cursor: "pointer" }}
                    onClick={() => handleDeleteActivity(activity.activityName)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default Activities
