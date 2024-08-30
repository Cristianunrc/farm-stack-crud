from fastapi import FastAPI
from .routes.task import task

app = FastAPI()

@app.get('/')
def root():
    return {'Wellcome': 'Wellcome to the API'}

app.include_router(task)