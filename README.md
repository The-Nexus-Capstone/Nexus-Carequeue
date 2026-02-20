<<<<<<< HEAD
# 🏥 CareQueue

Smart Queue Management System for Public Health Clinics

[![CI Tests](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/workflows/CI%20Tests/badge.svg)](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/actions)

## 📖 Overview

CareQueue is a web-based queue management system designed for public healthcare clinics in Nigeria. It enables patients to join queues remotely and receive real-time updates via SMS.

**SDG Goal:** Reduced Inequalities (SDG 10)

## 🎯 Problem Statement

Long waiting times and lack of transparency in public health clinics lead to:
- Patient frustration and time wastage
- Overcrowded waiting rooms
- Inefficient clinic operations

## 💡 Solution

CareQueue provides:
- Remote queue joining via mobile or cyber café
- Real-time wait time estimates (AI-powered)
- SMS notifications
- Staff dashboard for queue management
- Multi-clinic support

## 🏗️ Architecture
```
Frontend (React) ↔ Backend (Flask) ↔ AI Service (FastAPI)
                       ↓
                  PostgreSQL
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.11+

### Run Locally
```bash
# Clone repository
git clone https://github.com/The-Nexus-Capstone/Nexus-Carequeue.git
cd Nexus-Carequeue

# Start all services
docker-compose up

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# AI Service: http://localhost:8000
```

### Run Individual Services

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**AI Service:**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

## 📁 Project Structure
```
Nexus-Carequeue/
├── frontend/          # React application
├── backend/           # Flask API
├── ai-service/        # FastAPI ML service
├── data-science/      # Data analysis & ML
├── security/          # Security policies & scans
├── infra/             # Infrastructure as Code
├── k8s/              # Kubernetes manifests
├── docs/             # Documentation
└── .github/          # CI/CD workflows
```

## 👥 Team - The Nexus (Group 27)

- **Product Manager**
- **Frontend Engineer**
- **Backend Engineer**
- **DevOps Engineer**
- **Data Scientist**
- **Cybersecurity Lead**
- **UI/UX Designer**

## 🎨 Design

**Figma:** [View Design System](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue)

See [Design Documentation](docs/design/figma.md)

## 🔐 Security

- JWT authentication
- RBAC implementation
- Input validation & sanitization
- HTTPS enforced
- Regular security scans
- NDPR compliant

See [Security Checklist](docs/security/security-checklist.md)

## 📊 AI/ML Features

- **Queue Time Prediction:** ML model predicts wait times
- **Demand Forecasting:** Predicts busy hours
- **Resource Optimization:** Recommends staffing levels

See [AI Documentation](ai-service/README.md)

## 🚢 Deployment

### Staging (Render.com)
- **URL:** https://carequeue-staging.onrender.com
- **Branch:** `develop`
- **Auto-deploy:** Yes

### Production (AWS EC2)
- **URL:** TBD
- **Branch:** `main`
- **Infrastructure:** Terraform + Ansible

See [Deployment Guide](docs/architecture/architecture.md)

## 🧪 Testing
```bash
# Run all tests
docker-compose -f docker-compose.test.yml up

# Backend tests
cd backend && pytest

# Frontend tests
cd frontend && npm test
```

## 🤝 Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md)

### Quick Workflow
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature
# ... make changes ...
git commit -m "feat: your feature"
git push origin feature/your-feature
# Create PR on GitHub
```

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 📞 Support

- **Documentation:** [docs/](docs/)
- **Issues:** [GitHub Issues](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/issues)
- **Discussions:** [GitHub Discussions](https://github.com/The-Nexus-Capstone/Nexus-Carequeue/discussions)

## 🌐 Links

- **Production:** Coming soon
- **Staging:** https://carequeue-staging.onrender.com
- **Design:** [Figma](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue)

---

**Capstone Project 2025 | SDG 10: Reduced Inequalities | The Nexus Team**
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> origin/develop
