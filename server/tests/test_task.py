import pytest

from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from server.main import app

client = TestClient(app)

@pytest.mark.asyncio
@patch('server.routes.task.get_all_tasks', new_callable=AsyncMock)
async def test_get_tasks(mock_get_all_tasks):
    mock_tasks = [
        {'_id': '1', 'title': 'Task 1', 'description': 'Description 1', 'completed': False},
        {'_id': '2', 'title': 'Task 2', 'description': 'Description 2', 'completed': True}
    ]

    mock_get_all_tasks.return_value = mock_tasks
    print(mock_get_all_tasks)
    response = client.get('/api/tasks')

    assert response.status_code == 200
    assert response.json() == mock_tasks