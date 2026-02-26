# 🏥 CareQueue

Smart Queue Management System for Public Health Clinics

[![Backend CI](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/frontend-ci.yml)
[![Security Scan](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/security.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/security.yml)

---

## 📖 Overview

CareQueue is a web-based queue management system designed for public healthcare clinics in Nigeria. It enables patients to join queues remotely and receive real-time updates via SMS.

**SDG Goal:** Reduced Inequalities (SDG 10)

---

## 🎯 Problem Statement

Long waiting times and lack of transparency in public health clinics lead to:
- Patient frustration and time wastage
- Overcrowded waiting rooms
- Inefficient clinic operations

## 💡 Solution

CareQueue provides:
- Remote queue joining via mobile or cyber café
- Real-time wait time estimates
- SMS notifications via Twilio
- Staff dashboard for queue management
- Multi-clinic support per hospital

---

## 🏗️ Architecture

```
Frontend (React + Vite)
        ↕  REST API
Backend (Flask)  ←→  AI Service (FastAPI)
        ↓
   PostgreSQL
        ↑
   Redis (Celery broker — SMS queue)
```

---

## 📁 Project Structure

```
Nexus-Carequeue/
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── Pages/              # Top-level pages (Landing)
│   │   ├── Shared/             # Reusable UI components & global styles
│   │   │   ├── Components/     # Button, Input, Card, Select, BackButton, Branding
│   │   │   └── Styles/         # Global.css
│   │   ├── features/
│   │   │   ├── Patients/       # Patient-facing flows
│   │   │   │   ├── Pages/      # CheckIn, QueueStatus, ViewQueue, CompleteCheckIn
│   │   │   │   └── Components/ # CheckInForm, ClinicSelector, QueueStatusCard
│   │   │   └── Stuff/          # Staff-facing flows
│   │   │       ├── Pages/      # Login, HospitalSignup, JoinHospital, Dashboard, QueueManagement
│   │   │       └── Components/ # AdminLayout, AuthFooter
│   │   ├── App.jsx             # Routes definition
│   │   └── main.jsx            # Entry point
│   ├── Dockerfile              # Production build (nginx)
│   ├── Dockerfile.dev          # Dev build (Vite HMR)
│   └── package.json
│
├── backend/                    # Flask REST API (Python 3.11)
│   ├── app/
│   │   ├── main.py             # App factory, DB init, seeder
│   │   ├── models.py           # SQLAlchemy models (Hospital, Staff, Clinic, QueueEntry)
│   │   ├── tasks.py            # Celery tasks (SMS via Twilio)
│   │   └── routes/
│   │       ├── auth.py         # POST /api/auth/login
│   │       ├── hospitals.py    # GET/POST /api/hospitals, POST /api/staff/join
│   │       ├── queue.py        # GET /api/clinics, POST /api/queue/checkin, GET /api/queue/status/<token>
│   │       └── admin.py        # GET /api/admin/dashboard, GET/PATCH /api/admin/queue
│   ├── tests/
│   │   └── test_health.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example            # Copy to .env before running
│
├── ai-service/                 # FastAPI ML service (Python 3.11)
│   ├── api/                    # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
│
├── data-science/               # Data analysis & ML
│   └── carequeue.csv           # Training dataset
│
├── security/                   # Security policies
│
├── docs/
│   ├── architecture/           # System architecture
│   ├── design/                 # Figma links & design specs
│   ├── prd/                    # Product Requirements Document
│   └── security/               # Security checklist
│
├── .github/
│   ├── workflows/
│   │   ├── backend-ci.yml      # Runs pytest on PRs to develop & main
│   │   ├── frontend-ci.yml     # Runs ESLint + Vite build on PRs
│   │   ├── security.yml        # Security scanning
│   │   └── deploy.yml          # Auto-deploys develop branch to Render.com
│   └── CONTRIBUTING.md
│
├── docker-compose.yml          # Production services
├── docker-compose.dev.yml      # Dev overrides (hot reload)
└── .env.example                # Environment variables template
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 22+
- Python 3.11+
- Git

### Run Everything with Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/The-Nexus-Capstone/Nexus-Carequeue.git
cd Nexus-Carequeue

# 2. Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env — set your DB password, JWT secret, etc.

# 3. Start all services
docker compose up --build

# 4. Access the app
#    Frontend:   http://localhost:3000
#    Backend:    http://localhost:5000
#    AI Service: http://localhost:8000
```

### Development Mode (Hot Reload)

```bash
# Frontend runs on port 5173 with live reload
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Run Services Individually

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
flask --app "app.main:create_app" run --port 5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev       # → http://localhost:5173
```

**AI Service:**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

**Celery Worker (SMS background tasks):**
```bash
cd backend
celery -A app.tasks.celery worker --loglevel=info
```

---

## 🔑 Demo Login

On first startup the backend seeds a demo hospital automatically.

| Field    | Value                          |
|----------|--------------------------------|
| Email    | admin@carequeue.com            |
| Password | password123                    |
| Role     | Admin                          |
| Hospital | Community Health Center, Ikeja |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint           | Description                              | Auth |
|--------|--------------------|------------------------------------------|------|
| POST   | `/api/auth/login`  | Login with email+password or invite code | No   |

### Hospitals
| Method | Endpoint                  | Description                   | Auth |
|--------|---------------------------|-------------------------------|------|
| GET    | `/api/hospitals`          | List all hospitals            | No   |
| POST   | `/api/hospitals/register` | Register new hospital + admin | No   |
| POST   | `/api/staff/join`         | Staff joins existing hospital | No   |

### Patient Queue
| Method | Endpoint                     | Description                         | Auth |
|--------|------------------------------|-------------------------------------|------|
| GET    | `/api/clinics?hospital_id=X` | List clinics with live queue status | No   |
| POST   | `/api/queue/checkin`         | Patient checks in to queue          | No   |
| GET    | `/api/queue/status/<token>`  | Patient checks their position       | No   |

### Admin / Staff (JWT Protected)
| Method | Endpoint                     | Description                        | Auth   |
|--------|------------------------------|------------------------------------|--------|
| GET    | `/api/admin/dashboard`       | Live stats & clinic summary        | ✅ JWT |
| GET    | `/api/admin/queue`           | List active patients               | ✅ JWT |
| PATCH  | `/api/admin/queue/<id>/next` | Start consultation (→ in_progress) | ✅ JWT |
| PATCH  | `/api/admin/queue/<id>/done` | Mark consultation done             | ✅ JWT |

---

## 🔁 Git Workflow

We follow a **feature branch → develop → main** flow.

```
main          ← Production (deployed on Render.com)
  └── develop ← Staging (auto-deploys to Render.com on every push)
        └── feature/your-feature-name
        └── fix/bug-description
        └── docs/update-name
```

### Start a New Feature

```bash
# 1. Always branch off develop — never off main
git checkout develop
git pull origin develop

# 2. Create your branch with the correct prefix
git checkout -b feature/your-feature-name

# Branch prefixes:
#   feature/   → new functionality
#   fix/       → bug fix
#   docs/      → documentation only
#   refactor/  → code restructure, no new features
#   test/      → adding or updating tests
#   chore/     → maintenance, dependency updates
```

### Commit and Push

```bash
git add .
git commit -m "feat: short description of what you did"
git push origin feature/your-feature-name
```

### Open a Pull Request

- Go to GitHub → **New Pull Request**
- **base:** `develop` ← **compare:** `feature/your-feature-name`
- Fill in the PR description
- Request a review from a teammate
- CI must pass before merging

### Commit Message Convention

```
type: short description (lowercase, present tense)

Types:
  feat:      New feature
  fix:       Bug fix
  docs:      Documentation only
  style:     Formatting, no logic change
  refactor:  Code restructure, no behaviour change
  test:      Adding or updating tests
  chore:     Maintenance, dependency updates

Examples:
  feat: add SMS notification on queue check-in
  fix: resolve position counter not updating after done
  docs: update API endpoint table in README
  chore: bump flask to 3.1.1
```

### PR Rules
- All PRs must target `develop` — never push directly to `main`
- CI (backend tests + frontend build) must pass before merge
- At least 1 team member must review and approve
- Use squash merge to keep history clean

### Merging develop → main (Releases)
Only the DevOps lead or PM merges `develop` into `main` after team sign-off. This triggers the production deployment on Render.

```bash
git checkout main
git pull origin main
git merge develop --no-ff -m "release: merge develop into main"
git push origin main
```

---

## 🚢 Deployment

All deployments go through **Render.com** using **Docker** containers — no manual server management needed.

| Environment | Branch    | Platform   | URL                                    | Trigger              |
|-------------|-----------|------------|----------------------------------------|----------------------|
| Staging     | `develop` | Render.com | https://carequeue-staging.onrender.com | Auto on push         |
| Production  | `main`    | Render.com | TBD                                    | Auto on push to main |

### How Deployment Works

```
Developer pushes to develop
        ↓
GitHub Actions runs CI (backend-ci + frontend-ci)
        ↓
CI passes → deploy.yml triggers Render.com
        ↓
Render pulls latest Docker image and redeploys
        ↓
Team reviews staging
        ↓
DevOps/PM merges develop → main
        ↓
Production auto-redeploys on Render.com
```

### GitHub Actions Workflows

| Workflow          | Trigger               | What it does                    |
|-------------------|-----------------------|---------------------------------|
| `backend-ci.yml`  | PR to develop or main | Runs pytest against PostgreSQL  |
| `frontend-ci.yml` | PR to develop or main | Runs ESLint + Vite build check  |
| `security.yml`    | PR to develop or main | Security scanning               |
| `deploy.yml`      | Push to develop       | Triggers Render.com auto-deploy |

---

## 🧪 Testing

```bash
# Backend tests
cd backend && pytest tests/ -v

# Frontend lint + build check
cd frontend && npm run lint && npm run build

# Run backend tests via Docker
docker compose run backend pytest tests/ -v
```

---

## 👥 Team — The Nexus (Group 27)

| Role               | Responsibilities                                              |
|--------------------|---------------------------------------------------------------|
| Product Manager    | PRD, roadmap, sprint planning, stakeholder communication      |
| UI/UX Designer     | Figma designs, design system, user research                   |
| Frontend Engineer  | React components, routing, API integration                    |
| Backend Engineer   | Flask API, database models, auth, queue logic                 |
| DevOps Engineer    | Docker, GitHub Actions, Render deployment, environment config |
| Data Scientist     | ML model, data analysis, AI service                           |
| Cybersecurity Lead | Security scans, NDPR compliance, JWT/RBAC audit               |

---

## 🔐 Security

- JWT authentication (flask-jwt-extended)
- Role-based access: `admin` and `staff` roles
- Input validation on all POST endpoints
- Passwords hashed with Werkzeug
- CORS restricted to known origins
- HTTPS enforced on Render.com
- Regular security scans via GitHub Actions
- NDPR compliant

See [Security Checklist](docs/security/security-checklist.md)

---

## 📊 AI/ML Features

- **Queue Time Prediction:** ML model estimates wait time from queue depth and doctor count
- **Demand Forecasting:** Predicts busy hours to aid staffing
- **Resource Optimization:** Recommends optimal staffing levels

See [AI Service README](ai-service/README.md)

---

## 🎨 Design

**Figma:** [View Design System](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue)

See [Design Documentation](docs/design/figma.md)

---

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

## 📞 Support & Links

- **Docs:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/issues)
- **Discussions:** [GitHub Discussions](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/discussions)
- **Staging:** https://carequeue-staging.onrender.com
- **Design:** [Figma](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue)

---

**Capstone Project 2025 | SDG 10: Reduced Inequalities | The Nexus Team**
