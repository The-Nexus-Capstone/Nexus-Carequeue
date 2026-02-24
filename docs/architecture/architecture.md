# CareQueue System Architecture

## Overview
CareQueue is a microservices-based queue management system.

## Components

### Frontend
- **Technology:** React.js
- **Port:** 3000
- **Purpose:** User interface for patients and staff

### Backend
- **Technology:** Flask (Python)
- **Port:** 5000
- **Purpose:** REST API, business logic, database operations

### AI Service
- **Technology:** FastAPI (Python)
- **Port:** 8000
- **Purpose:** ML-powered wait time predictions

### Database
- **Technology:** PostgreSQL
- **Port:** 5432
- **Purpose:** Data persistence

## Data Flow
```
Patient → Frontend → Backend → AI Service
                       ↓
                   Database
```

## Deployment Environments
- **Local:** Docker Compose
- **Staging:** Render.com
- **Production:** AWS EC2
