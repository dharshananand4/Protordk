# Deployment Guide - Protordk v1.0

This guide covers deploying Protordk to popular cloud platforms.

## Quick Deployment Options

### Option 1: Heroku (Recommended for Beginners)

1. **Create Procfile**
```
web: gunicorn app:app
```

2. **Create runtime.txt**
```
python-3.9.16
```

3. **Install Heroku CLI** and deploy:
```bash
heroku login
heroku create protordk
git push heroku feature/v1.0-release:main
```

4. **Access your app:**
```
https://protordk.herokuapp.com
```

### Option 2: AWS (Elastic Beanstalk)

1. **Install EB CLI**
```bash
pip install awsebcli --upgrade --user
```

2. **Initialize and deploy:**
```bash
eb init -p python-3.9 protordk
eb create protordk-env
eb deploy
```

### Option 3: Docker

1. **Create Dockerfile**
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

2. **Build and run:**
```bash
docker build -t protordk .
docker run -p 5000:5000 protordk
```

### Option 4: Google Cloud Run

1. **Create app.yaml**
```yaml
runtime: python39
env: standard
```

2. **Deploy:**
```bash
gcloud run deploy protordk --source .
```

## Environment Variables

Create `.env` file in production:
```
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
```

## Performance Optimization

- Use GPU instances for faster model inference
- Enable model caching with Redis
- Use load balancing for multiple instances
- Consider using smaller models for production

## Monitoring

Set up monitoring for:
- API response times
- Error rates
- Model loading times
- Memory usage

## Support

For deployment issues, create an issue on GitHub.
