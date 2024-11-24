import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/api'; // Use getUsers instead of fetchUsers
import { Card, CardContent, Typography, Box } from '@mui/material';

const HomePage = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch user data and count the total number of users
    getUsers()
      .then((res) => setUserCount(res.data.length)) // Assuming res.data contains the list of users
      .catch((error) => console.error('Failed to fetch user count:', error));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the RBAC System</h1>
      <p>Manage users, roles, and permissions with ease!</p>

      {/* Box containing user count */}
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: '30px',
          padding: '20px',
          borderRadius: '12px', 
          boxShadow: 3,
          backgroundColor:'#393a39', 
          width: 'fit-content', 
          margin: '0 auto'
        }}
      >
    
        {/* Card showing the number of users */}
        <Card sx={{ width: 200, textAlign: 'center', borderRadius: '8px', boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
              {userCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default HomePage;
