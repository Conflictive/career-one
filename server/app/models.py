from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()


class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    creation_date = db.Column(db.Date, default=lambda: date.today())
    salary = db.Column(db.String(50), nullable=False)

    # Jsonify cannot handle the internal state of an SQLAlchemy object
    # so it needs to converted into a dictionary first
    def to_json(self):
        return {
            "id": self.id,
            "role": self.role,
            "company": self.company,
            "status": self.status,
            "creation_date": self.creation_date.isoformat() if self.creation_date else None,
            "salary": self.salary,
        }
