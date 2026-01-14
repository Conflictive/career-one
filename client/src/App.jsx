import React, { useState, useEffect, use } from "react";
import "./App.css";

function App() {
  const [header, setHeader] = useState("Loading...");
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    salary: ''
  });

  useEffect(() => {
    fetch("/api/home")
      .then((response) => response.json())
      .then((data) => {
        setHeader(data.message);
        setJobs(data.jobs); 
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,        
      [name]: value       
    }));
  };

  return (
    <div className="container">
      <form>
        <input 
          type="text" 
          name="role" 
          value={formData.role} 
          placeholder="Role" 
          onChange={handleChange}
        />
        <br />

        <input 
          type="text" 
          name="company" 
          value={formData.company} 
          placeholder="Company" 
          onChange={handleChange}
        />
        <br />

        <input 
          type="text" 
          name="salary" 
          value={formData.salary} 
          placeholder="Salary" 
          onChange={handleChange}
        />
        <br />
        
        <button>Save</button>
      </form>

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