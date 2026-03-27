# NOVA AI Platform - Kubernetes Deployment Guide

## Prerequisites

- GKE cluster created and configured
- kubectl configured with cluster access
- Helm 3.x installed (optional)
- Docker images pushed to GCR

## Quick Start

```bash
# Set environment variables
export PROJECT_ID="your-project-id"
export CLUSTER_NAME="novai-cluster"
export REGION="asia-southeast1"

# Get cluster credentials
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION --project $PROJECT_ID

# Create namespaces
kubectl apply -f namespaces.yaml

# Create secrets (edit values first!)
kubectl apply -f secrets.example.yaml

# Deploy services
kubectl apply -f service-account.yaml
kubectl apply -f api-gateway.yaml
kubectl apply -f generation-service.yaml
kubectl apply -f ingress.yaml

# Verify deployment
kubectl get pods -n novai-production
kubectl get services -n novai-production
kubectl get ingress -n novai-production
```

## Monitoring

```bash
# View logs
kubectl logs -f deployment/api-gateway -n novai-production
kubectl logs -f deployment/generation-service -n novai-production

# Check metrics
kubectl top pods -n novai-production

# Access Prometheus
kubectl port-forward svc/novai-prometheus -n novai-production 9090:9090
```

## Scaling

```bash
# Manual scaling
kubectl scale deployment api-gateway --replicas=5 -n novai-production

# HPA status
kubectl get hpa -n novai-production
```

## Troubleshooting

```bash
# Check pod status
kubectl describe pod <pod-name> -n novai-production

# Check events
kubectl get events -n novai-production --sort-by='.lastTimestamp'

# Debug pod
kubectl run debug --rm -it --image=alpine --restart=Never -n novai-production
```
