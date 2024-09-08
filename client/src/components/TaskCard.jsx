import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {updateTask} from '../api/fetchTasks'

function TaskCard({task}) {
  const [completed, setCompleted] = useState(task.completed)
  const nav = useNavigate()

  const handleTaskCompleted = async (e) => {
    e.stopPropagation()
    try {
      const response = await updateTask(task._id, {completed: !completed})
      if (response.status === 200) {
        setCompleted(!completed)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="relative bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gay-950"
      onClick={() => { nav(`/tasks/${task._id}`)}}>
      <button
        className="absolute top-1 right-1 border border-gray-600 hover:bg-gray-800 rounded"
        onClick={handleTaskCompleted}>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${completed? 'text-green-500' : ''}`}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </button>
      <div className="flex flex-col items-center">
        <div className="w-full border-b-2 border-slate-600 pb-2 mb-2 mt-4">
          <h2 className="font-bold text-2xl text-center break-words">{task.title}</h2>
        </div>
      </div>
      <p className="text-slate-300 break-words">{task.description}</p>
    </div>
  )
}

export default TaskCard