import React, { useState, useEffect } from 'react'
import { Table, Form, Container } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../services/API'
const GetUsers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [usersData, setUsersData] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Admin/GetAllUsers`)
      .then(response => {
        setUsersData(response.data)
        setFilteredUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleSearchChange = e => {
    const { value } = e.target
    setSearchQuery(value)

    const filtered = usersData.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredUsers(filtered)
  }

  const handleUserRowClick = userId => {
    navigate(`/user-records?userId=${userId}`)
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
             
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default GetUsers
