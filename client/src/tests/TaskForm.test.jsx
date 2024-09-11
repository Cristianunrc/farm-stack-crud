import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {render, fireEvent, screen, waitFor, cleanup} from '@testing-library/react'
import {MemoryRouter, BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TaskForm from '../pages/TaskForm'

describe('TaskForm component', () => {
  let mockAxios
  const route = 'http://localhost:8000/api/tasks'
  const taskId = 1

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    cleanup()
  })

  it('should send a POST request when Create button is clicked', async () => {
    mockAxios.onPost(route).reply(201, {
      title: 'New task',
      description: 'Task description'
    })

    render(
      <BrowserRouter>
        <TaskForm />
      </BrowserRouter>  
    )

    const input = screen.getByTestId('title-id')
    const textArea = screen.getByTestId('description-id')
    const createButton = screen.getByRole('button', {name: /create/i})

    fireEvent.change(input, {target: {value: 'New task'}})
    fireEvent.change(textArea, {target: {value: 'Task description'}})
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1)
      expect(mockAxios.history.post[0].data).toContain('New task')
    })
  })

  it('should send a PUT request when Update button is clicked', async () => {
    mockAxios.onPut(`${route}/${taskId}`).reply(200, {
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

    const input = screen.getByTestId('title-id')
    const textArea = screen.getByTestId('description-id')
    const updateButton = screen.getByRole('button', {name: /update/i})

    fireEvent.change(input, {target: {value: 'Updated title'}})
    fireEvent.change(textArea, {target: {value: 'Updated description'}})
    fireEvent.click(updateButton)

    await waitFor(() => {
      expect(mockAxios.history.put.length).toBe(1)
      expect(mockAxios.history.put[0].data).toContain('Updated title')
    })
  })

  it('should send a DELETE request when Delete button is clicked', async () => {
    mockAxios.onDelete(`${route}/${taskId}`).reply(200)

    render(
      <MemoryRouter initialEntries={[`/tasks/${taskId}`]}>
        <Routes>
          <Route path='/tasks/:id' element={<TaskForm />} />
        </Routes>
      </MemoryRouter>
    )

    const deleteButton = screen.getByRole('button', {name: /delete/i})
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockAxios.history.delete.length).toBe(1)
      expect(mockAxios.history.delete[0].url).toBe(`http://localhost:8000/api/tasks/${taskId}`)
    })
  })
})