import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography,
  useMediaQuery 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        backgroundColor: 'white'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalHospitalIcon 
            sx={{ 
              color: theme.palette.primary.main, 
              mr: 1, 
              fontSize: 28 
            }} 
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600, 
              display: { xs: 'none', sm: 'block' },
              color: '#1D1D1F'
            }}
          >
            Glucose Tracker
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1,
            p: 1,
            backgroundColor: '#F5F5F7',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Active background highlight */}
          <Box
            sx={{
              position: 'absolute',
              width: '50%',
              height: '80%',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '8px',
              top: '10%',
              left: isActive('/list') ? '2%' : '50%',
              transition: 'left 0.3s ease',
              zIndex: 0,
              opacity: 0.1
            }}
          />
          
          <Button
            component={Link}
            to="/list"
            startIcon={<TimelineIcon />}
            variant={isActive('/list') ? 'contained' : 'text'}
            sx={{
              borderRadius: '8px',
              px: 2,
              py: 1,
              color: isActive('/list') ? 'white' : '#6E6E73',
              backgroundColor: isActive('/list') ? '#007AFF' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('/list') ? '#0062CC' : 'rgba(0, 0, 0, 0.04)'
              },
              fontWeight: 500,
              zIndex: 1
            }}
          >
            {isMobile ? 'Logs' : 'Measurements'}
          </Button>
          
          <Button
            component={Link}
            to="/analytics"
            startIcon={<AssessmentIcon />}
            variant={isActive('/analytics') ? 'contained' : 'text'}
            sx={{
              borderRadius: '8px',
              px: 2,
              py: 1,
              color: isActive('/analytics') ? 'white' : '#6E6E73',
              backgroundColor: isActive('/analytics') ? '#007AFF' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('/analytics') ? '#0062CC' : 'rgba(0, 0, 0, 0.04)'
              },
              fontWeight: 500,
              zIndex: 1
            }}
          >
            Analytics
          </Button>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 