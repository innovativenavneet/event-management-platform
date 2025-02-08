import React from 'react';
import { Container, Typography, Link, Box, Stack, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: 'white',
        py: 2, // Equivalent to theme.spacing(4)
        mt: '0px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* About Us Section */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom color="#ffeb3b">
              About Us
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Our Story
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Team
            </Link>
          </Grid>

          {/* Services Section */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom color="#ffeb3b">
              Services
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Event Planning
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Venue Selection
            </Link>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom color="#ffeb3b">
              Contact Us
            </Typography>
            <Link href="#" color="inherit" underline="hover">
              Email
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Phone
            </Link>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <Box textAlign="center" mt={3}>
          <IconButton href="#" sx={{ color: '#ffeb3b', mx: 1 }}>
            <Facebook />
          </IconButton>
          <IconButton href="#" sx={{ color: '#ffeb3b', mx: 1 }}>
            <Twitter />
          </IconButton>
          <IconButton href="#" sx={{ color: '#ffeb3b', mx: 1 }}>
            <Instagram />
          </IconButton>
          <IconButton href="#" sx={{ color: '#ffeb3b', mx: 1 }}>
            <LinkedIn />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" align="center" sx={{ mt: 3, color: '#b0bec5' }}>
          &copy; 2025 Event Management Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
