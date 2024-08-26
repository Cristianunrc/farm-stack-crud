from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {'Wellcome': 'Wellcome to the API'}