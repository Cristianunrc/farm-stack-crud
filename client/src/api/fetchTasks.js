import axios from 'axios'

const URL = 'http://localhost:8000'
const route = `${URL}/api/tasks`

export const getTasks = async () => {
  const response = await axios.get(route)
  return response
}

export const getTaskById = async (id) => {
  const response = await axios.get(`${route}/${id}`)
  return response
}

export const createTask = (newTask) => {
  const response = axios.post(`${route}`, newTask)
  return response
}

export const updateTask = (id, task) => {
  const response = axios.put(`${route}/${id}`, task)
  return response
}

export const deleteTask = (id) => {
  const response = axios.delete(`${route}/${id}`)
  return response
}
