import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import TaskForm from './pages/TaskForm'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10 pb-10">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tasks/:id' element={<TaskForm/>}/>
          <Route path='/tasks/new' element={<TaskForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
