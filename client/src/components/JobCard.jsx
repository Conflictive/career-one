import { Link } from 'react-router-dom';

function JobCard ({ jobData, onDelete, onUpdate}) {
    return (
          <div className="job-card">
            <button className="delete-btn" onClick={() => onDelete(jobData.id)}>
                &times; 
            </button>

            <div className="card-header">
              <Link className="role-link" to={`/jobs/${jobData.id}`}>
              <span className="role">{jobData.role}</span>
              </Link>
        
              <select 
                className={`status ${(jobData.status || "applied").toLowerCase()}`}
                onChange={(e) => onUpdate(jobData.id, e.target.value)}
                value={jobData.status || "Applied"}
              >
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Rejected</option>
              </select>
            </div>
            <h3 className="company">{jobData.company}</h3>
            <p className="salary">Salary: {jobData.salary}</p>
            <p className="date">Applied: {jobData.date}</p>
          </div>
    )
}

export default JobCard