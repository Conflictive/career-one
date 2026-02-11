from flask import Blueprint, jsonify, request
from app.models import db, Job as JobModel
from datetime import date
from app.schemas import JobUpdate, Job as JobSchema

jobs_bp = Blueprint("jobs", __name__)


@jobs_bp.route("/api/jobs", methods=["GET"])
def get_jobs():
    """Fetch all jobs from the database and return as a list."""
    jobs = JobModel.query.all()
    
    return jsonify(
        [JobSchema.model_validate(job).model_dump(mode="json") for job in jobs]
    )


@jobs_bp.route("/api/jobs", methods=["POST"])
def add_job():
    """Create a new job object and add it the the database, returns the job object with status code 201"""

    # Pydantic validates the incoming data from the frontend
    validated_data = JobSchema(**request.json)

    # Use Pydantic object to create an SQLAlchemy object
    new_job = JobModel(**validated_data.model_dump())

    # Save new job to DB
    db.session.add(new_job)
    db.session.commit()

    # SQLAlchemy object -> Pydantic object -> JSON string for React
    return jsonify(JobSchema.model_validate(new_job).model_dump(mode="json")), 201


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
    validated_data = JobUpdate(**request.json)

    job_to_update = db.session.get(JobModel, job_id)

    if job_to_update is None:
        return jsonify({"error": "Job not found"}), 404

    # Only store fields that have values (Not None)
    update_data = validated_data.model_dump(exclude_unset=True)

    # Set new data for each edited field
    for key, value in update_data.items():
        setattr(job_to_update, key, value)

    db.session.commit()

    return jsonify(JobSchema.model_validate(job_to_update).model_dump(mode="json")), 200


@jobs_bp.route("/api/jobs/<int:job_id>", methods=["GET"])
def get_job_by_id(job_id):
    job = db.session.get(JobModel, job_id)

    if job is None:
        return jsonify({"Error": "Job not found"}), 404

    return jsonify(JobSchema.model_validate(job).model_dump(mode="json"))
