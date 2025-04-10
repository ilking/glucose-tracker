import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { 
  TextField, 
  Button, 
  Stack, 
  Paper, 
  Typography, 
  Box,
  FormHelperText,
  Alert,
  IconButton
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import validationSchema from './validationSchema';
import api from '../api';

const GlucoseMeasurementForm = ({ measurement = null, onSuccess, onCancel }) => {
  const [serverError, setServerError] = useState(null);
  const isEditing = !!measurement;
  
  const initialValues = {
    user_id: measurement?.user_id || '',
    value: measurement?.value || '',
    tested_at: measurement?.tested_at ? new Date(measurement.tested_at) : new Date(),
    tz_offset: measurement?.tz_offset || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setServerError(null);
      if (isEditing) {
        await api.updateGlucoseMeasurement(measurement.id, values);
      } else {
        await api.createGlucoseMeasurement(values);
      }
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      setServerError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: '12px',
        boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)'
      }}
      elevation={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2" fontWeight="medium">
          {isEditing ? 'Edit Measurement' : 'Add New Measurement'}
        </Typography>
        {onCancel && (
          <IconButton onClick={onCancel} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, isSubmitting, values }) => (
          <Form>
            <Stack spacing={3}>
              <Field name="user_id">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="User ID"
                    fullWidth
                    error={touched.user_id && Boolean(errors.user_id)}
                    helperText={touched.user_id && errors.user_id}
                    variant="outlined"
                  />
                )}
              </Field>
              
              <Field name="value">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Glucose Level (mg/dL)"
                    fullWidth
                    type="number"
                    error={touched.value && Boolean(errors.value)}
                    helperText={touched.value && errors.value}
                    variant="outlined"
                    InputProps={{
                      endAdornment: <Typography variant="body2" color="text.secondary">mg/dL</Typography>
                    }}
                  />
                )}
              </Field>
              
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Test Date & Time"
                  value={values.tested_at}
                  onChange={(date) => setFieldValue('tested_at', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: touched.tested_at && Boolean(errors.tested_at),
                      helperText: touched.tested_at && errors.tested_at,
                      variant: "outlined"
                    }
                  }}
                />
              </LocalizationProvider>
              
              {touched.tested_at && errors.tested_at && (
                <FormHelperText error>{errors.tested_at}</FormHelperText>
              )}
              
              <Field name="tz_offset">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Timezone"
                    fullWidth
                    error={touched.tz_offset && Boolean(errors.tz_offset)}
                    helperText={touched.tz_offset && errors.tz_offset}
                    variant="outlined"
                    disabled
                  />
                )}
              </Field>
              
              <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                {onCancel && (
                  <Button 
                    variant="outlined" 
                    onClick={onCancel}
                    sx={{ borderRadius: '8px' }}
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={isSubmitting}
                  sx={{ 
                    borderRadius: '8px',
                    bgcolor: '#007AFF',
                    '&:hover': {
                      bgcolor: '#0062CC'
                    }
                  }}
                >
                  {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Save'}
                </Button>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default GlucoseMeasurementForm; 