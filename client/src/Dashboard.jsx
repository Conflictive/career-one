import {useState, useEffect} from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import { Container, TextInput, Title, SimpleGrid, Stack, Modal, Group, Button, ActionIcon } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

function Dashboard() {
  const [header, setHeader] = useState("Loading...");
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  

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
    
    <Container justify="center">
      <Stack align="center">
        <Title order={1} mx="auto">{header}</Title>

        <Button onClick={open}>Add Job</Button>
        
          <Modal 
            opened={opened}   
            onClose={close}  
            withCloseButton={false}
            size="auto"
          >
            <Group justify="space-between">
              <Title order={3}>Adding Job....</Title>
            
                <ActionIcon 
                  color="red" 
                  variant="subtle" 
                  onClick={close}
                >
                  × 
                </ActionIcon>
              
            </Group>
            <JobForm setJobs={setJobs} closeModal={close}/>
          </Modal>

          <TextInput
            type="text" 
            placeholder="Search jobs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

            w="100%"       
            maw={400}      
            mx="auto"      
          />

        <SimpleGrid 
          cols={{ base: 1, sm: 2, lg: 3 }} // 1 col on mobile, 2 on tablet, 3 on desktop
          spacing="lg"                     
          verticalSpacing="lg"             
        >
        {filteredJobs?.map(job => {
            return <JobCard 
                      key={job.id} 
                      jobData={job}
                      onDelete={deleteJob} 
                      onUpdate={updateJob}
                    />;
        })}

        </SimpleGrid>
      </Stack>
    </Container>
  );
}

export default Dashboard;