from fastapi import FastAPI

app = FastAPI(title="CareQueue AI Service")


@app.get("/health")
def health():
    return {"status": "ok", "service": "carequeue-ai"}


@app.post("/predict-wait-time")
def predict_wait_time(data: dict):
    queue_length    = data.get("queue_length", 5)
    doctors_on_duty = data.get("doctors_on_duty", 1)
    estimated_mins  = (queue_length * 10) // max(1, doctors_on_duty)
    return {
        "estimated_wait_minutes": estimated_mins,
        "confidence": "low",
        "note": "Simple estimate - ML model not yet trained"
    }
