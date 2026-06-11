from fastapi import FastAPI, Form, UploadFile, File
import uvicorn

app = FastAPI()

@app.put("/test")
async def test_endpoint(
    task_code: str = Form(...),
    description: str = Form(None),
    file: UploadFile = File(None)
):
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8005)
