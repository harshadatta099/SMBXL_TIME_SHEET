import React, { useState, useEffect } from 'react'
import { InputGroup, Form, Button, Container, Table } from 'react-bootstrap'
import {
  fetchAllProjects,
  addProject,
  deleteProject
} from '../../services/API'

const Project = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = () => {
    fetchAllProjects()
      .then(data => {
        setProjects(data)
      })
      .catch(error => {
        console.error('Error fetching projects:', error)
      })
  }

  const handleAddProject = () => {
    const projectName = document.getElementById('projectNameInput').value
    if (projectName === '') {
      alert('Please enter a project name')
    }
    if (projectName) {
      addProject({ projectName })
        .then(() => {
          fetchProjects() // Refresh the projects list after adding a new project
        })
        .catch(error => {
          console.error('Error adding project:', error)
        })
    }
  }

  const handleDeleteProject = projectName => {
    deleteProject({ projectName })
      .then(() => {
        fetchProjects() // Refresh the projects list after deleting a project
      })
      .catch(error => {
        console.error('Error deleting project:', error)
      })
  }

  return (
    <Container>
      <h1 className='text-center'>Projects</h1>
      <div>
        <InputGroup className='m-3'>
          <Form.Control
            id='projectNameInput'
            placeholder='Add Project'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
          />
          <Button
            variant='primary'
            id='button-addon2'
            onClick={handleAddProject}
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
              <th>Project Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project =>
              <tr key={project.projectId}>
                <td>
                  {project.projectId}
                </td>
                <td>
                  {project.projectName}
                </td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteProject(project.projectName)}
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

export default Project
