import React, { useState, useEffect } from 'react'
import { Table, Form, Container } from 'react-bootstrap'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const GetAllData = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [usersData, setUsersData] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:5070/Admin/GetAllUsers')
      .then(response => {
        setUsersData(response.data)
        setFilteredUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleDeleteUser = userId => {
    axios
      .delete(`http://localhost:5070/Admin/deleteUserByUserId?userid=${userId}`)
      .then(response => {
        setUsersData(prevUsers =>
          prevUsers.filter(user => user.userId !== userId)
        )
        setFilteredUsers(prevFilteredUsers =>
          prevFilteredUsers.filter(user => user.userId !== userId)
        )
      })
      .catch(error => {
        console.error('Error deleting user:', error)
      })
  }

  const handleSearchChange = e => {
    const { value } = e.target
    setSearchQuery(value)

    const filtered = usersData.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const handleUserRowClick = userId => {
    navigate(`/user-details?userId=${userId}`)
    setSelectedUserId(userId)
    console.log('selectedUserId', selectedUserId)
  }

  return (
    <Container>
      <Form className='my-3'>
        <Form.Label>
          <div className='fs-5'>USER DATA:</div>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Search by username...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user =>
            <tr
              key={user.userId}
              onClick={() => handleUserRowClick(user.userId)}
            >
              <td>
                {user.userId}
              </td>
              <td>
                {user.username}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.mobileno}
              </td>
              <td>
                <Button
                  variant='danger'
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default GetAllData
