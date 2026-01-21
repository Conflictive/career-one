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

  const onDelete = async (id) =>  {
    const url = "/api/jobs/" + id
    
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    };


  return (
    <div className="container">
      <JobForm setJobs={setJobs} />

      <h1 className="dashboard-title">{header}</h1>

      <div className="job-grid"> 
      {jobs?.map(job => {
          return <JobCard key={job.id} jobData={job} onDelete={onDelete}/>;
      })}
      </div>
    </div>
  );
}

export default App;