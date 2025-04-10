import React from "react";
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlucoseMeasurementDashboard from "./GlucoseMeasurement/GlucoseMeasurementDashboard";
import AnalyticsDashboard from "./Analytics/AnalyticsDashboard";
import Navbar from "./Navigation/Navbar";

// Create a custom theme inspired by Apple's design language
const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF', // Apple blue
    },
    secondary: {
      main: '#FF9500', // Apple orange
    },
    error: {
      main: '#FF3B30', // Apple red
    },
    warning: {
      main: '#FF9500', // Apple orange
    },
    info: {
      main: '#5AC8FA', // Apple light blue
    },
    success: {
      main: '#34C759', // Apple green
    },
    background: {
      default: '#F5F5F7', // Apple light gray background
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/list" element={<GlucoseMeasurementDashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/" element={<Navigate to="/list" replace />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}