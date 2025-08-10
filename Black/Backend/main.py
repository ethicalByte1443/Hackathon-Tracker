from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates as j2
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
db_connected = False


try:
    client = MongoClient(MONGODB_URL)
    client.admin.command("ping")
    db_connected = True
    print("DATABASE CONNECTED SUCCESSFULLY")
except Exception as e:
    db_connected = False
    print("Database not connect properply check the URL", e)


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = j2(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request : Request):
    if db_connected:
        return templates.TemplateResponse("index.html", {"request" : request})
    else:
        return templates.TemplateResponse("error.html", {"request": request})
    



class Note(BaseModel):
    title: str
    content: str



@app.post("/submit/notes")
async def submit_notes(note: Note):
    # Here you can save note to a database (currently just printing)
    print(f"📌 New Note: {note.title} - {note.content}")

    return {
        "message": "Note added successfully",
        "data": note.dict()
    }