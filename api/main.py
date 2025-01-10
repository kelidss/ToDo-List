from fastapi import FastAPI
from routers import task
from database.connection import engine
from models.task import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(task.router)