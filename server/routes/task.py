from fastapi import APIRouter, HTTPException
from ..database import get_all_tasks, create_task, delete_task, update_task, get_task_by_title, get_task_by_id
from ..models import Task, UpdateTask

task = APIRouter()

@task.get('/api/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@task.post('/api/tasks')
async def save_task(task: Task):
    if not task.title or not task.description:
        raise HTTPException(status_code=400, detail='Title or description are required')
    
    existing_task = await get_task_by_title(task.title)
    if existing_task:
        raise HTTPException(status_code=409, detail='Task already exists')

    response = await create_task(task.model_dump())
    if response:
        return response
    raise HTTPException(status_code=400, detail='Error to create task')

@task.get('/api/tasks/{id}')
async def get_task(id: str):
    task = await get_task_by_id(id)
    if task:
        task['_id'] = str(task['_id'])
        return task
    raise HTTPException(status_code=404, detail=f'Task not found by id {id}')

@task.put('/api/tasks/{id}')
async def modify_task(id: str, task: UpdateTask):
    if not task.title or not task.description:
        raise HTTPException(status_code=400, detail='Title or description are required')
    
    response = await update_task(id, task)
    if response:
        response['_id'] = str(response['_id'])
        return response
    raise HTTPException(status_code=404, detail=f'Task not found by id {id}')

@task.delete('/api/tasks/{id}')
async def remove_task(id: str):
    response = await delete_task(id)
    if response:
        return {'message': 'Successfully deleted'}
    raise HTTPException(status_code=404, detail=f'Task not found by id {id}')