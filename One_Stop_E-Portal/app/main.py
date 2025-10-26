from fastapi import FastAPI

from app.database.connection import database
from app.routes import users
from app.routes import services
from app.database import connection

app = FastAPI(title="One_Stop_E-Portal")

app.include_router(users.router)

app.include_router(services.router)
