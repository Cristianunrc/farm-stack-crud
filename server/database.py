import os

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from bson import ObjectId
from .models import Task

load_dotenv()

URI = os.getenv("MONGODB_URI")

client = AsyncIOMotorClient(URI)
db = client.taskdb
collection = db.tasks

async def get_task_by_id(id):
    task = await collection.find_one({'_id': ObjectId(id)})
    return task

async def get_task_by_title(title):
    task = await collection.find_one({'title': title})
    return task

async def get_all_tasks():
    tasks = []
    cursor = collection.find({})
    async for doc in cursor:
        tasks.append(Task(**doc))
    return tasks

async def create_task(task):
    new_task = await collection.insert_one(task)
    created_task = await collection.find_one({'_id': new_task.inserted_id})
    created_task['_id'] = str(created_task['_id'])
    return created_task

async def update_task(id: str, data):
    task_items = data.dict().items()
    task = {key : val for key, val in task_items if val is not None}
    await collection.update_one({'_id': ObjectId(id)}, {'$set': task})
    updated_task = await collection.find_one({'_id': ObjectId(id)})
    return updated_task

async def delete_task(id: str):
    result = await collection.delete_one({'_id': ObjectId(id)})
    return result.deleted_count > 0