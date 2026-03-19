# 🏥 CareQueue

Smart Queue Management System for Public Health Clinics

[![Backend CI](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/frontend-ci.yml)
[![Security Scan](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/security.yml/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions/workflows/security.yml)

CareQueue is a web-based queue management system for public healthcare clinics in Nigeria. Patients join queues remotely and receive real-time SMS updates. Built for **SDG 10: Reduced Inequalities**.

---

## 🚀 Quick Start

```bash
# Clone and set up
git clone https://github.com/The-Nexus-Capstone/Nexus-Carequeue.git
cd Nexus-Carequeue
cp backend/.env.example backend/.env   # fill in your values

# Start all services
docker compose up --build

# Dev mode with hot reload
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

| Service    | URL                   |
|------------|-----------------------|
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:5000 |
| AI Service | http://localhost:8000 |

> **Demo login:** admin@carequeue.com / password123

---

## 📁 Project Structure

```
Nexus-Carequeue/
├── frontend/        # React + Vite (Node 22)
├── backend/         # Flask REST API (Python 3.11)
├── ai-service/      # FastAPI ML service
├── data-science/    # Dataset & analysis
├── docs/            # Architecture, PRD, design, security
├── security/        # Security policies
├── .github/
│   └── workflows/   # CI/CD — backend-ci, frontend-ci, security, deploy
├── docker-compose.yml
└── docker-compose.dev.yml
```

---

## 🔁 Git Workflow

```
main          ← Production (Render.com)
  └── develop ← Staging (Render.com — auto-deploys on push)
        └── feature/your-feature
        └── fix/bug-name
        └── docs/update-name
```

**Start every piece of work the same way:**

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# work, then commit
git add .
git commit -m "feat: what you did"
git push origin feature/your-feature-name
# open a PR to develop on GitHub
```

**Commit types:** `feat` `fix` `docs` `style` `refactor` `test` `chore`

**Rules:**
- Always branch from `develop` — never from `main`
- All PRs target `develop`
- CI must pass before merging
- At least 1 teammate must review
- Only DevOps/PM merges `develop → main`

---

## 🚢 Deployment

All deployments use **Docker + Render.com** triggered by **GitHub Actions**.

```
Push to develop
    → GitHub Actions runs CI (tests + build)
    → CI passes → deploy.yml triggers Render auto-deploy
    → Team reviews staging
    → DevOps/PM merges develop → main → production redeploys
```

| Environment | Branch    | URL                                    |
|-------------|-----------|----------------------------------------|
| Staging     | `develop` | https://carequeue-staging.onrender.com |
| Production  | `main`    | TBD                                    |

---

## 🧪 Testing

```bash
# Backend tests
cd backend && pytest tests/ -v

# Frontend lint + build
cd frontend && npm run lint && npm run build

# Via Docker
docker compose run backend pytest tests/ -v
```

---

## 👥 Team — The Nexus (Group 27)

| Role               | Responsibilities                                              |
|--------------------|---------------------------------------------------------------|
| Product Manager    | PRD, roadmap, sprint planning                                 |
| UI/UX Designer     | Figma designs, design system                                  |
| Frontend Engineer  | React components, routing, API integration                    |
| Backend Engineer   | Flask API, models, auth, queue logic                          |
| DevOps Engineer    | Docker, GitHub Actions, Render deployment                     |
| Data Scientist     | ML model, data analysis, AI service                           |
| Cybersecurity Lead | Security scans, NDPR compliance, JWT/RBAC                     |

---

## 🎨 Design

Built from a Figma design system. See the full prototype and component specs:

**[View Figma Design →](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue)**

See also [Design Documentation](docs/design/figma.md)

---

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for the full guide.

Quick summary: branch from `develop` → commit with conventional commits → open PR to `develop` → get a review → merge.

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
