from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import db, Hospital, Staff

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required = ['name', 'email', 'password', 'hospital_name']
    for field in required:
        if not data or not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    if Staff.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    invite_code = Hospital.generate_invite_code()

    hospital = Hospital(
        name=data['hospital_name'],
        type=data.get('hospital_type', ''),
        location=data.get('location', ''),
        phone=data.get('phone', ''),
        invite_code=invite_code,
    )
    db.session.add(hospital)
    db.session.flush()

    admin = Staff(
        name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role='admin',
        hospital_id=hospital.id,
    )
    db.session.add(admin)
    db.session.commit()

    return jsonify({
        'message':     'Hospital and admin account created',
        'invite_code': invite_code,
    }), 201


@auth_bp.route('/join', methods=['POST'])
def join_hospital():
    data = request.get_json()

    required = ['name', 'email', 'password', 'hospital_id']
    for field in required:
        if not data or not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    if Staff.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    hospital = db.session.get(Hospital, data['hospital_id'])
    if not hospital:
        return jsonify({'error': 'Hospital not found'}), 404

    staff = Staff(
        name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        role='staff',
        hospital_id=hospital.id,
    )
    db.session.add(staff)
    db.session.commit()

    token = create_access_token(identity=str(staff.id))
    return jsonify({
        'access_token': token,
        'user': {
            'id':            staff.id,
            'name':          staff.name,
            'email':         staff.email,
            'role':          staff.role,
            'hospital':      hospital.name,
            'hospital_name': hospital.name,
        }
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400

    staff = Staff.query.filter_by(email=data['email']).first()

    if not staff:
        return jsonify({'error': 'Invalid email or password'}), 401

    if not check_password_hash(staff.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    token = create_access_token(
        identity=str(staff.id),
        additional_claims={'role': staff.role, 'hospital_id': staff.hospital_id}
    )

    return jsonify({
        'access_token': token,
        'user': {
            'id':            staff.id,
            'name':          staff.name,
            'email':         staff.email,
            'role':          staff.role,
            'hospital':      staff.hospital.name,
            'hospital_name': staff.hospital.name,
        }
    }), 200
