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

