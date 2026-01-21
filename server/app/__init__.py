# server/app/__init__.py
from flask import Flask
from flask_cors import CORS
from config import Config
from app.models import db


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    CORS(app)

    from app.routes.jobs import jobs_bp

    app.register_blueprint(jobs_bp)

    with app.app_context():
        db.create_all()

    return app
