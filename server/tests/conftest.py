import sys
import pytest
from pathlib import Path

# Add server/ to sys.path so we can import app
sys.path.insert(0, str(Path(__file__).parent.parent))

from app import create_app, db

@pytest.fixture
def app():
    """Create and configure a test app instance."""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    """Create a test client."""
    return app.test_client()