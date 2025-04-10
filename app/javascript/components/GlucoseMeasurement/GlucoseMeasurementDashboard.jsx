import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Fab, 
  Snackbar, 
  Alert,
  Dialog,
  DialogContent,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from '@mui/material/styles';
import GlucoseMeasurementList from './GlucoseMeasurementList';
import GlucoseMeasurementForm from './GlucoseMeasurementForm';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import api from '../api';

const GlucoseMeasurementDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Fetch measurements
  const fetchMeasurements = async () => {
    setLoading(true);
    try {
      const response = await api.getGlucoseMeasurements();
      setMeasurements(response.data);
    } catch (error) {
      console.error('Failed to fetch measurements:', error);
      showNotification('Failed to load glucose measurements', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMeasurements();
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
  
  // Open form to add new measurement
  const handleAddNew = () => {
    setSelectedMeasurement(null);
    setShowForm(true);
  };
  
  // Open form to edit measurement
  const handleEdit = (measurement) => {
    setSelectedMeasurement(measurement);
    setShowForm(true);
  };
  
  // Open delete confirmation dialog
  const handleDeleteClick = (measurement) => {
    setMeasurementToDelete(measurement);
    setDeleteDialogOpen(true);
  };
  
  // Close delete confirmation dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setMeasurementToDelete(null);
    setIsDeleting(false);
  };
  
  // Confirm and delete measurement
  const handleDeleteConfirm = async () => {
    if (!measurementToDelete) return;
    
    setIsDeleting(true);
    try {
      await api.deleteGlucoseMeasurement(measurementToDelete.id);
      // Remove the deleted measurement from state
      setMeasurements(measurements.filter(m => m.id !== measurementToDelete.id));
      showNotification('Glucose measurement deleted successfully');
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Failed to delete measurement:', error);
      showNotification('Failed to delete measurement', 'error');
      setIsDeleting(false);
    }
  };
  
  // Handle form submission success
  const handleFormSuccess = () => {
    fetchMeasurements();
    setShowForm(false);
    showNotification(
      selectedMeasurement 
        ? 'Glucose measurement updated successfully' 
        : 'Glucose measurement added successfully'
    );
  };
  
  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedMeasurement(null);
  };
  
  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Box py={3}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          fontWeight="bold"
          sx={{ color: '#1D1D1F' }} // Apple dark text color
        >
          Glucose Tracker
        </Typography>
        
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
        >
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ color: '#6E6E73' }} // Apple secondary text color
          >
            Measurements
          </Typography>
          <Box display="flex" gap={1}>
            <Button 
              startIcon={<RefreshIcon />}
              onClick={fetchMeasurements}
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
              Refresh
            </Button>
            {!isMobile && (
              <Button 
                startIcon={<AddIcon />}
                onClick={handleAddNew}
                variant="contained"
                sx={{ 
                  borderRadius: '8px',
                  backgroundColor: '#007AFF',
                  '&:hover': {
                    backgroundColor: '#0062CC'
                  }
                }}
              >
                Add Measurement
              </Button>
            )}
          </Box>
        </Box>
        
        <GlucoseMeasurementList 
          measurements={measurements}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </Box>
      
      {/* Mobile Add Button */}
      {isMobile && (
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleAddNew}
          sx={{ 
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#007AFF',
            '&:hover': {
              backgroundColor: '#0062CC'
            }
          }}
        >
          <AddIcon />
        </Fab>
      )}
      
      {/* Form displayed in modal dialog for both mobile and desktop */}
      <Dialog
        open={showForm}
        onClose={handleCloseForm}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            ...(isMobile && {
              margin: '16px',
              width: 'calc(100% - 32px)',
              maxHeight: '90vh'
            })
          }
        }}
      >
        <DialogContent>
          <GlucoseMeasurementForm 
            measurement={selectedMeasurement}
            onSuccess={handleFormSuccess}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        measurement={measurementToDelete}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
      
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

export default GlucoseMeasurementDashboard; 