import { useState } from "react";
import { Container, Stack, Title, TextInput, Button, Paper, Group } from '@mantine/core';

function JobForm ({ setJobs, closeModal}) {
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
    closeModal();

    const jobData = {
      role: formData.role,
      company: formData.company,
      salary: formData.salary
    };

    try {
      const response = await fetch("/api/jobs", {
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
          <Container size="xl" mt="md"> 
            <Paper shadow="md" p="xl" withBorder radius="md">
              <form onSubmit={handleSubmit}>
                
                <Group align="flex-end"> 
                  
                  <TextInput
                    label="Role" 
                    name="role" 
                    value={formData.role} 
                    placeholder="e.g. Backend Engineer" 
                    onChange={handleChange}
                    required 
                  />
                  
                  <TextInput
                    label="Company"
                    name="company" 
                    value={formData.company} 
                    placeholder="e.g. Google" 
                    onChange={handleChange}
                  />
            
                  <TextInput
                    label="Salary"
                    name="salary" 
                    value={formData.salary} 
                    placeholder="e.g. £45,000" 
                    onChange={handleChange}
                  />
                
                  <Button type="submit">
                    Save
                  </Button>

                </Group>

              </form>
            </Paper>
          </Container>
        );
}

export default JobForm