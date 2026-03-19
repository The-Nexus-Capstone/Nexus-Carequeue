from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import secrets
import string

db = SQLAlchemy()


class Hospital(db.Model):
    __tablename__ = 'hospitals'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(200), nullable=False)
    type        = db.Column(db.String(100))
    location    = db.Column(db.String(200))
    phone       = db.Column(db.String(30))
    invite_code = db.Column(db.String(20), unique=True, nullable=False)
    created_at  = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    staff   = db.relationship('Staff',  back_populates='hospital', lazy=True)
    clinics = db.relationship('Clinic', back_populates='hospital', lazy=True)

    @staticmethod
    def generate_invite_code():
        chars = string.ascii_uppercase + string.digits
        return ''.join(secrets.choice(chars) for _ in range(8))


class Staff(db.Model):
    __tablename__ = 'staff'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(150), nullable=False)
    email       = db.Column(db.String(150), unique=True, nullable=False)
    password    = db.Column(db.String(200), nullable=False)
    role        = db.Column(db.String(20), default='staff')
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)
    created_at  = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    hospital = db.relationship('Hospital', back_populates='staff')


class Clinic(db.Model):
    __tablename__ = 'clinics'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(150), nullable=False)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)
    created_at  = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    hospital      = db.relationship('Hospital', back_populates='clinics')
    queue_entries = db.relationship('QueueEntry', back_populates='clinic', lazy=True)


class QueueEntry(db.Model):
    __tablename__ = 'queue_entries'

    id           = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(150), nullable=False)
    phone        = db.Column(db.String(30),  nullable=False)
    reason       = db.Column(db.String(200))
    clinic_id    = db.Column(db.Integer, db.ForeignKey('clinics.id'), nullable=False)
    status       = db.Column(db.String(20), default='waiting')
    joined_at    = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    started_at   = db.Column(db.DateTime)
    done_at      = db.Column(db.DateTime)

    clinic = db.relationship('Clinic', back_populates='queue_entries')
