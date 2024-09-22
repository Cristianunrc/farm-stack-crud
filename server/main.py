import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.task import task
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

CLIENT_URL = os.getenv('CLIENT_URL')

#CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(task)
