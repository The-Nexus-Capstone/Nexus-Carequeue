from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from datetime import datetime, timezone
from app.models import db, QueueEntry, Clinic, Staff

admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_stats():
    staff_id = get_jwt_identity()
    staff    = db.session.get(Staff, staff_id)

    if not staff:
        return jsonify({'error': 'Unauthorised'}), 401

    clinic_ids = [c.id for c in staff.hospital.clinics]

    total_waiting = QueueEntry.query.filter(
        QueueEntry.clinic_id.in_(clinic_ids),
        QueueEntry.status == 'waiting'
    ).count()

    completed_today = QueueEntry.query.filter(
        QueueEntry.clinic_id.in_(clinic_ids),
        QueueEntry.status == 'done',
        QueueEntry.started_at.isnot(None),
        QueueEntry.done_at.isnot(None),
        func.date(QueueEntry.done_at) == func.date(datetime.now(timezone.utc))
    ).all()

    if completed_today:
        total_mins = sum(
            (e.done_at.replace(tzinfo=timezone.utc) - e.started_at.replace(tzinfo=timezone.utc)).seconds // 60
            for e in completed_today
        )
        avg_wait = total_mins // len(completed_today)
    else:
        avg_wait = 10

    return jsonify({
        'totalWaiting':  total_waiting,
        'avgWaitTime':   f'{avg_wait} mins',
        'activeDoctors': len(clinic_ids),
    })
