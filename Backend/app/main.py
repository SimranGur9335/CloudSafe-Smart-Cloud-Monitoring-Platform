from fastapi import FastAPI
from app.routes.cloud import router as cloud_router

app = FastAPI(title="CSPM Tool API")

app.include_router(cloud_router, prefix="/cloud", tags=["Cloud"])

@app.get("/")
def read_root():
    return {"message": "CSPM API running successfully!"}
