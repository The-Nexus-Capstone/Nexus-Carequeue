from flask import Blueprint, jsonify
from app.models import Hospital

hospitals_bp = Blueprint('hospitals', __name__)


@hospitals_bp.route('/', methods=['GET'])
def list_hospitals():
    hospitals = Hospital.query.order_by(Hospital.name).all()
    return jsonify([
        {
            'id':       h.id,
            'name':     h.name,
            'type':     h.type,
            'location': h.location,
        }
        for h in hospitals
    ])
