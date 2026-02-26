# app/routes/admin.py
# TASK 5 — Admin / Staff Dashboard Routes
# ─────────────────────────────────────────────
# All routes here require a valid JWT token.
# The frontend must send: Authorization: Bearer <token>
#
# Handles:
#   - Dashboard stats (patient count, wait time, doctors)
#   - Queue management (view, start consultation, mark done)
#
# Register this blueprint in app/main.py:
#   from app.routes.admin import admin_bp
#   app.register_blueprint(admin_bp)
# ─────────────────────────────────────────────

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Staff, Hospital, Clinic, QueueEntry
from app.tasks import send_sms_notification

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


def get_current_staff():
    """Helper: get the logged-in staff member from the JWT identity."""
    identity = get_jwt_identity()
    # Guest login via invite code has identity like 'guest::hospital_id'
    if identity and identity.startswith('guest::'):
        return None
    return Staff.query.get(identity)


# ── Dashboard Stats ────────────────────────────
# Used by Dashboard.jsx to show live stats

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    staff = get_current_staff()

    # Get hospital — from staff record or query param fallback
    hospital_id = request.args.get('hospital_id')
    if staff:
        hospital = Hospital.query.get(staff.hospital_id)
    elif hospital_id:
        hospital = Hospital.query.get(hospital_id)
    else:
        hospital = Hospital.query.first()  # fallback for demo

    if not hospital:
        return jsonify({'error': 'Hospital not found'}), 404

    clinics = Clinic.query.filter_by(hospital_id=hospital.id).all()

    total_waiting = sum(c.waiting_count for c in clinics)
    total_doctors = sum(c.active_doctors for c in clinics)

    # Average wait across all clinics
    wait_times = [c.estimated_wait_minutes for c in clinics if c.waiting_count > 0]
    avg_wait   = sum(wait_times) // len(wait_times) if wait_times else 0

    # Overall status
    if total_waiting > 15:
        status = 'Very Busy'
    elif total_waiting > 7:
        status = 'Busy'
    else:
        status = 'Not Busy'

    return jsonify({
        'hospital_name':              hospital.name,
        'total_patients_waiting':     total_waiting,
        'average_wait_time_minutes':  avg_wait,
        'average_wait_time_display':  f"{avg_wait} minutes",
        'active_doctors':             total_doctors,
        'status':                     status,
        'clinics': [c.to_dict() for c in clinics],
    })


# ── List Queue Patients ────────────────────────
# Used by QueueManagement.jsx
# Optional filter: ?status=Waiting  or  ?status=In+Progress

@admin_bp.route('/queue', methods=['GET'])
@jwt_required()
def queue_list():
    staff = get_current_staff()
    hospital_id = request.args.get('hospital_id')
    status_filter = request.args.get('status')  # 'waiting', 'in_progress', or None = all

    # Get clinic IDs for this hospital
    if staff:
        clinic_ids = [c.id for c in Clinic.query.filter_by(hospital_id=staff.hospital_id).all()]
    elif hospital_id:
        clinic_ids = [c.id for c in Clinic.query.filter_by(hospital_id=hospital_id).all()]
    else:
        clinic_ids = [c.id for c in Clinic.query.all()]

    query = QueueEntry.query.filter(QueueEntry.clinic_id.in_(clinic_ids))

    # Map frontend status labels to DB values
    status_map = {
        'Waiting':     'waiting',
        'In Progress': 'in_progress',
        'Done':        'done',
    }
    if status_filter and status_filter in status_map:
        query = query.filter_by(status=status_map[status_filter])
    else:
        # By default, only show active patients (not done/cancelled)
        query = query.filter(QueueEntry.status.in_(['waiting', 'in_progress']))

    patients = query.order_by(QueueEntry.position).all()

    return jsonify({
        'patients': [
            {
                'id':           p.id,
                'patient_name': p.patient_name,
                'phone':        p.phone,
                'reason':       p.reason,
                'status':       'In Progress' if p.status == 'in_progress' else p.status.capitalize(),
                'position':     p.position,
                'clinic_name':  p.clinic.name if p.clinic else '',
                'checked_in_at': p.checked_in_at.isoformat(),
            }
            for p in patients
        ],
        'total': len(patients),
    })


# ── Start Consultation ─────────────────────────
# Staff clicks "Start consultation" on a waiting patient
# Sets status to in_progress

@admin_bp.route('/queue/<entry_id>/next', methods=['PATCH'])
@jwt_required()
def start_consultation(entry_id):
    entry = QueueEntry.query.get(entry_id)

    if not entry:
        return jsonify({'error': 'Queue entry not found'}), 404

    if entry.status != 'waiting':
        return jsonify({'error': f'Cannot start — patient status is already: {entry.status}'}), 400

    entry.status = 'in_progress'
    db.session.commit()

    return jsonify({
        'message': f"Consultation started for {entry.patient_name}",
        'patient': {
            'id':           entry.id,
            'patient_name': entry.patient_name,
            'status':       'In Progress',
        },
    })


# ── Mark as Done ───────────────────────────────
# Staff clicks "Mark as done" after consultation
# Sets status to done and notifies next patient in queue

@admin_bp.route('/queue/<entry_id>/done', methods=['PATCH'])
@jwt_required()
def mark_done(entry_id):
    entry = QueueEntry.query.get(entry_id)

    if not entry:
        return jsonify({'error': 'Queue entry not found'}), 404

    entry.status = 'done'
    db.session.commit()

    # Notify the next patient in line (position 1 or 2 ahead)
    next_patients = QueueEntry.query.filter(
        QueueEntry.clinic_id == entry.clinic_id,
        QueueEntry.status == 'waiting',
        QueueEntry.position <= 3,
    ).all()

    for patient in next_patients:
        sms = (
            f"Hi {patient.patient_name}, you're almost up! "
            f"You are #{patient.position} in queue at {entry.clinic.name}. "
            f"Please make your way to the clinic."
        )
        send_sms_notification.delay(patient.phone, sms)

    return jsonify({
        'message': f"{entry.patient_name} marked as done.",
        'patient': {
            'id':           entry.id,
            'patient_name': entry.patient_name,
            'status':       'Done',
        },
    })
