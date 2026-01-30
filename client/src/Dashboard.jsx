import {useState, useEffect} from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import JobStats from "./components/JobStats"
import { Container, TextInput, Title, SimpleGrid, Stack, Modal, Group, Button, ActionIcon, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useJobs } from "./hooks/useJobs";
import KanbanBoard from "./components/KanbanBoard";

function Dashboard() {
  const [header, setHeader] = useState("Loading...");
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { stats, filteredJobs, setJobs, deleteJob, updateJob } = useJobs(searchTerm, setHeader);
  
  return (
    
    <Container fluid p="lg">
      <Stack align="center">
        <Title order={1} mx="auto">{header}</Title>

        
        <JobStats stats={stats}/>
        
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

          <Group wrap="no-wrap">
            <TextInput
              type="text" 
              placeholder="Search jobs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

              w="100%"       
              maw={400}      
              mx="auto"      
            />

            <Button onClick={open} w="50%">Add Job</Button>
            <Button onClick={open} w="50%">Sort</Button>
          </Group>

        <KanbanBoard deleteJob={deleteJob} updateJob={updateJob} filteredJobs={filteredJobs}/>
      

        
      </Stack>
    </Container>
  );
}

export default Dashboard;