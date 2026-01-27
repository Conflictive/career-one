import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard'; 
import Settings from './Settings'
import JobDetails from './components/JobDetails'
import { AppShell, Burger, Group, NavLink, Title, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm', // When screen is small apply mobile settings
        collapsed: { mobile: !opened }, // If mobile, hide navbar unless "opened" is true
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* Burger button - only shows on mobile */}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>CareerOne</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={500} c="dimmed" mb="sm">MENU</Text>
        
        <NavLink 
            label="Dashboard" 
            component={Link} 
            to="/" 
            active 
            variant="filled"
        />

        <NavLink 
            label="Settings" 
            component={Link} 
            to="/settings" 
        />
      </AppShell.Navbar>

      <AppShell.Main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
            </Routes>
        </AppShell.Main>
      
    </AppShell>
  );
}


export default App;