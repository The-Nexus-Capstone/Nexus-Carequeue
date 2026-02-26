# app/routes/queue.py
# TASK 4 — Patient Queue Routes (Most Important)
# ─────────────────────────────────────────────
# These are the patient-facing endpoints:
#   - View clinics + their live queue status
#   - Check in to a queue
#   - View your position after checking in
#
# Register this blueprint in app/main.py:
#   from app.routes.queue import queue_bp
#   app.register_blueprint(queue_bp)
# ─────────────────────────────────────────────

from flask import Blueprint, request, jsonify
from app.models import db, Clinic, QueueEntry
from app.tasks import send_sms_notification

queue_bp = Blueprint('queue', __name__, url_prefix='/api')


# ── List Clinics ───────────────────────────────
# Used by ClinicSelector.jsx to show clinics + live status
# Optional query param: ?hospital_id=X  (defaults to first hospital)

@queue_bp.route('/clinics', methods=['GET'])
def list_clinics():
    hospital_id = request.args.get('hospital_id')

    query = Clinic.query
    if hospital_id:
        query = query.filter_by(hospital_id=hospital_id)

    clinics = query.all()

    if not clinics:
        return jsonify({'error': 'No clinics found'}), 404

    return jsonify([c.to_dict() for c in clinics])


# ── Patient Check-In ───────────────────────────
# Called when patient submits the CheckInForm
# Creates a QueueEntry and returns their token + position

@queue_bp.route('/queue/checkin', methods=['POST'])
def checkin():
    data = request.get_json()

    # Validate required fields
    required = ['patient_name', 'phone', 'reason', 'clinic_id']
    missing = [f for f in required if not data.get(f, '').strip()]
    if missing:
        return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400

    clinic = Clinic.query.get(data['clinic_id'])
    if not clinic:
        return jsonify({'error': 'Clinic not found'}), 404

    # Calculate the next position in queue
    next_position = clinic.waiting_count + 1

    # Create the queue entry
    entry = QueueEntry(
        patient_name = data['patient_name'].strip(),
        phone        = data['phone'].strip(),
        reason       = data['reason'].strip(),
        clinic_id    = clinic.id,
        position     = next_position,
        status       = 'waiting',
    )
    db.session.add(entry)
    db.session.commit()

    # Send SMS confirmation (runs in background via Celery)
    wait = clinic.estimated_wait_minutes
    sms_message = (
        f"Hi {entry.patient_name}, you are #{next_position} in queue at {clinic.name}. "
        f"Estimated wait: {wait} minutes. Your token: {entry.token}"
    )
    send_sms_notification.delay(entry.phone, sms_message)

    return jsonify({
        'token':            entry.token,
        'position':         next_position,
        'total_in_queue':   clinic.waiting_count,
        'wait_time_minutes': wait,
        'wait_time_display': (
            f"{wait} mins" if wait < 60
            else f"{wait // 60} hr {wait % 60} mins".strip()
        ),
        'clinic_name':      clinic.name,
        'sms_confirmation': f"SMS sent to {entry.phone}",
        'message':          f"You are #{next_position} in queue. Estimated wait: {wait} minutes.",
    }), 201


# ── Queue Status ───────────────────────────────
# Called by QueueStatus.jsx and ViewQueue.jsx
# Patient uses the token they received after check-in

@queue_bp.route('/queue/status/<token>', methods=['GET'])
def queue_status(token):
    entry = QueueEntry.query.filter_by(token=token).first()

    if not entry:
        return jsonify({'error': 'Queue entry not found. Check your token.'}), 404

    if entry.status == 'done':
        return jsonify({'message': 'Your consultation is complete. Thank you!', 'status': 'done'})

    if entry.status == 'cancelled':
        return jsonify({'message': 'This queue entry has been cancelled.', 'status': 'cancelled'})

    return jsonify(entry.to_dict())
