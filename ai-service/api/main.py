from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="CareQueue AI Service", version="1.0.0")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ai-service",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/predict/wait-time")
async def predict_wait_time(data: dict):
    # Simple calculation for now
    queue_length = data.get("queue_length", 0)
    avg_time = data.get("avg_consultation_time", 15)
    
    estimated_wait = queue_length * avg_time
    
    return {
        "estimated_wait_time": estimated_wait,
        "queue_position": queue_length,
        "prediction_method": "simple_calculation"
    }
