function JobCard ({ jobData, onDelete, onUpdate}) {
    return (
          <div className="job-card">
            <button className="delete-btn" onClick={() => onDelete(jobData.id)}>
                &times; 
            </button>

            <div className="card-header">
              <span className="role">{jobData.role}</span>

              <select 
                className={`status ${jobData.status.toLowerCase()}`} 
                onChange={(e) => onUpdate(jobData.id, e.target.value)}
                value={jobData.status}
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