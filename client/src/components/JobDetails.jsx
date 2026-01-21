import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JobDetails () {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = "/api/jobs/" + id;

        const fetchJob = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    setError("Job not found");
                    return;
                }
                const data = await response.json();

                setJob(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchJob()
    }, [id])

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <Link to="/" style={{ display: 'block', marginTop: '10px', color: '#b91c1c' }}>
                    Go back to Dashboard
                </Link>
            </div>
        )
    }

    return (
        <div>
            {!job ? 
                (<p>Loading...</p>
            ) : (
                <div>
                    <h1>Role: {job.role}</h1>
                    <p>Company: {job.company}</p>
                    <p>Status: {job.status}</p>
                    <p>Salary: {job.salary}</p>
                </div>
                )}
        </div>
    )
}

export default JobDetails