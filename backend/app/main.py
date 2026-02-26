# app/main.py
# UPDATED MAIN — PostgreSQL Edition
# ─────────────────────────────────────────────
# Key Postgres additions vs the original:
#   - Connection pool settings (pool_size, max_overflow)
#   - pool_pre_ping: auto-reconnects dropped connections
#   - Seeder function for first-time setup
# ─────────────────────────────────────────────

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)

    # ── Config ─────────────────────────────────
    secret_key   = os.environ.get('SECRET_KEY')
    jwt_secret   = os.environ.get('JWT_SECRET')
    database_url = os.environ.get('DATABASE_URL')

    if not secret_key:
        raise RuntimeError('[ERROR] SECRET_KEY is not set. Copy backend/.env.example to backend/.env and fill in your values.')
    if not jwt_secret:
        raise RuntimeError('[ERROR] JWT_SECRET is not set. Copy backend/.env.example to backend/.env and fill in your values.')
    if not database_url:
        raise RuntimeError('[ERROR] DATABASE_URL is not set. Copy backend/.env.example to backend/.env and fill in your values.')

    app.config['SECRET_KEY']                     = secret_key
    app.config['JWT_SECRET_KEY']                 = jwt_secret
    app.config['SQLALCHEMY_DATABASE_URI']        = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # ── PostgreSQL connection pool settings ────
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_size':    5,
        'max_overflow': 10,
        'pool_timeout': 30,
        'pool_recycle': 1800,
        'pool_pre_ping': True,
    }

    # ── Extensions ─────────────────────────────
    from app.models import db
    db.init_app(app)

    cors_origins = os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(',')
    CORS(app, origins=cors_origins)
    JWTManager(app)

    socketio = SocketIO(cors_allowed_origins=cors_origins, async_mode='eventlet')
    socketio.init_app(app)

    # ── Blueprints ─────────────────────────────
    # Uncomment ONLY after that route file has been created and merged
    # from app.routes.auth      import auth_bp
    # from app.routes.hospitals import hospitals_bp
    # from app.routes.queue     import queue_bp
    # from app.routes.admin     import admin_bp

    # app.register_blueprint(auth_bp)
    # app.register_blueprint(hospitals_bp)
    # app.register_blueprint(queue_bp)
    # app.register_blueprint(admin_bp)

    # ── Health Check ───────────────────────────
    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'carequeue-backend', 'db': 'postgresql'}

    # ── Create Tables & Seed ───────────────────
    # Uncomment ONLY after models.py has been created and merged
    # with app.app_context():
    #     db.create_all()
    #     _seed_demo_data()

    return app


def _seed_demo_data():
    """
    Seeds one demo hospital with 3 clinics and an admin user
    on first run only. Skips silently if data already exists.

    Demo login after seeding:
        Email:    admin@carequeue.com
        Password: password123
    """
    from app.models import Hospital, Staff, Clinic
    from werkzeug.security import generate_password_hash

    if Hospital.query.first():
        return  # already seeded, skip

    print("[DB] No data found — seeding demo hospital...")

    hospital = Hospital(
        name     = 'Community Health Center, Ikeja',
        type     = 'Clinic',
        location = 'Ikeja, Lagos',
        contact  = '+234-800-0000001',
    )
    db.session.add(hospital)
    db.session.flush()

    for clinic_name in ['Clinic A — General', 'Clinic B — Paediatrics', 'Clinic C — Eye & ENT']:
        db.session.add(Clinic(hospital_id=hospital.id, name=clinic_name, active_doctors=1))

    admin = Staff(
        name          = 'Admin User',
        email         = 'admin@carequeue.com',
        password_hash = generate_password_hash('password123'),
        hospital_id   = hospital.id,
        role          = 'admin',
    )
    db.session.add(admin)
    db.session.commit()

    print(f"[DB] Seeded! Hospital: {hospital.name}")
    print(f"[DB] Invite code: {hospital.invite_code}")
    print(f"[DB] Admin login: admin@carequeue.com / password123")
