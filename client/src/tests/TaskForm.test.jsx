import {describe, it, expect, beforeEach} from 'vitest'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import TaskForm from '../pages/TaskForm'

describe('TaskForm component', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  it('should send a POST request when Create button is clicked', async () => {
    mockAxios.onPost('http://localhost:8000/api/tasks').reply(201, {
      title: 'New task',
      description: 'Task description'
    })

    render(
      <Router>
        <TaskForm/>
      </Router>
    )

    const titleInput = screen.getByPlaceholderText(/title/i)
    const descriptionInput = screen.getByPlaceholderText(/description/i)

    fireEvent.change(titleInput, {target: {value: 'New task'}})
    fireEvent.change(descriptionInput, {target: {value: 'Task description'}})
    fireEvent.click(screen.getByRole('button', {name: /create/i}))

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1)
      expect(mockAxios.history.post[0].data).toContain('New task')
    })
  })
})