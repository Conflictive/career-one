import { SimpleGrid, Paper, Text, Group } from '@mantine/core';

function JobStats({ stats }) {
  if (!stats) return null;

  return (
    <SimpleGrid cols={5}> 
      
      <Paper withBorder p="md">
        <Text c="dimmed">Total Applications</Text>
        <Text size="xl" fw={700} c="black">{stats.interviewing + stats.applied + stats.rejected + stats.offer}</Text>
      </Paper>

      <Paper withBorder p="md">
        <Text c="dimmed">Applied</Text>
        <Text size="xl" fw={700} c="blue">{stats.applied}</Text>
      </Paper>

      <Paper withBorder p="md">
        <Text c="dimmed">Interviews</Text>
        <Text size="xl" fw={700} c="orange">{stats.interviewing}</Text>
      </Paper>

      <Paper withBorder p="md">
        <Text c="dimmed">Offers</Text>
        <Text size="xl" fw={700} c="green">{stats.offer}</Text>
      </Paper>

      <Paper withBorder p="md">
        <Text c="dimmed">Rejected</Text>
        <Text size="xl" fw={700} c="red">{stats.rejected}</Text>
      </Paper>
    </SimpleGrid>
  );
}

export default JobStats;