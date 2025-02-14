# Node.js CI/CD Pipeline with GitHub Actions

## Overview

This project automates the CI/CD process for a Node.js application using GitHub Actions. The workflow consists of two jobs:

1. **Build Job**: Installs dependencies, runs tests, builds a Docker image, and pushes it to Docker Hub.
2. **Deploy Job**: Deploys the application to an AWS EKS cluster.

## Workflow Trigger

The workflow is triggered on every push to the `main` branch.

## Workflow Steps

### Build Job

1. **Checkout code**: Clones the repository.
2. **Setup Node.js**: Uses Node.js 18.x.
3. **Install dependencies**: Runs `npm install`.
4. **Run tests**: Executes `npm test`.
5. **Build and push Docker image**:
   - Builds a Docker image tagged with `${{ github.run_number }}-${{ github.sha }}`.
   - Logs in to Docker Hub using secrets.
   - Pushes the image to Docker Hub.

### Deploy Job

1. **Checkout code**: Clones the repository.
2. **Authenticate AWS**: Configures AWS credentials from GitHub Secrets.
3. **Update Kubeconfig**: Updates the Kubernetes configuration for EKS.
4. **Deploy to EKS**: Applies the Kubernetes manifests.
5. **Check deployment status**: Monitors rollout status.
6. **Rollback on failure**: Rolls back to the previous deployment if the deployment fails.

## Prerequisites

- A GitHub repository with this workflow in `.github/workflows/ci.yml`.
- Docker Hub account with repository access.
- AWS EKS cluster configured.
- Kubernetes manifests in `manifest/` directory.

## Secrets Configuration

Add the following secrets to your GitHub repository:

- `DOCKER_USERNAME`: Docker Hub username.
- `DOCKER_PASSWORD`: Docker Hub password.
- `AWS_ACCESS_KEY_ID`: AWS access key.
- `AWS_SECRET_ACCESS_KEY`: AWS secret key.

## Deployment Verification

After deployment, check the status using:

```sh
kubectl get all
```

To rollback manually:

```sh
kubectl rollout undo deployment/nodejs-deploy
```

## Author

Arun | DevOps

