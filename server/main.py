import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routes.task import task

load_dotenv()
CLIENT_URL = os.getenv("CLIENT_URL")

app = FastAPI()

#CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get('/')
def root():
    return {'Wellcome': 'Wellcome to the API'}

app.include_router(task)
