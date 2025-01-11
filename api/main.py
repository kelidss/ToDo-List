from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import task
from database.connection import engine
from models.task import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gerenciador de Tarefas API",
    description="API para gerenciar tarefas com autenticação JWT",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

origins = [
    "https://localhost",
    "http://localhost",
    "https://localhost:8000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router)