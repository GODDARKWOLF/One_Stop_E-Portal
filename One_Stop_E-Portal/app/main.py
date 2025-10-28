from fastapi import FastAPI

from app.database.connection import database
from app.models import zra
from app.routes import users, services, policeR, zraR

from app.database import connection

app = FastAPI(title="One_Stop_E-Portal")

app.include_router(users.router)

app.include_router(services.router)

app.include_router(policeR.router)

app.include_router(zraR.router)
