from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
import os
from dotenv import load_dotenv

load_dotenv()

socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet')

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///carequeue.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'dev-jwt-secret')

    CORS(app, origins=os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(','))
    JWTManager(app)
    socketio.init_app(app)

    @app.route('/api/health')
    def health():
        return {'status': 'ok', 'service': 'carequeue-backend'}

    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
