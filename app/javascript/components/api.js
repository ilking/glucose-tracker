import axios from 'axios';

// Set up CSRF token for Rails
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;

const api = {
  // Get all glucose measurements
  getGlucoseMeasurements: () => axios.get('/glucose_measurements.json'),
  
  // Get a single glucose measurement
  getGlucoseMeasurement: (id) => axios.get(`/glucose_measurements/${id}.json`),
  
  // Create a new glucose measurement
  createGlucoseMeasurement: (data) => axios.post('/glucose_measurements.json', { glucose_measurement: data }),
  
  // Update an existing glucose measurement
  updateGlucoseMeasurement: (id, data) => axios.put(`/glucose_measurements/${id}.json`, { glucose_measurement: data }),
  
  // Delete a glucose measurement
  deleteGlucoseMeasurement: (id) => axios.delete(`/glucose_measurements/${id}.json`),
  
  // Get glucose analytics data
  getGlucoseAverages: () => axios.get('/analytics/glucose_averages'),
};

export default api; 