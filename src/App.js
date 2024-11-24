import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* Navbar remains constant for all routes */}
      <div style={styles.appContainer}>
        <Navbar />
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            {/* Handle 404 error */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    backgroundColor:'#Add8e6' , // Dark background
    color: '#black', // Light text
    fontFamily: "'Roboto', sans-serif", // Modern font
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    marginTop: '56px', // To ensure content doesn't overlap Navbar
  },
};

export default App;
