import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { format } from 'date-fns';

const DeleteConfirmationDialog = ({
  open,
  measurement,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!measurement) return null;

  // Format date with error handling
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!isDeleting ? onClose : undefined}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '400px',
          maxWidth: '100%',
          p: 1
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="medium">Delete Measurement</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this glucose measurement?
          This action cannot be undone.
        </DialogContentText>
        <Box 
          mt={2} 
          p={2} 
          bgcolor="#F5F5F7" 
          borderRadius="8px"
        >
          <Typography component="div" variant="body2">
            <Box fontWeight="medium" display="inline">Glucose Level:</Box> {measurement.value} mg/dL
          </Typography>
          <Typography component="div" variant="body2">
            <Box fontWeight="medium" display="inline">Date:</Box> {formatDate(measurement.tested_at)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button 
          onClick={onClose} 
          disabled={isDeleting}
          sx={{ 
            borderRadius: '8px',
            color: '#8E8E93' // Apple gray
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={isDeleting}
          variant="contained"
          color="error"
          sx={{ 
            borderRadius: '8px',
            bgcolor: '#FF3B30',
            '&:hover': {
              bgcolor: '#D70015'
            }
          }}
          startIcon={isDeleting ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog; 