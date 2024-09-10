import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {render, fireEvent, screen, waitFor, cleanup} from '@testing-library/react'
import {MemoryRouter, BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TaskForm from '../pages/TaskForm'

describe('TaskForm component', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    cleanup()
  })

  it('should send a POST request when Create button is clicked', async () => {
    mockAxios.onPost('http://localhost:8000/api/tasks').reply(201, {
      title: 'New task',
      description: 'Task description'
    })

    render(
      <BrowserRouter>
        <TaskForm />
      </BrowserRouter>  
    )

    const titleInput = screen.getByTestId('title-id')
    const descriptionInput = screen.getByTestId('description-id')

    fireEvent.change(titleInput, {target: {value: 'New task'}})
    fireEvent.change(descriptionInput, {target: {value: 'Task description'}})
    fireEvent.click(screen.getByRole('button', {name: /create/i}))

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1)
      expect(mockAxios.history.post[0].data).toContain('New task')
    })
  })

  it('should send a PUT request when Update button is clicked', async () => {
    const taskId = 1
    mockAxios.onPut(`http://localhost:8000/api/tasks/${taskId}`).reply(200, {
      title: 'Updated title',
      description: 'Updated description'
    })

    render(
      <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskForm />} />
        </Routes>
      </MemoryRouter>
    )

    const titleInput = screen.getByTestId('title-id')
    const descriptionInput = screen.getByTestId('description-id')

    fireEvent.change(titleInput, {target: {value: 'Updated title'}})
    fireEvent.change(descriptionInput, {target: {value: 'Updated description'}})
    fireEvent.click(screen.getByRole('button', {name: /update/i}))

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1)
      expect(mockAxios.history.put[0].data).toContain('Updated title')
    })
  })

})