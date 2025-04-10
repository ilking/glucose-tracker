import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Divider,
  Tooltip,
  Grid,
  useMediaQuery
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';

const GlucoseAverageCard = ({ 
  title, 
  average, 
  change, 
  changePercent, 
  periodStart, 
  periodEnd,
  timeAboveRange,
  timeAboveRangeChange,
  timeAboveRangeChangePercent,
  timeBelowRange,
  timeBelowRangeChange,
  timeBelowRangeChangePercent
}) => {
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  
  const isPositiveChange = change > 0;
  const isNegativeChange = change < 0;
  const isNoChange = change === 0;

  const isPositiveRangeChange = timeAboveRangeChange > 0;
  const isNegativeRangeChange = timeAboveRangeChange < 0;
  const isNoRangeChange = timeAboveRangeChange === 0;
  
  const isPositiveBelowRangeChange = timeBelowRangeChange > 0;
  const isNegativeBelowRangeChange = timeBelowRangeChange < 0;
  const isNoBelowRangeChange = timeBelowRangeChange === 0;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  const getChangeColor = () => {
    // For glucose, lower is generally better
    if (isPositiveChange) return '#FF3B30'; // red for increase
    if (isNegativeChange) return '#34C759'; // green for decrease
    return '#8E8E93'; // gray for no change
  };

  const getRangeChangeColor = () => {
    // For time above range, lower is better
    if (isPositiveRangeChange) return '#FF3B30'; // red for increase
    if (isNegativeRangeChange) return '#34C759'; // green for decrease
    return '#8E8E93'; // gray for no change
  };
  
  const getBelowRangeChangeColor = () => {
    // For time below range, lower is better
    if (isPositiveBelowRangeChange) return '#FF3B30'; // red for increase
    if (isNegativeBelowRangeChange) return '#34C759'; // green for decrease
    return '#8E8E93'; // gray for no change
  };

  const getChangeIcon = () => {
    if (isPositiveChange) return <TrendingUpIcon fontSize="large" />;
    if (isNegativeChange) return <TrendingDownIcon fontSize="large" />;
    return <TrendingFlatIcon fontSize="large" />;
  };

  const getRangeChangeIcon = () => {
    if (isPositiveRangeChange) return <ArrowUpwardIcon fontSize="small" />;
    if (isNegativeRangeChange) return <ArrowDownwardIcon fontSize="small" />;
    return <RemoveIcon fontSize="small" />;
  };
  
  const getBelowRangeChangeIcon = () => {
    if (isPositiveBelowRangeChange) return <ArrowUpwardIcon fontSize="small" />;
    if (isNegativeBelowRangeChange) return <ArrowDownwardIcon fontSize="small" />;
    return <RemoveIcon fontSize="small" />;
  };

  // Calculate the severity level for time above range
  const getTimeAboveRangeSeverity = () => {
    if (!timeAboveRange) return 'neutral';
    if (timeAboveRange > 50) return 'high';
    if (timeAboveRange > 25) return 'medium';
    return 'low';
  };

  // Calculate the severity level for time below range
  const getTimeBelowRangeSeverity = () => {
    if (!timeBelowRange) return 'neutral';
    if (timeBelowRange > 15) return 'high';
    if (timeBelowRange > 5) return 'medium';
    return 'low';
  };

  const getSeverityColor = () => {
    const severity = getTimeAboveRangeSeverity();
    switch (severity) {
      case 'high': return '#FF3B30'; // red
      case 'medium': return '#FF9500'; // orange
      case 'low': return '#34C759'; // green
      default: return '#8E8E93'; // gray
    }
  };
  
  const getBelowRangeSeverityColor = () => {
    const severity = getTimeBelowRangeSeverity();
    switch (severity) {
      case 'high': return '#FF3B30'; // red
      case 'medium': return '#FF9500'; // orange
      case 'low': return '#34C759'; // green
      default: return '#8E8E93'; // gray
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '12px',
        height: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box mb={2}>
        <Typography 
          variant="h6" 
          fontWeight="medium"
          sx={{ color: '#1D1D1F' }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {periodStart && periodEnd && `${formatDate(periodStart)} - ${formatDate(periodEnd)}`}
        </Typography>
      </Box>
      
      <Grid container spacing={isExtraLargeScreen ? 4 : 2} sx={{ mb: 3 }}>
        {/* Average Glucose Section */}
        <Grid item xs={12} lg={isExtraLargeScreen ? 4 : 12}>
          <Box>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              sx={{ mb: 1, color: '#1D1D1F' }}
            >
              {average ? `${average} mg/dL` : 'No data'}
            </Typography>
            
            {change !== null && (
              <Box sx={{ mt: 2 }}>
                {/* Change indicator with larger icon */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1,
                    color: getChangeColor()
                  }}
                >
                  {getChangeIcon()}
                  <Typography 
                    variant="h5" 
                    component="div" 
                    fontWeight="bold"
                    sx={{ ml: 1, color: getChangeColor() }}
                  >
                    {change > 0 ? '+' : ''}{change} mg/dL
                  </Typography>
                </Box>
                
                {/* Detailed metrics */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box display="flex" alignItems="center">
                    <Chip 
                      icon={
                        isPositiveChange ? <ArrowUpwardIcon fontSize="small" /> : 
                        isNegativeChange ? <ArrowDownwardIcon fontSize="small" /> : 
                        <RemoveIcon fontSize="small" />
                      } 
                      label={`${Math.abs(change)} mg/dL change`}
                      size="small"
                      sx={{ 
                        backgroundColor: `${getChangeColor()}15`, // 15% opacity
                        color: getChangeColor(),
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getChangeColor()
                        }
                      }}
                    />
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <Chip 
                      icon={
                        isPositiveChange ? <ArrowUpwardIcon fontSize="small" /> : 
                        isNegativeChange ? <ArrowDownwardIcon fontSize="small" /> : 
                        <RemoveIcon fontSize="small" />
                      } 
                      label={`${changePercent > 0 ? '+' : ''}${changePercent}%`}
                      size="small"
                      sx={{ 
                        backgroundColor: `${getChangeColor()}15`, // 15% opacity
                        color: getChangeColor(),
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getChangeColor()
                        }
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ ml: 1, color: '#6E6E73' }}
                    >
                      vs previous period
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        
        {/* Time Above Range Section */}
        <Grid item xs={12} lg={isExtraLargeScreen ? 4 : 6}>
          <Box>
            <Tooltip title="Percentage of readings above 180 mg/dL" arrow placement="top">
              <Typography 
                variant="subtitle1" 
                fontWeight="medium" 
                sx={{ 
                  color: '#1D1D1F',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'help'
                }}
              >
                <WarningAmberIcon sx={{ mr: 1, fontSize: 20, color: getSeverityColor() }} />
                Time Above Range
              </Typography>
            </Tooltip>
            
            {timeAboveRange !== null ? (
              <>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'baseline',
                    mt: 1
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="div" 
                    fontWeight="bold"
                    sx={{ 
                      color: getSeverityColor(),
                    }}
                  >
                    {timeAboveRange}%
                  </Typography>
                  
                  {timeAboveRangeChange !== null && (
                    <Chip
                      size="small"
                      icon={getRangeChangeIcon()}
                      label={`${timeAboveRangeChange > 0 ? '+' : ''}${timeAboveRangeChange}%`}
                      sx={{ 
                        ml: 1.5,
                        backgroundColor: `${getRangeChangeColor()}15`, // 15% opacity
                        color: getRangeChangeColor(),
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getRangeChangeColor()
                        }
                      }}
                    />
                  )}
                </Box>
                
                {/* Progress bar visualization */}
                <Box 
                  sx={{ 
                    mt: 1,
                    mb: 1,
                    height: 8,
                    width: '100%',
                    backgroundColor: '#F5F5F7',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%',
                      width: `${Math.min(timeAboveRange, 100)}%`,
                      backgroundColor: getSeverityColor(),
                      borderRadius: 4,
                      transition: 'width 0.5s ease-in-out'
                    }}
                  />
                </Box>
                
                <Typography variant="body2" sx={{ color: '#6E6E73' }}>
                  {getTimeAboveRangeSeverity() === 'high' ? (
                    'Significant time spent above target range.'
                  ) : getTimeAboveRangeSeverity() === 'medium' ? (
                    'Moderate time spent above target range.'
                  ) : (
                    'Low time spent above target range.'
                  )}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: '#6E6E73', mt: 1 }}>
                No data available
              </Typography>
            )}
          </Box>
        </Grid>
        
        {/* Time Below Range Section */}
        <Grid item xs={12} lg={isExtraLargeScreen ? 4 : 6}>
          <Box>
            <Tooltip title="Percentage of readings below 70 mg/dL" arrow placement="top">
              <Typography 
                variant="subtitle1" 
                fontWeight="medium" 
                sx={{ 
                  color: '#1D1D1F',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'help'
                }}
              >
                <ErrorIcon sx={{ mr: 1, fontSize: 20, color: getBelowRangeSeverityColor() }} />
                Time Below Range
              </Typography>
            </Tooltip>
            
            {timeBelowRange !== null ? (
              <>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'baseline',
                    mt: 1
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="div" 
                    fontWeight="bold"
                    sx={{ 
                      color: getBelowRangeSeverityColor(),
                    }}
                  >
                    {timeBelowRange}%
                  </Typography>
                  
                  {timeBelowRangeChange !== null && (
                    <Chip
                      size="small"
                      icon={getBelowRangeChangeIcon()}
                      label={`${timeBelowRangeChange > 0 ? '+' : ''}${timeBelowRangeChange}%`}
                      sx={{ 
                        ml: 1.5,
                        backgroundColor: `${getBelowRangeChangeColor()}15`, // 15% opacity
                        color: getBelowRangeChangeColor(),
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: getBelowRangeChangeColor()
                        }
                      }}
                    />
                  )}
                </Box>
                
                {/* Progress bar visualization */}
                <Box 
                  sx={{ 
                    mt: 1,
                    mb: 1,
                    height: 8,
                    width: '100%',
                    backgroundColor: '#F5F5F7',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      height: '100%',
                      width: `${Math.min(timeBelowRange, 100)}%`,
                      backgroundColor: getBelowRangeSeverityColor(),
                      borderRadius: 4,
                      transition: 'width 0.5s ease-in-out'
                    }}
                  />
                </Box>
                
                <Typography variant="body2" sx={{ color: '#6E6E73' }}>
                  {getTimeBelowRangeSeverity() === 'high' ? (
                    'Significant time spent below target range. Risk of hypoglycemia.'
                  ) : getTimeBelowRangeSeverity() === 'medium' ? (
                    'Moderate time spent below target range.'
                  ) : (
                    'Low time spent below target range.'
                  )}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: '#6E6E73', mt: 1 }}>
                No data available
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography 
        variant="body2" 
        sx={{ color: '#6E6E73', fontStyle: 'italic' }}
      >
        {average ? (
          <>
            Your average glucose level 
            <Box 
              component="span" 
              sx={{ 
                fontWeight: 'bold',
                color: getChangeColor()
              }}
            >
              {' '}{isPositiveChange ? 'increased' : isNegativeChange ? 'decreased' : 'remained the same'}{' '}
            </Box>
            compared to the previous period.
          </>
        ) : (
          'Add glucose measurements to see analytics.'
        )}
      </Typography>
    </Paper>
  );
};

export default GlucoseAverageCard; 