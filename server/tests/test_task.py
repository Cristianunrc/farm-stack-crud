import pytest

from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from server.main import app

client = TestClient(app)

@pytest.mark.asyncio
@patch('server.routes.task.get_all_tasks', new_callable=AsyncMock)
async def test_get_tasks(mock_get_all_tasks):
    tasks = [
        {'_id': '1', 'title': 'Task 1', 'description': 'Description 1', 'completed': False},
        {'_id': '2', 'title': 'Task 2', 'description': 'Description 2', 'completed': True}
    ]

    mock_get_all_tasks.return_value = tasks
    response = client.get('/api/tasks')
    assert response.status_code == 200
    assert response.json() == tasks

@pytest.mark.asyncio
@patch('server.routes.task.create_task', new_callable=AsyncMock)
@patch('server.routes.task.get_task_by_title', new_callable=AsyncMock)
async def test_save_task(mock_get_task_by_title, mock_create_task):
    task = {
        'title': 'Task 1',
        'description': 'Description 1',
        'completed': False
    }

    mock_get_task_by_title.return_value = None
    mock_create_task.return_value = task
    response = client.post('/api/tasks', json=task)
    assert response.status_code == 200
    assert response.json() == task

    mock_get_task_by_title.return_value = task
    response = client.post('/api/tasks', json=task)
    assert response.status_code == 409
    assert response.json() == {'detail': 'Task already exists'}