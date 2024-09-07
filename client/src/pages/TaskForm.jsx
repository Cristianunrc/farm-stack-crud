import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {getTaskById, createTask, updateTask, deleteTask} from '../api/fetchTasks'

function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const params = useParams()
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!params.id) { // create task
        const response = await createTask({title, description})
      } else { // update task
        const response = await updateTask(params.id, {title, description})
      }
      nav('/')
    } catch (error) {
      console.log(error)
    }
    e.target.reset()
  }

  useEffect(() => {
    if (params.id) {
      getTaskById(params.id)
        .then((response) => {
          setTitle(response.data.title)
          setDescription(response.data.description)
        })
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-5" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-bold my-4 ">
            {params.id ? "Update task" : "Create task"}
          </h1>
          <input 
            className="block py-2 px-3 mb-4 w-full text-black"
            type="text"
            placeholder="Title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title} required/>
          <textarea 
            className="block py-2 px-3 mb-4 w-full text-black"
            rows="3"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description} required></textarea>
          <div className="flex justify-center space-x-4">
            <button 
              className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
              {params.id ? "Update" : "Create"}
            </button>
            {params.id && (
                <button 
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  onClick={async () => {
                    try {
                      const response = await deleteTask(params.id)
                      nav('/')
                    } catch (error) {
                      console.log(error)
                    }
                  }}>
                  Delete
                </button>
              )
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm