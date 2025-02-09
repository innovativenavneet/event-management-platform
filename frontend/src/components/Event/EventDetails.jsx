import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Event, DateRange, LocationOn, People, Category } from '@mui/icons-material';
import { motion } from 'framer-motion';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: 'red' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
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
          <Typography variant="body1" sx={{ mb: 2 }}>
            {event.description}
          </Typography>
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetailsPage;
