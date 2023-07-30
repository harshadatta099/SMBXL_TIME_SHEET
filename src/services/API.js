import axios from 'axios'

const BASE_URL = 'http://localhost:5070'

const endpoints = {
  getUserDataByUserId: userId =>
    `${BASE_URL}/NewUser/getUserDataByUserid?userid=${userId}`,
  addTask: () => `${BASE_URL}/NewUser/addTask`,
  editTaskByTimesheetId: timesheetId =>
    `${BASE_URL}/NewUser/editTaskByTimesheetid?timesheetId=${timesheetId}`,
  deleteTimesheetByTimesheetId: timesheetId =>
    `${BASE_URL}/NewUser/deleteTaskByTimesheetid?Timesheetid=${timesheetId}`,
  getTotalHoursWorked: (userId, date) =>
    `${BASE_URL}/NewUser/getTotalHoursWorked?userid=${userId}&date=${date}`,
  getAllUsers: () => `${BASE_URL}/Hr/getAllUsers`,
  getAllTimesheets: () => `${BASE_URL}/Hr/getAllUserRecords`,
  getAllTimesheetsbyId: userId =>
    `${BASE_URL}/Hr/getTimeSheetsByUserId?userid=${userId}`,
  getAllProjects: () => `${BASE_URL}/NewUser/getAllProjects`,
  getAllActivities: () => `${BASE_URL}/NewUser/getAllActivities`
}

const fetchData = async (url, method, data = null) => {
  try {
    const response = await axios({ url, method, data })
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Request failed with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const fetchUserDataByUserId = async userId => {
  const url = endpoints.getUserDataByUserId(userId)
  return fetchData(url, 'GET')
}
export const addTask = async task => {
  const url = endpoints.addTask()
  return fetchData(url, 'POST', task)
}

export const editTaskByTimesheetId = async (timesheetId, task) => {
  const url = endpoints.editTaskByTimesheetId(timesheetId)
  return fetchData(url, 'PUT', task)
}

export const deleteTimesheetByTimesheetId = async timesheetId => {
  const url = endpoints.deleteTimesheetByTimesheetId(timesheetId)
  return fetchData(url, 'DELETE')
}

export const getTotalHoursWorked = async (userId, date) => {
  const url = endpoints.getTotalHoursWorked(userId, date)
  return fetchData(url, 'GET')
}

export const fetchAllUsers = async () => {
  const url = endpoints.getAllUsers()
  return fetchData(url, 'GET')
}

export const fetchAllTimesheets = async () => {
  const url = endpoints.getAllTimesheets()
  return fetchData(url, 'GET')
}

export const fetchAllTimesheetsbyId = async userId => {
  const url = endpoints.getAllTimesheetsbyId(userId)
  return fetchData(url, 'GET')
}

export const fetchAllProjects = async () => {
  const url = endpoints.getAllProjects()
  return fetchData(url)
}

export const fetchAllActivities = async () => {
  const url = endpoints.getAllActivities()
  return fetchData(url)
}

export const deleteActivity = async () => {
  const url = `${BASE_URL}/Admin/deleteActivity`
  return fetchData(url, 'DELETE')
}

export const deleteProject = async () => {
  const url = `${BASE_URL}/Admin/deleteProject`
  return fetchData(url, 'DELETE')
}

export const addProject = async project => {
  const url = `${BASE_URL}/Admin/addProject`
  return fetchData(url, 'POST', project)
}

export const addActivity = async activity => {
  const url = `${BASE_URL}/Admin/addActivity`
  return fetchData(url, 'POST', activity)
}

export const getRecordsBetweenTwoDates = async (startDate, endDate) => {
  const url = `${BASE_URL}/Admin/getRecordsB/WTwoDates?startDate=${startDate}&endDate=${endDate}`
  return fetchData(url, 'GET')
}
