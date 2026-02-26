# app/models.py
# TASK 1 — Database Models (PostgreSQL)
# ─────────────────────────────────────────────
# Uses PostgreSQL-native types:
#   - UUID primary keys (not plain strings)
#   - TIMESTAMP WITH TIME ZONE (not naive datetime)
#   - Text (no length limits needed in Postgres)
#
# Tables are created automatically on first run via db.create_all()
# in main.py — no manual SQL needed.
# ─────────────────────────────────────────────

import uuid
import random
import string
from datetime import datetime, timezone

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID

db = SQLAlchemy()


# ── Helpers ───────────────────────────────────

def generate_uuid():
    return str(uuid.uuid4())

def generate_invite_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

def generate_queue_token():
    return 'CQ-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))


# ── Hospital ──────────────────────────────────

class Hospital(db.Model):
    __tablename__ = 'hospitals'

    id          = db.Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    name        = db.Column(db.Text, nullable=False)
    type        = db.Column(db.Text, nullable=False)       # e.g. "Clinic", "Teaching Hospital"
    location    = db.Column(db.Text, nullable=False)
    contact     = db.Column(db.Text, nullable=True)
    invite_code = db.Column(db.Text, unique=True, nullable=False, default=generate_invite_code)
    created_at  = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # Relationships
    staff   = db.relationship('Staff',  backref='hospital', lazy=True)
    clinics = db.relationship('Clinic', backref='hospital', lazy=True)

    def to_dict(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'type':        self.type,
            'location':    self.location,
            'contact':     self.contact,
            'invite_code': self.invite_code,
        }


# ── Staff ─────────────────────────────────────

class Staff(db.Model):
    __tablename__ = 'staff'

    id            = db.Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    name          = db.Column(db.Text, nullable=False)
    email         = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    hospital_id   = db.Column(UUID(as_uuid=False), db.ForeignKey('hospitals.id'), nullable=False)
    role          = db.Column(db.Text, nullable=False, default='staff')  # 'admin' or 'staff'
    created_at    = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'email':       self.email,
            'role':        self.role,
            'hospital_id': self.hospital_id,
        }


# ── Clinic ────────────────────────────────────

class Clinic(db.Model):
    __tablename__ = 'clinics'

    id             = db.Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    hospital_id    = db.Column(UUID(as_uuid=False), db.ForeignKey('hospitals.id'), nullable=False)
    name           = db.Column(db.Text, nullable=False)
    active_doctors = db.Column(db.Integer, default=1, nullable=False)

    # Relationships
    queue_entries = db.relationship('QueueEntry', backref='clinic', lazy=True)

    @property
    def waiting_count(self):
        """Live count of patients currently waiting or in progress."""
        return QueueEntry.query.filter(
            QueueEntry.clinic_id == self.id,
            QueueEntry.status.in_(['waiting', 'in_progress'])
        ).count()

    @property
    def status(self):
        count = self.waiting_count
        if count > 15:
            return 'Very Busy'
        elif count > 7:
            return 'Busy'
        return 'Not Busy'

    @property
    def estimated_wait_minutes(self):
        count   = self.waiting_count
        doctors = max(self.active_doctors, 1)
        return (count // doctors) * 10  # assumes 10 min avg consultation

    def to_dict(self):
        wait = self.estimated_wait_minutes
        return {
            'id':                self.id,
            'hospital_id':       self.hospital_id,
            'name':              self.name,
            'active_doctors':    self.active_doctors,
            'waiting':           self.waiting_count,
            'status':            self.status,
            'wait_time_minutes': wait,
            'wait_time_display': (
                f"{wait} mins" if wait < 60
                else f"{wait // 60} hr {wait % 60} mins".strip()
            ),
        }


# ── QueueEntry ────────────────────────────────

class QueueEntry(db.Model):
    __tablename__ = 'queue_entries'

    id            = db.Column(UUID(as_uuid=False), primary_key=True, default=generate_uuid)
    token         = db.Column(db.Text, unique=True, nullable=False, default=generate_queue_token)
    patient_name  = db.Column(db.Text, nullable=False)
    phone         = db.Column(db.Text, nullable=False)
    reason        = db.Column(db.Text, nullable=False)
    clinic_id     = db.Column(UUID(as_uuid=False), db.ForeignKey('clinics.id'), nullable=False)
    position      = db.Column(db.Integer, nullable=False)
    status        = db.Column(db.Text, nullable=False, default='waiting')
    # Status values: 'waiting' | 'in_progress' | 'done' | 'cancelled'
    checked_in_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        wait  = self.clinic.estimated_wait_minutes if self.clinic else 0
        total = self.clinic.waiting_count if self.clinic else 0
        return {
            'id':                self.id,
            'token':             self.token,
            'patient_name':      self.patient_name,
            'phone':             self.phone,
            'reason':            self.reason,
            'clinic_id':         self.clinic_id,
            'clinic_name':       self.clinic.name if self.clinic else '',
            'position':          self.position,
            'total_in_queue':    total,
            'wait_time_minutes': wait,
            'wait_time_display': (
                f"{wait} mins" if wait < 60
                else f"{wait // 60} hr {wait % 60} mins".strip()
            ),
            'status':            self.status,
            'checked_in_at':     self.checked_in_at.isoformat(),
        }
