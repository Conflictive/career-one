import { useState, useEffect} from "react";

export function useJobs(searchTerm, setHeader) {

    // 1. STATE
    const [jobs, setJobs] = useState([]);

    // 2. DATA FETCHING
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

    // 3. HANDLERS

    /**
     * Deletes a job by ID and updates the local state UI instantly.
     * @param {string} id - The unique ID of the job
     */
    const deleteJob = async (id) =>  {
        const url = "/api/jobs/" + id;
        
        try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        // Update UI 
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
        } catch (error) {
        console.error("Error deleting job:", error);
        }
    };

    /**
     * Updates the status (e.g. 'Interviewing') of a specific job.
     */
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

        if (!response.ok) throw new Error("Network response was not ok");
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

    // 4. DERIVED STATE
    const filteredJobs = jobs?.filter((job) => {
        const cleanSearch = searchTerm.toLowerCase();

        const matchesCompany = job.company.toLowerCase().includes(cleanSearch);
        const matchesRole = job.role.toLowerCase().includes(cleanSearch);

        return matchesCompany || matchesRole;
  })

  const stats = jobs.reduce((acc, job) => {
    console.log(job.status.toLowerCase())
    const status = job.status.toLowerCase() || "applied"
    acc[status]++
    return acc
    }, { interviewing: 0, applied: 0, rejected: 0, offer: 0 })


    // 5. EXPORT
    return {
      jobs,          
      deleteJob, 
      updateJob,
      filteredJobs,
      stats,
   };
}