import { useState } from "react";

function JobForm ({ setJobs }) {
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        salary: ''
    });

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
    )
}

export default JobForm