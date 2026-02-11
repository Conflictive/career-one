from flask import Blueprint, jsonify, request
from app.models import db, Job as JobModel
from datetime import date 
from app.schemas import Job as JobSchema


jobs_bp = Blueprint("jobs", __name__)


@jobs_bp.route("/api/jobs", methods=["GET"])
def get_jobs():
    """Fetch all jobs from the database and return as a list."""
    jobs = JobModel.query.all()
    return jsonify([job.to_json() for job in jobs])


@jobs_bp.route("/api/jobs", methods=["POST"])
def add_job():
    """Create a new job object and add it the the database, returns the job object with status code 201"""
    data = request.json
    validation = JobSchema(**request.json)
    print(type(validation.creation_date))
    new_job = JobModel(
        role=data["role"],
        company=data["company"],
        status="Applied",
        creation_date=date.today(),
        salary=data.get("salary", "N/A"),
    )

    db.session.add(new_job)
    db.session.commit()

    return jsonify(new_job.to_json()), 201


@jobs_bp.route("/api/jobs/<int:job_id>", methods=["DELETE"])
def delete_job(job_id):
    """Delete a job with the given id from the database, returns deletion message with status code 200"""

    job_to_delete = db.session.get(JobModel, job_id)

    if job_to_delete == None:
        return jsonify({"error": "Job not found"}), 404

    db.session.delete(job_to_delete)
    db.session.commit()

    return jsonify({"message": "Job deleted successfully"}), 200


@jobs_bp.route("/api/jobs/<int:job_id>", methods=["PATCH"])
def update_job(job_id):
    """Update a jobs status with the given id, returns update message with status code 200"""
    data = request.json

    job_to_update = db.session.get(JobModel, job_id)
    new_status = data.get("status")

    if job_to_update is None:
        return jsonify({"error": "Job not found"}), 404

    job_to_update.status = new_status

    db.session.commit()

    return jsonify({"message": "Job status updated successfully"}), 200


@jobs_bp.route("/api/jobs/<int:job_id>", methods=["GET"])
def get_job_by_id(job_id):
    job = db.session.get(JobModel, job_id)

    if job is None:
        return jsonify({"Error": "Job not found"}), 404

    return jsonify(job.to_json())
