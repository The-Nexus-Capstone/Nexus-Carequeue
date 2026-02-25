# app/routes/auth.py
# TASK 2 — Authentication Routes
# ─────────────────────────────────────────────

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from app.models import db, Staff, Hospital

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body is required'}), 400

    invite_code = data.get('invite_code', '').strip()
    email       = data.get('email', '').strip()
    password    = data.get('password', '').strip()

    # ── Login via Invite Code ──────────────────
    if invite_code:
        hospital = Hospital.query.filter_by(invite_code=invite_code.upper()).first()
        if not hospital:
            return jsonify({'error': 'Invalid invite code'}), 401

        token = create_access_token(identity=f'guest::{hospital.id}')
        return jsonify({
            'access_token': token,
            'user': {
                'name':     'Guest Staff',
                'role':     'staff',
                'hospital': hospital.name,
            },
        })

    # ── Login via Email + Password ─────────────
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    staff = Staff.query.filter_by(email=email).first()

    if not staff or not check_password_hash(staff.password_hash, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    hospital = Hospital.query.get(staff.hospital_id)
    token = create_access_token(identity=staff.id)

    return jsonify({
        'access_token': token,
        'user': {
            'id':       staff.id,
            'name':     staff.name,
            'email':    staff.email,
            'role':     staff.role,
            'hospital': hospital.name if hospital else None,
        },
    })
