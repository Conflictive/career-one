from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from app.models import db
from pydantic import ValidationError
from dotenv import load_dotenv

load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    
    CORS(app)
    
    # CORS(app, resources={
    #     r"/api/*": {
    #         "origins": ["http://localhost:3000", "https://*.vercel.app", "https://career-one-pi.vercel.app"]
    #     }
    # })

    from app.routes.jobs import jobs_bp

    app.register_blueprint(jobs_bp)

    @app.errorhandler(ValidationError)
    def handle_pydantic_validation_error(e):
        return jsonify({"error": "Validation Failed", "details": e.errors()}), 400

    with app.app_context():
        db.create_all()

    return app
