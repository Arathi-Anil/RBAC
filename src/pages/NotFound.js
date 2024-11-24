import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4', // Light background for the 404 page
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: 2 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" sx={{ color: 'gray', marginTop: 1 }}>
        Sorry, the page you are looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 3, padding: '10px 20px' }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
