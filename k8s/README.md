# Kubernetes Deployment (Minikube)

## Setup Minikube
```bash
minikube start
eval $(minikube docker-env)
```

## Build Images
```bash
docker build -t carequeue-backend:latest ./backend
docker build -t carequeue-frontend:latest ./frontend
docker build -t carequeue-ai-service:latest ./ai-service
```

## Deploy
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/
```

## Access
```bash
minikube service frontend -n carequeue
```

## Cleanup
```bash
kubectl delete namespace carequeue
```
