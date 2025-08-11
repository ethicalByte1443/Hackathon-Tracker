from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates as j2
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId
from datetime import datetime

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
db_connected = False


try:
    client = MongoClient(MONGODB_URL)
    client.admin.command("ping")
    db_connected = True
    db = client["notes_db"]  # Database name
    notes_collection = db["notes"]  # Collection name
    print("DATABASE CONNECTED SUCCESSFULLY")
except Exception as e:
    db_connected = False
    print("Database not connect properply check the URL -->", e)


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = j2(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request : Request):
    if db_connected:
        return templates.TemplateResponse("index.html", {"request" : request})
    else:
        return templates.TemplateResponse("error.html", {"request": request})
    
@app.get("/get/notes")
async def get_notes():
    try:
        notes = list(notes_collection.find().sort("time", -1))  # newest first
        for note in notes:
            note["_id"] = str(note["_id"])  # convert ObjectId to string
        return {"notes": notes}
    except Exception as e:
        return {"error": str(e)}


class Note(BaseModel):
    title: str
    content: str



@app.post("/submit/notes")
async def submit_notes(note: Note):
    if not db_connected:
        return {"message": "Database connection failed", "data": None}

    note_data = {
        "_id": str(ObjectId()),  # custom string ID
        "title": note.title,
        "content": note.content,
        "time": datetime.utcnow().isoformat()
    }

    try:
        result = notes_collection.insert_one(note_data)
        return {
            "message": "Note added successfully",
            "inserted_id": str(result.inserted_id),
            "data": note_data
        }
    except Exception as e:
        return {
            "message": "Note adding failed",
            "error": str(e)
        }