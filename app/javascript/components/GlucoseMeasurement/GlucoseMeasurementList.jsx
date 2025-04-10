import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography, 
  Box,
  Chip,
  Stack,
  TablePagination,
  Tooltip,
  Fade,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';

const GlucoseMeasurementList = ({ 
  measurements, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get glucose level color based on value
  const getGlucoseColor = (value) => {
    if (value < 70) return '#FF3B30'; // Low - Red (Apple red)
    if (value > 180) return '#FF9500'; // High - Orange (Apple orange)
    return '#34C759'; // Normal - Green (Apple green)
  };

  // Format date with error handling
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString || 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!measurements || measurements.length === 0) {
    return (
      <Paper 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          borderRadius: '12px',
          backgroundColor: '#F5F5F7', // Apple-like light gray
        }}
        elevation={0}
      >
        <Typography variant="body1" color="text.secondary">
          No glucose measurements found.
        </Typography>
      </Paper>
    );
  }

  // Apply pagination
  const paginatedMeasurements = measurements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Stack spacing={2}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '12px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="glucose measurements table">
          <TableHead sx={{ backgroundColor: '#F5F5F7' }}>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell align="right">Glucose Level</TableCell>
              <TableCell align="right">Test Date & Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMeasurements.map((measurement) => (
              <TableRow
                key={measurement.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#F5F5F7' }
                }}
              >
                <TableCell component="th" scope="row">
                  {measurement.user_id}
                </TableCell>
                <TableCell align="right">
                  <Chip 
                    label={`${measurement.value} mg/dL`}
                    sx={{ 
                      fontWeight: 'medium',
                      backgroundColor: getGlucoseColor(measurement.value),
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {formatDate(measurement.tested_at)}
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <Tooltip title="Edit" arrow TransitionComponent={Fade}>
                      <IconButton 
                        onClick={() => onEdit(measurement)}
                        size="small"
                        sx={{ color: '#007AFF' }} // Apple blue
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow TransitionComponent={Fade}>
                      <IconButton 
                        onClick={() => onDelete(measurement)}
                        size="small"
                        sx={{ color: '#FF3B30' }} // Apple red
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={measurements.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderRadius: '12px',
          '.MuiTablePagination-selectIcon': { color: '#007AFF' },
        }}
      />
    </Stack>
  );
};

export default GlucoseMeasurementList; 