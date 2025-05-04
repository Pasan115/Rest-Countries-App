import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { SessionProvider } from './context/SessionContext';
import { Box } from '@mui/material';

// Pages
import HomePage from './pages/HomePage';

function App() {
  // Add an interceptor to handle API errors globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <ThemeProviderWrapper>
      <SessionProvider>
        <Box sx={{ 
          minHeight: '100vh', 
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'all 0.3s ease-in-out'
        }}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </Box>
      </SessionProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
