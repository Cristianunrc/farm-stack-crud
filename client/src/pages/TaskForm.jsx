import axios from 'axios'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const params = useParams()
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!params.id) { // create task
        const response = await axios.post('http://localhost:8000/api/tasks', {
          title,
          description
        })
      } else { // update task
        const response = await axios.put(`http://localhost:8000/api/tasks/${params.id}`, {
          title,
          description
        })
      }
      nav('/')
    } catch (error) {
      console.log(error)
    }
    e.target.reset()
  }

  useEffect(() => {
    if (params.id) {
      fetchTaskById()
    }

    async function fetchTaskById() {
      const response = await axios.get(`http://localhost:8000/api/tasks/${params.id}`)
      setTitle(response.data.title)
      setDescription(response.data.description)
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4">
          {params.id ? "Update task" : "Create task"}
          </h1>
          <input 
            className="block py-2 px-3 mb-4 w-full text-black"
            type="text"
            placeholder="Title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}/>
          <textarea 
            className="block py-2 px-3 mb-4 w-full text-black"
            rows="3"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}></textarea>
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Update" : "Create"}
          </button>
        </form>
        {
          params.id && (
            <button 
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
              onClick={async () => {
                try {
                  const response = await axios.delete(`http://localhost:8000/api/tasks/${params.id}`)
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
    </div>
  )
}

export default TaskForm