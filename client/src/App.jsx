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
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
        setHeader("Jobs Dashboard")
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
  };

  fetchJobs();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,        
      [name]: value       
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      role: formData.role,
      company: formData.company,
      salary: formData.salary
    };

    try {
      const response = await fetch("api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData), 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setJobs((prevJobs) => [...prevJobs, data]);
      
      setFormData({ role: "", company: "", salary: "" });

    } catch (error) {
      console.error("Error saving job:", error);
    }
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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