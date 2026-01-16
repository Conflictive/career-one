import {useState, useEffect} from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

function App() {
  const [header, setHeader] = useState("Loading...");
  const [jobs, setJobs] = useState([]);
  

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

  return (
    <div className="container">
      <JobForm setJobs={setJobs} />

      <h1 className="dashboard-title">{header}</h1>

      <div className="job-grid"> {/* The Grid Container goes HERE */}
      {jobs?.map(job => {
          console.log(job);
          return <JobCard key={job.id} jobData={job} />;
      })}
      </div>
    </div>
  );
}

export default App;