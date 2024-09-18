import {useEffect, useState} from 'react'
import {getTasks} from '../api/fetchTasks'
import TaskList from '../components/TaskList'

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <TaskList tasks={tasks}/>
  )
}

export default Home