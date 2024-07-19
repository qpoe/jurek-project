from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()
openai.api_key = os.getenv("OPENAI_API_KEY")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatPrompt(BaseModel):
    user_message: str

@app.post("/chat/")
async def chat(prompt: ChatPrompt):
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are supportive college admissions helper assistant. You empower girls to do their best. Start with 'I'm college admission helper, how can I evaluate your portfolio?' (only first message) and you should help with mental health."},
                {"role": "user", "content": prompt.user_message}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))