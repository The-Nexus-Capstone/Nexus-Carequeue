from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv

load_dotenv()

socketio = SocketIO(cors_allowed_origins="*", async_mode="eventlet")


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"]                  = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config["SQLALCHEMY_DATABASE_URI"]     = os.environ.get("DATABASE_URL", "sqlite:///carequeue.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"]              = os.environ.get("JWT_SECRET", "dev-jwt-secret")
    app.config["TESTING"]                     = os.environ.get("FLASK_ENV") == "testing"

    from app.models import db
    db.init_app(app)

    CORS(app, origins=os.environ.get("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(","))
    JWTManager(app)
    socketio.init_app(app)

    from app.routes.auth      import auth_bp
    from app.routes.hospitals import hospitals_bp
    from app.routes.queue     import queue_bp
    from app.routes.admin     import admin_bp

    app.register_blueprint(auth_bp,      url_prefix="/api/auth")
    app.register_blueprint(hospitals_bp, url_prefix="/api/hospitals")
    app.register_blueprint(queue_bp,     url_prefix="/api/queues")
    app.register_blueprint(admin_bp,     url_prefix="/api")

    @app.route("/api/health")
    def health():
        return {"status": "ok", "service": "carequeue-backend"}

    with app.app_context():
        db.create_all()
        _seed_demo_data()

    return app


def _seed_demo_data():
    from app.models import db, Hospital, Staff, Clinic
    from werkzeug.security import generate_password_hash

    if Hospital.query.first():
        return

    invite_code = Hospital.generate_invite_code()

    hospital = Hospital(
        name="Community Health Center, Ikeja",
        type="General Hospital",
        location="Lagos",
        invite_code=invite_code,
    )
    db.session.add(hospital)
    db.session.flush()

    for clinic_name in ["General Consultation", "Follow-up Clinic", "Vaccination"]:
        db.session.add(Clinic(name=clinic_name, hospital_id=hospital.id))

    admin = Staff(
        name="Hospital Admin",
        email="admin@carequeue.com",
        password=generate_password_hash("password123"),
        role="admin",
        hospital_id=hospital.id,
    )
    db.session.add(admin)
    db.session.commit()

    print(f"[DB] Seeded demo hospital: {hospital.name}")
    print(f"[DB] Invite code: {invite_code}")
    print(f"[DB] Admin login: admin@carequeue.com / password123")


if __name__ == "__main__":pip install flask flask-sqlalchemy flask-jwt-extended flask-cors flask-socketio
    app = create_app()
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
