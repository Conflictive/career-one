import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [header, setHeader] = useState("Loading...");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => {
        setHeader(data.message);
        setJobs(data.jobs); 
      });
  }, []);

  return (
    <div className="container">
      <h1 className="dashboard-title">{header}</h1>

      <div className="job-grid">
        {jobs?.map((job) => (
          <div key={job.id} className="job-card">
            <div className="card-header">
              <span className="role">{job.role}</span>
              <span className={`status ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            <h3 className="company">{job.company}</h3>
            <p className="salary">Job Salary: {job.salary}</p>
            <p className="date">Applied: {job.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;