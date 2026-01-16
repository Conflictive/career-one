function JobCard ({ jobData }) {
    return (
          <div className="job-card">
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