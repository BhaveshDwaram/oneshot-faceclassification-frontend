// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme, AppShell } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import AttendancePage from './pages/AttendancePage';
import Header from './components/Layout/Header';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  white: '#fff',
  black: '#000',
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      <BrowserRouter>
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <Header />
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
