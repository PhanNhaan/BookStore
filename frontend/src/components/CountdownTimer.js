import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const CountdownTimer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <Box>
      {Object.keys(timeLeft).length > 0 ? (
        <Typography variant="body2" sx={{ color: '#e53935' }}>
          Flash sale còn lại: {timeLeft.days}d {formatTime(timeLeft.hours)}h{' '}
          {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
        </Typography>
      ) : (
        <Typography variant="body2" sx={{ color: '#e53935' }}>
          Flash sale đã kết thúc.
        </Typography>
      )}
    </Box>
  );
};

export default CountdownTimer;
