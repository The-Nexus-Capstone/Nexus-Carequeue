# 🏥 CareQueue

Smart Queue Management System for Public Health Clinics

## 📖 Overview
CareQueue enables patients to join clinic queues remotely and receive real-time updates via SMS, reducing waiting times and improving healthcare access.

**SDG Goal:** Reduced Inequalities (SDG 10)

## 🎨 Design

**Figma Prototype:** [View Interactive Design](https://www.figma.com/proto/EsRnBIeQ4fvVjmJAsN7WUQ/CareQueue?node-id=0-1&t=aiyvNc498NoBI8OW-1)

See [Design Documentation](docs/DESIGN.md) for complete design system, color palette, typography, and component specifications.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Node.js 18+
- Python 3.11+

### Run Locally
```bash
git clone https://github.com/The-Nexus-Capstone/Nexus-Carequeue.git
cd Nexus-Carequeue
docker-compose up
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🏗️ Tech Stack
- **Frontend:** React.js
- **Backend:** Python Flask
- **Database:** PostgreSQL
- **Deployment:** Render.com
- **CI/CD:** GitHub Actions

## 📁 Project Structure
```
carequeue/
├── frontend/       # React application
├── backend/        # Flask API
├── docs/          # Documentation
│   └── DESIGN.md  # Design documentation & Figma link
├── infra/         # Infrastructure configs
└── .github/       # GitHub workflows & guidelines
```

## 📚 Documentation

- [Design System & Figma](docs/DESIGN.md)
- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [Deployment Guide](docs/DEPLOYMENT.md) (coming soon)

## 👥 Team - The Nexus

**Capstone Project 2025**
- Product Manager
- Backend Engineer
- Frontend Engineer
- DevOps Engineer
- Data Scientist
- Cybersecurity Lead
- UI/UX Designer

## 🤝 Contributing

We follow a structured Git workflow. See [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details.

### Quick Workflow
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature

# Make changes, then commit
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## 🌐 Deployment

- **Staging:** Coming soon
- **Production:** Coming soon

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

**SDG 10: Reduced Inequalities | Making Healthcare Accessible for Everyone**
