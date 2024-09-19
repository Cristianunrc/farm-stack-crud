import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

app.include_router(task)

app.mount("/", StaticFiles(directory="client/dist", html=True), name="static")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    return FileResponse("client/dist/index.html")