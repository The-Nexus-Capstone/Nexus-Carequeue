from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone
from app.models import db, QueueEntry, Clinic, Staff

queue_bp = Blueprint('queue', __name__)


@queue_bp.route('/', methods=['POST'])
def join_queue():
    data = request.get_json()

    required = ['patient_name', 'phone', 'clinic_id']
    for field in required:
        if not data or not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    clinic = db.session.get(Clinic, data['clinic_id'])
    if not clinic:
        return jsonify({'error': 'Clinic not found'}), 404

    position = QueueEntry.query.filter_by(
        clinic_id=data['clinic_id'], status='waiting'
    ).count() + 1

    entry = QueueEntry(
        patient_name=data['patient_name'],
        phone=data['phone'],
        reason=data.get('reason', 'General Consultation'),
        clinic_id=data['clinic_id'],
        status='waiting',
    )
    db.session.add(entry)
    db.session.commit()

    estimated_wait = position * 10

    return jsonify({
        'message':        'Joined queue successfully',
        'queue_id':       entry.id,
        'position':       position,
        'estimated_wait': f'{estimated_wait} mins',
        'clinic':         clinic.name,
    }), 201


@queue_bp.route('/', methods=['GET'])
@jwt_required()
def get_queue():
    staff_id = get_jwt_identity()
    staff    = db.session.get(Staff, staff_id)

    if not staff:
        return jsonify({'error': 'Unauthorised'}), 401

    clinic_ids = [c.id for c in staff.hospital.clinics]

    entries = QueueEntry.query.filter(
        QueueEntry.clinic_id.in_(clinic_ids),
        QueueEntry.status.in_(['waiting', 'in_progress'])
    ).order_by(QueueEntry.joined_at).all()

    return jsonify([
        {
            'id':     e.id,
            'name':   e.patient_name,
            'phone':  e.phone,
            'type':   e.reason,
            'status': 'In Progress' if e.status == 'in_progress' else 'Waiting',
        }
        for e in entries
    ])


@queue_bp.route('/<int:entry_id>/start', methods=['PATCH'])
@jwt_required()
def start_consultation(entry_id):
    entry = db.session.get(QueueEntry, entry_id)
    if not entry:
        return jsonify({'error': 'Queue entry not found'}), 404
    entry.status     = 'in_progress'
    entry.started_at = datetime.now(timezone.utc)
    db.session.commit()
    return jsonify({'message': 'Consultation started', 'id': entry.id})


@queue_bp.route('/<int:entry_id>/done', methods=['PATCH'])
@jwt_required()
def mark_done(entry_id):
    entry = db.session.get(QueueEntry, entry_id)
    if not entry:
        return jsonify({'error': 'Queue entry not found'}), 404
    entry.status  = 'done'
    entry.done_at = datetime.now(timezone.utc)
    db.session.commit()
    return jsonify({'message': 'Marked as done', 'id': entry.id})
