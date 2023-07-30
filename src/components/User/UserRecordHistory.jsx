import React, { useState } from 'react'
import { Table, Container, Row, Col, Form } from 'react-bootstrap'
import { getRecordsBetweenTwoDates } from '../../services/API'

const UserRecordHistory = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredUserRecords, setFilteredUserRecords] = useState([])
  const userId = localStorage.getItem('userId')
  const handleStartDateChange = e => {
    setStartDate(e.target.value)
    fetchUserRecordsByDateRange(e.target.value, endDate)
  }

  const handleEndDateChange = e => {
    setEndDate(e.target.value)
    fetchUserRecordsByDateRange(startDate, e.target.value)
  }

  const fetchUserRecordsByDateRange = async (start, end) => {
    try {
      const records = await getRecordsBetweenTwoDates(start, end)
      setFilteredUserRecords(records)
    } catch (error) {
      console.error('Error fetching user records:', error)
    }
  }

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
    const year = String(date.getFullYear()).slice(-2)

    return `${day}-${month}-${year}`
  }
  return (
    <Container>
      <Row className='m-3'>
        <Col lg={3} md={6}>
          <Form.Group controlId='formStartDate'>
            <Form.Label>Select Start Date:</Form.Label>
            <Form.Control
              type='date'
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Form.Group>
        </Col>
        <Col lg={3} md={6}>
          <Form.Group controlId='formEndDate'>
            <Form.Label>Select End Date:</Form.Label>
            <Form.Control
              type='date'
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Project Name</th>
                <th>Activity Name</th>
                <th>Task</th>
                <th>Hours</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserRecords.map((record, index) => {
                if (userId == record.userId) {
                  return (
                    <tr key={index}>
                      <td>
                        {record.userId}
                      </td>
                      <td>
                        {record.projectName}
                      </td>
                      <td>
                        {record.activityName}
                      </td>
                      <td>
                        {record.task}
                      </td>
                      <td>
                        {record.hours}
                      </td>
                      <td>
                        {formatDate(record.createdDate)}
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default UserRecordHistory
