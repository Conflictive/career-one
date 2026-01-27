import { Card, Text, Group, Menu, Badge, ActionIcon, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const statusColors = {
    Applied: 'blue',
    Interviewing: 'orange',
    Rejected: 'red',
    Offer: 'green'
  };


function JobCard({ jobData, onDelete, onUpdate }) {
  const currentStatus = jobData.status || 'Applied';

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text 
          component={Link} 
          to={`/jobs/${jobData.id}`} 
          fw={700} 
          size="lg" 
          c="blue" 
          style={{ textDecoration: 'none' }} 
        >
          {jobData.role}
        </Text>

        <ActionIcon 
          color="red" 
          variant="subtle" 
          onClick={() => onDelete(jobData.id)}
        >
          × 
        </ActionIcon>
      </Group>

      <Title order={4} mb="md">{jobData.company}</Title>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Badge 
            color={statusColors[currentStatus] || 'gray'} 
            variant="light" 
            size="lg"
            style={{ cursor: 'pointer' }} 
          >
            {currentStatus} ▼
          </Badge>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Change Status</Menu.Label>
          
          
          <Menu.Item onClick={() => onUpdate(jobData.id, "Applied")}>
            Applied
          </Menu.Item>
          
          <Menu.Item onClick={() => onUpdate(jobData.id, "Interviewing")}>
            Interviewing
          </Menu.Item>
          
          <Menu.Item onClick={() => onUpdate(jobData.id, "Rejected")}>
            Rejected
          </Menu.Item>

        </Menu.Dropdown>
    </Menu>

      <Group justify="space-between" mt="md">
        <Text c="dimmed" size="sm">
          Salary: {jobData.salary}
        </Text>
        <Text c="dimmed" size="sm">
          Applied: {jobData.date}
        </Text>
      </Group>

    </Card>
  );
}

export default JobCard