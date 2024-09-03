import {useEffect, useState} from 'react'
import axios from 'axios'
import TaskList from '../components/TaskList'

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get('http://localhost:8000/api/tasks')
      setTasks(response.data)
    }
    fetchTasks()
  }, [])

  return (
    <TaskList tasks={tasks}/>
  )
}

export default Home