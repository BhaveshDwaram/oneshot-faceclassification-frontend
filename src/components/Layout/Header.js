import { AppShell, Group, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppShell.Header p="md">
      <Group justify="space-between">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title order={3}>Face Recognition System</Title>
        </Link>
        <Group>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
          <Link to="/attendance" style={{ textDecoration: 'none' }}>
            Attendance
          </Link>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
