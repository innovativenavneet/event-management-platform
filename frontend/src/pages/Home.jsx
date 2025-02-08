import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: '#fff',
        py: 5,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Event Management Platform
          </Typography>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        >
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
            Manage your events efficiently and effectively.
          </Typography>
        </motion.div>

        {/* Button Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/create-event"
            sx={{
              backgroundColor: '#ffeb3b',
              color: '#1e3c72',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#ffd700' },
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
