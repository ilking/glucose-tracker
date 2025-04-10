import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Chip,
  useMediaQuery
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';
import GlucoseAverageCard from './GlucoseAverageCard';
import api from '../api';

const AnalyticsDashboard = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [analytics, setAnalytics] = useState({
    weekly: { 
      average: null, 
      change: null, 
      change_percent: null,
      time_above_range: null,
      time_above_range_change: null,
      time_above_range_change_percent: null,
      time_below_range: null,
      time_below_range_change: null,
      time_below_range_change_percent: null
    },
    monthly: { 
      average: null, 
      change: null, 
      change_percent: null,
      time_above_range: null,
      time_above_range_change: null,
      time_above_range_change_percent: null,
      time_below_range: null,
      time_below_range_change: null,
      time_below_range_change_percent: null
    }
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await api.getGlucoseAverages();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      showNotification('Failed to load glucose analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        <Box mb={4}>
          <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
            <MonitorHeartIcon sx={{ mr: 1, fontSize: 32, color: theme.palette.primary.main }} />
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold"
              sx={{ color: '#1D1D1F' }}
            >
              Glucose Analytics
            </Typography>
            <Chip
              icon={<HistoryIcon />}
              label="Historical Data (April 2024)"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ ml: 2, fontWeight: 500 }}
            />
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ color: '#6E6E73', mt: 1, maxWidth: '800px' }}
          >
            Track your glucose metrics over time. Monitor trends and changes from previous periods to better understand your health patterns.
            This dashboard is currently showing historical data from April 2024.
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />

        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
        >
          <Typography 
            variant="h5" 
            component="h2"
            sx={{ color: '#1D1D1F', fontWeight: 600 }}
          >
            Glucose Averages
          </Typography>
          <Button 
            startIcon={<RefreshIcon />}
            onClick={fetchAnalytics}
            disabled={loading}
            variant="outlined"
            sx={{ 
              borderRadius: '8px',
              borderColor: '#007AFF',
              color: '#007AFF',
              '&:hover': {
                borderColor: '#0062CC',
                backgroundColor: 'rgba(0, 122, 255, 0.04)'
              }
            }}
          >
            Refresh Data
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={8}>
            <CircularProgress color="primary" />
            <Typography variant="body1" sx={{ ml: 2, color: '#6E6E73' }}>
              Loading analytics...
            </Typography>
          </Box>
        ) : (
          <>
            <Grid 
              container 
              spacing={3} 
              sx={{ 
                mb: 6,
                flexDirection: { xs: 'column', md: 'row' },
                '& .MuiGrid-item': {
                  width: { lg: isLargeScreen ? '50%' : '100%' }
                }
              }}
            >
              <Grid item xs={12} md={isLargeScreen ? 6 : 12}>
                <GlucoseAverageCard 
                  title="Last 7 Days of April"
                  average={analytics.weekly.average}
                  change={analytics.weekly.change}
                  changePercent={analytics.weekly.change_percent}
                  periodStart={analytics.weekly.period_start}
                  periodEnd={analytics.weekly.period_end}
                  timeAboveRange={analytics.weekly.time_above_range}
                  timeAboveRangeChange={analytics.weekly.time_above_range_change}
                  timeAboveRangeChangePercent={analytics.weekly.time_above_range_change_percent}
                  timeBelowRange={analytics.weekly.time_below_range}
                  timeBelowRangeChange={analytics.weekly.time_below_range_change}
                  timeBelowRangeChangePercent={analytics.weekly.time_below_range_change_percent}
                />
              </Grid>
              <Grid item xs={12} md={isLargeScreen ? 6 : 12}>
                <GlucoseAverageCard 
                  title="April 2024"
                  average={analytics.monthly.average}
                  change={analytics.monthly.change}
                  changePercent={analytics.monthly.change_percent}
                  periodStart={analytics.monthly.period_start}
                  periodEnd={analytics.monthly.period_end}
                  timeAboveRange={analytics.monthly.time_above_range}
                  timeAboveRangeChange={analytics.monthly.time_above_range_change}
                  timeAboveRangeChangePercent={analytics.monthly.time_above_range_change_percent}
                  timeBelowRange={analytics.monthly.time_below_range}
                  timeBelowRangeChange={analytics.monthly.time_below_range_change}
                  timeBelowRangeChangePercent={analytics.monthly.time_below_range_change_percent}
                />
              </Grid>
            </Grid>
            
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: '12px',
                backgroundColor: '#F9F9FB',
                border: '1px solid rgba(0,0,0,0.03)'
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                About These Metrics
              </Typography>
              <Typography variant="body2" sx={{ color: '#6E6E73' }}>
                <strong>Average Glucose:</strong> Shows your average glucose level for the period.<br/>
                <strong>Time Above Range:</strong> The percentage of glucose readings above 180 mg/dL, which is generally considered the upper limit of the target range for people with diabetes.<br/>
                <strong>Time Below Range:</strong> The percentage of glucose readings below 70 mg/dL, which may indicate hypoglycemia (low blood sugar).<br/>
                For demonstration purposes, this dashboard is showing data from April 2024 rather than current data.
              </Typography>
            </Paper>
          </>
        )}
      </Box>

      {/* Notification snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={closeNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: '8px' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AnalyticsDashboard; 