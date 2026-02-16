# Infrastructure

## Directories

### `/terraform`
Infrastructure as Code for AWS provisioning

### `/ansible`
Configuration management and deployment automation

### `/kubernetes`
Kubernetes manifests for local (Minikube) and cloud deployment

### `/render`
Render.com configuration for staging environment

## Quick Start

### Local Development
```bash
docker-compose up
```

### Deploy to Minikube
```bash
cd ../k8s
kubectl apply -f .
```

### Deploy to AWS (Production)
```bash
cd terraform
terraform apply

cd ../ansible
ansible-playbook playbooks/deploy-app.yml
```
