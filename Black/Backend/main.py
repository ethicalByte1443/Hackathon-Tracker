from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates as j2
from pydantic import BaseModel
from pymongo import MongoClient


client = MongoClient("mongodb+srv://AseeM:<xtO4qVqoTiX5KoGI>@cluster0.ssq3x.mongodb.net/notes")
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = j2(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("index.html", {"request" : request})



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