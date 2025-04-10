import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  value: Yup.number()
    .required('Glucose value is required')
    .positive('Glucose value must be positive')
    .integer('Glucose value must be an integer'),
  
  tested_at: Yup.date()
    .required('Test date/time is required')
    .max(new Date(), 'Test date cannot be in the future'),
  
  tz_offset: Yup.string()
    .required('Timezone offset is required'),
  
  user_id: Yup.string()
    .required('User ID is required'),
});

export default validationSchema; 