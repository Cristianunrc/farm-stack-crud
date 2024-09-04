import {useEffect, useState} from 'react'
import TaskList from '../components/TaskList'
import {getTasks} from '../api/fetchTasks'

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((response) => {
        setTasks(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <TaskList tasks={tasks}/>
  )
}

export default Home