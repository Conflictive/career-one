function JobCard ({ jobData, onDelete}) {
    return (
          <div className="job-card">
            <button className="delete-btn" onClick={() => onDelete(jobData.id)}>
                &times; 
            </button>

            <div className="card-header">
              <span className="role">{jobData.role}</span>
              <span className={`status ${jobData.status.toLowerCase()}`}>
                {jobData.status}
              </span>
            </div>
            <h3 className="company">{jobData.company}</h3>
            <p className="salary">Salary: {jobData.salary}</p>
            <p className="date">Applied: {jobData.date}</p>
          </div>
    )
}

export default JobCard