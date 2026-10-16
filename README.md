```markdown
# Task Management API (FastAPI)

This is a RESTful backend API that allows authenticated users to manage their personal tasks.

## Features

- User Registration and Login (JWT Authentication)
- Password hashing using bcrypt
- Protected task routes
- Create, Read, Update, Delete tasks
- Task ownership enforcement
- PostgreSQL database integration

## Tech Stack

- FastAPI
- PostgreSQL
- SQLAlchemy
- bcrypt
- Python-JOSE (JWT)
- Docker & Docker Compose

## API Endpoints

POST /signup  
POST /login  
GET /tasks  
PUT /tasks/{task_id}  
DELETE /tasks/{task_id}

## Local Setup

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd <your-project-folder>
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Start PostgreSQL

Make sure PostgreSQL is running locally.

### 4. Run the server
```bash
uvicorn main:app --reload
```

### 5. Open API docs
```
http://127.0.0.1:8000/docs
```

## Docker Setup

Run the full system (FastAPI + PostgreSQL):
```bash
docker-compose up --build
```

Then open:
```
http://localhost:8000/docs
```

## Live Deployment (Vercel)

The API can be deployed to Vercel as a single Python serverless function.

### Prerequisites
- A Vercel account
- A GitHub/GitLab/Bitbucket repository connected to Vercel
- A managed PostgreSQL database (recommended: Neon or Supabase)

### 1. Prepare the project
The repository is already Vercel-ready:
- `main.py` exports the FastAPI `app` instance (Vercel's recognized entrypoint)
- `requirements.txt` is UTF-8 encoded
- `.python-version` pins Python 3.12
- `vercel.json` configures the function duration

### 2. Create a PostgreSQL database
Create a database on Neon/Supabase and copy its connection string, e.g.
```
postgresql://user:password@host:5432/dbname?sslmode=require
```

### 3. Push the code to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 4. Import the project in Vercel
1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel auto-detects FastAPI (Python runtime). No build command is required.

### 5. Set environment variables
In Vercel Dashboard -> Project -> Settings -> Environment Variables, add:
- `DATABASE_URL` = your Postgres connection string
- `SECRET_KEY` = a long random string used to sign JWTs

Apply to Production, Preview, and Development.

### 6. Deploy
Click Deploy. Vercel builds and deploys the function. Open:
```
https://<your-project>.vercel.app/docs
```

### Notes
- Vercel's filesystem is read-only except `/tmp`. The app falls back to a temporary SQLite database if `DATABASE_URL` is not set, but data will not persist. Always set `DATABASE_URL` for production.
- Endpoints are served at the root path: `/signup`, `/login`, `/tasks`, etc.
- For a custom frontend origin, CORS is enabled for all origins by default.
- On Vercel with Supabase, use the **Transaction pooler** connection string (port 6543) to avoid IPv6 connectivity issues.

## Author

Henok Mesfin  
fullstack Developer (FastAPI / Python)

GitHub: https://github.com/henok-ne/task-management-rest-api-fastapi

## Future Improvements

- Pagination for tasks
- Task deadlines and priorities
- User roles (admin / standard)
- Refresh tokens for authentication
- Rate limiting
- Improved error handling
```
