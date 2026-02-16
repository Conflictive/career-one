import pytest
from app import create_app, db
from app.models import Job


def test_get_jobs(client):
    """Test GET /api/jobs returns a list."""
    response = client.get("/api/jobs")
    assert response.status_code == 200
    assert isinstance(response.json, list)


def test_create_job(client):
    """Test POST /api/jobs creates a new job."""
    job_data = {
        "role": "Software Engineer",
        "company": "Test Company",
        "status": "applied",
        "salary": "$100k - $120k",
    }
    response = client.post("/api/jobs", json=job_data)
    assert response.status_code == 201
    assert response.json["role"] == job_data["role"]
    assert response.json["company"] == job_data["company"]
    assert response.json["status"] == job_data["status"]
    assert response.json["salary"] == job_data["salary"]


def test_delete_job(client):
    """Test DELETE /api/jobs/<id> deletes a job."""
    # First create a job to delete
    job = Job(role="Test Role", company="Test Company", status="applied", salary="$50k")
    db.session.add(job)
    db.session.commit()

    response = client.delete(f"/api/jobs/{job.id}")
    assert response.status_code == 200
    assert response.json["message"] == "Job deleted successfully"


def test_update_job(client):
    """Test PATCH /api/jobs/<id> updates a job."""
    # First create a job to update
    job = Job(role="Test Role", company="Test Company", status="applied", salary="$50k")
    db.session.add(job)
    db.session.commit()

    update_data = {"status": "interviewing"}
    response = client.patch(f"/api/jobs/{job.id}", json=update_data)
    assert response.status_code == 200
    assert response.json["status"] == update_data["status"]


def test_get_job_by_id(client):
    """Test GET /api/jobs/<id> returns a job."""
    # First create a job to retrieve
    job = Job(role="Test Role", company="Test Company", status="applied", salary="$50k")
    db.session.add(job)
    db.session.commit()

    response = client.get(f"/api/jobs/{job.id}")
    assert response.status_code == 200
    assert response.json["id"] == job.id
    assert response.json["role"] == job.role
    assert response.json["company"] == job.company
    assert response.json["status"] == job.status
    assert response.json["salary"] == job.salary
