import axios from 'axios'

const URL = import.meta.env.VITE_API || 'http://localhost:8000'
const route = `${URL}/api/tasks`

export const getTasks = () => axios.get(route)

export const getTaskById = (id) => axios.get(`${route}/${id}`)

export const createTask = (newTask) => axios.post(`${route}`, newTask)

export const updateTask = (id, task) => axios.put(`${route}/${id}`, task)

export const deleteTask = (id) => axios.delete(`${route}/${id}`)
