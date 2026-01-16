from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    salary = db.Column(db.String(50), nullable=False)

    # Jsonify cannot handle the internal state of an SQLAlchemy object
    # so it needs to converted into a dictionary first
    def to_json(self):
        return {
            "id": self.id,
            "role": self.role,
            "company": self.company,
            "status": self.status,
            "date": self.date,
            "salary": self.salary
        }


with app.app_context():
    db.create_all()

# Get all jobs from db
@app.route("/api/jobs", methods=['GET'])
def get_jobs():
    jobs = Job.query.all() 
    return jsonify([job.to_json() for job in jobs]) 

# Add new job to db
@app.route("/api/jobs", methods=['POST'])
def add_job():
    data = request.json 
    
    new_job = Job(
        role=data['role'], 
        company=data['company'], 
        status="Applied",  # Default status until I build the status selector
        date="2024-01-25", # TODO: Replace with dynamic date.today()
        salary=data.get('salary', 'N/A')
    )
    
    db.session.add(new_job) 
    db.session.commit()     
    
    return jsonify(new_job.to_json()), 201

@app.route("/api/jobs", methods=['DELETE'])
def delete_job():
    pass

if __name__ == "__main__":
    app.run(debug=True, port=8080)