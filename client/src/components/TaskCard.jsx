import {useNavigate} from 'react-router-dom'

function TaskCard({task}) {
  const nav = useNavigate()

  return (
    <div className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gay-950"
         onClick={() => { nav(`/tasks/${task._id}`)}}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  )
}

export default TaskCard