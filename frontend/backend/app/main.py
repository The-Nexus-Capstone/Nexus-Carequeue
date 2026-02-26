# app/main.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv

from app.models import db

load_dotenv()

# Initialize SocketIO
socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')

def create_app():
    app = Flask(__name__)

    # ── Config ─────────────────────────────────
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'dev-jwt-secret')
    
    # Force SQLite for now to avoid environment variable errors
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nexus_carequeue.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # ── Extensions ─────────────────────────────
    db.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    JWTManager(app)
    socketio.init_app(app)

    # ── Blueprints ─────────────────────────────
    from app.routes.auth      import auth_bp
    from app.routes.hospitals import hospitals_bp
    from app.routes.queue     import queue_bp
    from app.routes.admin     import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(hospitals_bp, url_prefix='/api/hospitals')
    app.register_blueprint(queue_bp, url_prefix='/api/queue')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # ── Health Check ───────────────────────────
    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'carequeue-backend'}

    # ── Create Tables & Seed ───────────────────
    with app.app_context():
        db.create_all()
        _seed_demo_data()

    return app

def _seed_demo_data():
    from app.models import Hospital, Staff, Clinic
    from werkzeug.security import generate_password_hash

    if Hospital.query.first():
        return 

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
    print(f"[DB] Seeded! Admin login: admin@carequeue.com / password123")

# ── THE STARTER MOTOR ──────────────────────
# This part ensures the server actually runs!
if __name__ == "__main__":
    app = create_app()
    print("\n" + "="*40)
    print("  🚀 NEXUS CAREQUEUE SERVER IS STARTING...")
    print("  URL: http://127.0.0.1:5000")
    print("="*40 + "\n")
    socketio.run(app, debug=True, port=5000)
