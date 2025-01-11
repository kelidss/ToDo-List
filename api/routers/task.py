from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.task import Task
from schemas.task import TaskCreate, TaskResponse
from database.connection import get_db
from auth.jwt import get_current_token

router = APIRouter()

@router.post("/tasks/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_token: dict = Depends(get_current_token)):
    db_task = Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/tasks/", response_model=list[TaskResponse])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_token: dict = Depends(get_current_token)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks

@router.get("/tasks/{task_id}", response_model=TaskResponse)
def read_task(task_id: int, db: Session = Depends(get_db), current_token: dict = Depends(get_current_token)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), current_token: dict = Depends(get_current_token)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.model_dump().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/tasks/{task_id}", response_model=TaskResponse)
def delete_task(task_id: int, db: Session = Depends(get_db), current_token: dict = Depends(get_current_token)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return db_task
