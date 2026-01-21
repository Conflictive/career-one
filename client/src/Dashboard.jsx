import {useState, useEffect} from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";

function Dashboard() {
  const [header, setHeader] = useState("Loading...");
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
        setHeader("Jobs Dashboard");
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
  };

    fetchJobs();
  }, []);

  const deleteJob = async (id) =>  {
    const url = "/api/jobs/" + id;
    
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

  const updateJob = async (id, newStatus) => {
    const updateData = {
      status: newStatus
    };

    const url = "/api/jobs/" + id;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), 
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setJobs((prevJobs) => prevJobs.map((job) => {
        if (job.id === id) {
          return {...job, status: newStatus};
        } else {
          return job;
        }
      }));
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };  

  const filteredJobs = jobs?.filter((job) => {
    const cleanSearch = searchTerm.toLowerCase();

    const matchesCompany = job.company.toLowerCase().includes(cleanSearch);
    const matchesRole = job.role.toLowerCase().includes(cleanSearch);

    return matchesCompany || matchesRole;
  })

  return (
    <div className="container">
      <JobForm setJobs={setJobs} />

      <h1 className="App-title">{header}</h1>

      <input 
        type="text" 
        placeholder="Search jobs..." 
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="job-grid"> 
      {filteredJobs?.map(job => {
          return <JobCard key={job.id} jobData={job} onDelete={deleteJob} onUpdate={updateJob}/>;
      })}
      </div>
    </div>
  );
}

export default Dashboard;