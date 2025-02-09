import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, CircularProgress, Card, CardContent, CardMedia, Box,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Event, DateRange, LocationOn, People, Category, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://event-management-platform-vgoc.onrender.com/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://event-management-platform-vgoc.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/'); // Redirect after deletion
    } catch (err) {
      setError('Failed to delete the event. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
        }}
      >
        <CircularProgress size={50} sx={{ color: "#fff" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          background: "linear-gradient(to right, #1e3c72, #2a5298)",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#fff' }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            boxShadow: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
            maxWidth: 600,
            mx: "auto",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={event.imageUrl || 'https://via.placeholder.com/500'}
            alt={event.name}
          />
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              <Event sx={{ verticalAlign: 'middle', mr: 1 }} />
              {event.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{event.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              <DateRange sx={{ verticalAlign: 'middle', mr: 1 }} />
              {new Date(event.date).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
              {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Category sx={{ verticalAlign: 'middle', mr: 1 }} />
              {event.category}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
              <People sx={{ verticalAlign: 'middle', mr: 1, color: 'green' }} />
              {event.attendees.length} Attendees
            </Typography>
            <Box mt={3} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={() => setOpenDialog(true)}
              >
                Delete Event
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default EventDetailsPage;
