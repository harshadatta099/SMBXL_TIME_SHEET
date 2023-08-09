import React, { useEffect, useState } from 'react'
import { Table, Container, Row, Col, Form } from 'react-bootstrap'
import { getRecordsBetweenTwoDates } from '../services/API'
import Excel from './Admin/Excel'

const UserRecord = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredUserRecords, setFilteredUserRecords] = useState([])
  const [userId, setUserId] = useState(0)
  const [RateCard, setRateCard] = useState(25);
  const [filteredRecordsForExcel, setFilteredUserRecordsForExcel] = useState([])

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
  const handleRateCardChange = e => setRateCard(e.target.value)
  const handleUserIdChange = e => setUserId(e.target.value)

  const formatDate = dateString => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const year = String(date.getFullYear()).slice(-2)
    return `${day}-${month}-${year}`
  }
  useEffect(() => {
    const filteredRecords = filteredUserRecords.filter((record) => {
      return record.userId == userId
    })
    setFilteredUserRecordsForExcel(filteredRecords)
  }, [filteredUserRecords,userId])
    
  return (
    <Container>
      <Row className='m-3'>
        <Col lg={2} md={4}>
          <Form.Group controlId='formStartDate'>
            <Form.Label>Select Start Date:</Form.Label>
            <Form.Control
              type='date'
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={4}>
          <Form.Group controlId='formEndDate'>
            <Form.Label>Select End Date:</Form.Label>
            <Form.Control
              type='date'
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={4}>
          <Form.Group controlId='formUserId'>
            <Form.Label>Enter User ID:</Form.Label>
            <Form.Control
              type='number'
              value={userId}
              onChange={handleUserIdChange}
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={4}>
          <Form.Group controlId='formUserRateCard'>
            <Form.Label>RateCard:</Form.Label>
            <Form.Control
              type='number'
              value={RateCard}
              onChange={handleRateCardChange}
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={4}  className='mt-4'  style={{padding:"8px"}} >
         <Excel  records={filteredRecordsForExcel} rateCard={RateCard}/>
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
                <th> Date</th>
                <th>RateCard</th>
                <th>Invoice</th>
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
                      <td>
                        {RateCard}
                      </td>
                      <td>
                        {record.hours * RateCard}
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

export default UserRecord
