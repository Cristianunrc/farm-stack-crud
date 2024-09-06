import pytest

from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from server.main import app

client = TestClient(app)

path = 'server.routes.task'

def data(id, title, description, completed):
    return {
        '_id': id,
        'title': title,
        'description': description,
        'completed': completed
    }

@pytest.mark.asyncio
@patch(f'{path}.get_all_tasks', new_callable=AsyncMock)
async def test_get_tasks(mock_get_all_tasks):
    tasks = [
        data('1', 'Title 1', 'Description 1', False),
        data('2', 'Title 2', 'Description 2', False)
    ]
    mock_get_all_tasks.return_value = tasks
    response = client.get('/api/tasks')
    assert response.status_code == 200
    assert response.json() == tasks

@pytest.mark.asyncio
@patch(f'{path}.create_task', new_callable=AsyncMock)
@patch(f'{path}.get_task_by_title', new_callable=AsyncMock)
async def test_save_task(mock_get_task_by_title, mock_create_task):
    task = data('1', 'Title 1', 'Description 1', False)
    mock_get_task_by_title.return_value = None
    mock_create_task.return_value = task
    response = client.post('/api/tasks', json=task)
    assert response.status_code == 200
    assert response.json() == task

    mock_get_task_by_title.return_value = task
    response = client.post('/api/tasks', json=task)
    assert response.status_code == 409
    assert response.json() == {'detail': 'Task already exists'}

@pytest.mark.asyncio
@patch(f'{path}.get_task_by_id', new_callable=AsyncMock)
async def test_get_task(mock_get_task_by_id):
    task = data('1', 'Title 1', 'Description 1', False)
    mock_get_task_by_id.return_value = task
    response = client.get('/api/tasks/{task._id}')
    assert response.status_code == 200
    assert response.json() == task

@pytest.mark.asyncio
@patch(f'{path}.update_task', new_callable=AsyncMock)
async def test_modify_task(mock_update_task):
    update_task = data('1', 'Title 1', 'Updated description 1', True)
    mock_update_task.return_value = update_task
    response = client.put('/api/tasks/{task._id}', json=update_task)
    assert response.status_code == 200
    assert response.json() == update_task

@pytest.mark.asyncio
@patch(f'{path}.delete_task', new_callable=AsyncMock)
async def test_delete_task(mock_delete_task):
    mock_delete_task.return_value = True
    response = client.delete('/api/tasks/1')
    assert response.status_code == 200
    assert response.json() == {'message': 'Successfully deleted'}
