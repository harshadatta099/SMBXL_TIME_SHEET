import React, { useEffect, useState } from 'react'
import { Container, Table, Form } from 'react-bootstrap'
import {getUserDataForWeek } from '../../services/API'
import { useLocation } from 'react-router-dom'
const GetUserDataById = () => {
  const [tasksData, setTasksData] = useState([
    {
      projectName: '',
      activityName: '',
      task: '',
      hours: '',
      createdDate: ''
    }
  ])

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('userId')

  const today = new Date();
  const year = today.getFullYear().toString().slice(-2).padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const inputDate = `20${year}-${month}-${day}`;

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
      getUserDataForWeek(userId,inputDate
        )
        .then(data => {
          setTasksData(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
        })
    },
    [userId]
  )

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

  return (
    <Container className='mt-5'>
      {tasksData.length === 0
        ? <h1 className='text-center mt-4'>No Data Found</h1>
        : <Table bordered striped>
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
                      {date.toDateString() ===
                          taskCreatedDate.toDateString() &&
                          <span>
                            {taskData.hours}
                          </span>}
                    </td>
                  )
                })}
              </tr>
              )}
            <tr>
              <td colSpan={3}>Total Hours</td>
              {weekDates.map((date, index) =>
                <td key={index}>
                  {calculateTotalHours(date)}
                </td>
                )}
            </tr>
          </tbody>
        </Table>}
    </Container>
  )
}

export default GetUserDataById
