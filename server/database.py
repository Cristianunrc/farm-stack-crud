import os

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from .models import Task

load_dotenv()

URI = os.getenv("MONGODB_URI")

client = AsyncIOMotorClient(URI)
db = client.taskdb
collection = db.tasks

async def get_one_task_id(id):
    task = await collection.find_one({'_id': id})
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
    return created_task

async def update_task(id: str, task):
    await collection.update_one({'_id': id}, {'$set': task})
    doc = await collection.find_one({'_id': id})
    return doc

async def delete_task(id: str):
    await collection.delete_one({'_id': id})
    return True