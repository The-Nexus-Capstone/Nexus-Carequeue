# app/routes/hospitals.py
# TASK 3 — Hospital & Staff Registration Routes
# ─────────────────────────────────────────────
# Handles:
#   - Registering a new hospital (2-step signup)
#   - Listing all hospitals (for JoinHospital dropdown)
#   - Staff joining an existing hospital
#
# Register this blueprint in app/main.py:
#   from app.routes.hospitals import hospitals_bp
#   app.register_blueprint(hospitals_bp)
# ─────────────────────────────────────────────

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash
from app.models import db, Hospital, Staff, Clinic

hospitals_bp = Blueprint('hospitals', __name__, url_prefix='/api')


# ── List All Hospitals ─────────────────────────
# Used by JoinHospital.jsx to populate the dropdown

@hospitals_bp.route('/hospitals', methods=['GET'])
def list_hospitals():
    all_hospitals = Hospital.query.all()
    return jsonify([
        {
            'id':       h.id,
            'name':     h.name,
            'type':     h.type,
            'location': h.location,
        }
        for h in all_hospitals
    ])


# ── Register a New Hospital ────────────────────
# Called from HospitalSignup.jsx on final submit
# Creates: the hospital, the admin user, and 3 default clinics

@hospitals_bp.route('/hospitals/register', methods=['POST'])
def register_hospital():
    data = request.get_json()

    # Validate required fields
    required = ['full_name', 'work_email', 'password', 'hospital_name', 'hospital_type', 'location']
    missing = [f for f in required if not data.get(f, '').strip()]
    if missing:
        return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400

    # Check email is not already registered
    if Staff.query.filter_by(email=data['work_email'].strip()).first():
        return jsonify({'error': 'An account with this email already exists'}), 409

    # Create the hospital
    hospital = Hospital(
        name     = data['hospital_name'].strip(),
        type     = data['hospital_type'].strip(),
        location = data['location'].strip(),
        contact  = data.get('contact_number', '').strip(),
    )
    db.session.add(hospital)
    db.session.flush()  # get hospital.id before commit

    # Create 3 default clinics for the hospital
    default_clinics = ['Clinic A — General', 'Clinic B', 'Clinic C']
    for clinic_name in default_clinics:
        clinic = Clinic(hospital_id=hospital.id, name=clinic_name, active_doctors=1)
        db.session.add(clinic)

    # Create the admin staff member
    admin = Staff(
        name          = data['full_name'].strip(),
        email         = data['work_email'].strip(),
        password_hash = generate_password_hash(data['password']),
        hospital_id   = hospital.id,
        role          = 'admin',
    )
    db.session.add(admin)
    db.session.commit()

    # Return a JWT so they're logged in immediately
    access_token = create_access_token(identity=admin.id)

    return jsonify({
        'hospital_id':   hospital.id,
        'hospital_name': hospital.name,
        'invite_code':   hospital.invite_code,
        'access_token':  access_token,
        'message':       'Hospital registered successfully',
    }), 201


# ── Staff Join Hospital ────────────────────────
# Called from JoinHospital.jsx
# Staff can join by invite code OR by selecting from the dropdown

@hospitals_bp.route('/staff/join', methods=['POST'])
def join_hospital():
    data = request.get_json()

    invite_code = data.get('invite_code', '').strip().upper()
    hospital_id = data.get('hospital_id', '').strip()

    # Find hospital
    hospital = None
    if invite_code:
        hospital = Hospital.query.filter_by(invite_code=invite_code).first()
    elif hospital_id:
        hospital = Hospital.query.get(hospital_id)

    if not hospital:
        return jsonify({'error': 'Hospital not found. Check the invite code.'}), 404

    # Validate required personal fields
    full_name  = data.get('full_name', '').strip()
    work_email = data.get('work_email', '').strip()
    password   = data.get('password', '').strip()

    if not all([full_name, work_email, password]):
        return jsonify({'error': 'full_name, work_email, and password are required'}), 400

    if Staff.query.filter_by(email=work_email).first():
        return jsonify({'error': 'An account with this email already exists'}), 409

    # Create the staff account
    staff = Staff(
        name          = full_name,
        email         = work_email,
        password_hash = generate_password_hash(password),
        hospital_id   = hospital.id,
        role          = 'staff',
    )
    db.session.add(staff)
    db.session.commit()

    access_token = create_access_token(identity=staff.id)

    return jsonify({
        'message':       'Account created. You can now manage the hospital queue.',
        'hospital_name': hospital.name,
        'access_token':  access_token,
    }), 201
