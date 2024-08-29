from fastapi import FastAPI, HTTPException
from .database import get_all_tasks, create_task, get_task_by_title
from .models import Task

app = FastAPI()

@app.get('/')
def root():
    return {'Wellcome': 'Wellcome to the API'}

@app.get('/api/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@app.post('/api/tasks')
async def save_task(task: Task):
    task_found = await get_task_by_title(task.title)
    if task_found:
        raise HTTPException(status_code=409, detail='Task already exists')

    response = await create_task(task.dict())
    if response:
        return response
    raise HTTPException(status_code=400, detail='Error to create the document')

@app.get('/api/tasks/{id}')
async def get_task():
    return 'single task'

@app.put('/api/tasks/{id}')
async def update_tasks():
    return 'updating task'

@app.delete('/api/tasks/{id}')
async def delete_task():
    return 'delete task'