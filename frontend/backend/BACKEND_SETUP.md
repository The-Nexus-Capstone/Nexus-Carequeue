# CareQueue Backend — PostgreSQL Setup Guide

## Prerequisites
- Python 3.11+
- Docker Desktop installed and running
- VS Code

---

## Step 1 — Get the code
Drop all files from this zip into your `backend/app/` folder.
Your structure should look like:

```
backend/
├── app/
│   ├── __init__.py       ← already exists
│   ├── main.py           ← REPLACE with the one from this zip
│   ├── models.py         ← NEW
│   ├── tasks.py          ← NEW
│   └── routes/
│       ├── __init__.py   ← NEW
│       ├── auth.py       ← NEW
│       ├── hospitals.py  ← NEW
│       ├── queue.py      ← NEW
│       └── admin.py      ← NEW
├── .env.example
├── requirements.txt
└── Dockerfile
```

---

## Step 2 — Set up your .env

```bash
cd backend
cp .env.example .env
```

Open `.env` and make sure these lines are set exactly like this
(they match the Docker Compose database config):

```
DATABASE_URL=postgresql://carequeue_user:carequeue_pass@localhost:5432/carequeue
POSTGRES_DB=carequeue
POSTGRES_USER=carequeue_user
POSTGRES_PASSWORD=carequeue_pass
```

> ⚠️ Use `localhost` (not `db`) in DATABASE_URL when running
> Flask locally outside Docker.

---

## Step 3 — Start PostgreSQL via Docker

You don't need to install Postgres manually. Just run:

```bash
# From the project ROOT (not the backend folder)
docker compose up db -d
```

This starts only the Postgres container in the background.
Check it's running:

```bash
docker ps
# You should see: carequeue-db   Up
```

---

## Step 4 — Set up Python environment

```bash
cd backend

python -m venv venv

# Mac / Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

---

## Step 5 — Run the backend

```bash
python -m flask --app "app.main:create_app" run --debug --port 5000
```

On first run you will see:

```
[DB] No data found — seeding demo hospital...
[DB] Seeded! Hospital: Community Health Center, Ikeja
[DB] Invite code: XXXXXXXX
[DB] Admin login: admin@carequeue.com / password123
```

Tables are created automatically. No SQL commands needed.

---

## Step 6 — Test it's working

Open a new terminal and run:

```bash
# Health check
curl http://localhost:5000/api/health

# Login test
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@carequeue.com", "password": "password123"}'
```

You should get back a JWT token. 

---

## Connecting to the Database directly (optional)

If you want to inspect the database:

```bash
# Connect via psql inside the Docker container
docker exec -it carequeue-db psql -U carequeue_user -d carequeue

# Useful commands once inside psql:
\dt              -- list all tables
SELECT * FROM hospitals;
SELECT * FROM staff;
SELECT * FROM clinics;
SELECT * FROM queue_entries;
\q               -- quit
```

---

## Running the full stack (all services together)

Once backend is ready, run everything:

```bash
# Dev mode (hot reload)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Services:
| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:5173  |
| Backend  | http://localhost:5000  |
| AI       | http://localhost:8000  |
| Postgres | localhost:5432         |
| Redis    | localhost:6379         |

---

## Running the Celery worker (SMS)

In a separate terminal:

```bash
cd backend
source venv/bin/activate
celery -A app.tasks.celery worker --loglevel=info
```

> In development with no Twilio credentials set, SMS messages
> just print to this terminal instead of actually sending.

---

## Troubleshooting

**"could not connect to server"**
→ Postgres container is not running. Run: `docker compose up db -d`

**"role does not exist"**
→ Your DATABASE_URL user doesn't match POSTGRES_USER in .env.
  Make sure both are `carequeue_user`.

**"password authentication failed"**
→ Wrong password in DATABASE_URL. Must match POSTGRES_PASSWORD.

**Tables not created**
→ Make sure `db.create_all()` runs — it's in `main.py` inside
  `create_app()`. Check there are no import errors on startup.
