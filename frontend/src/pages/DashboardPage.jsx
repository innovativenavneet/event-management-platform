import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, Button, Box, TextField, MenuItem } from '@mui/material';
import { Event, DateRange, LocationOn, People, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://event-management-platform-vgoc.onrender.com/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtered Events Based on Category and Date
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();

    // Filter by category
    if (category && event.category !== category) return false;

    // Filter by date
    if (dateFilter === 'upcoming' && eventDate < now) return false;
    if (dateFilter === 'past' && eventDate >= now) return false;

    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Event Dashboard
      </Typography>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} sx={{ mb: 4 }}>
        <TextField
          select
          label="Filter by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="conference">Conference</MenuItem>
          <MenuItem value="workshop">Workshop</MenuItem>
          <MenuItem value="meetup">Meetup</MenuItem>
        </TextField>

        <TextField
          select
          label="Filter by Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Events</MenuItem>
          <MenuItem value="upcoming">Upcoming Events</MenuItem>
          <MenuItem value="past">Past Events</MenuItem>
        </TextField>


      </Box>

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress size={50} />
        </Box>
      ) : filteredEvents.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No events found. Try adjusting filters!
        </Typography>
      ) : (
        <Grid container spacing={3} component={motion.div} initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5 } },
        }}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image || 'https://via.placeholder.com/300'}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      <Event sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <DateRange sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {new Date(event.date).toDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {event.location}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                      <People sx={{ verticalAlign: 'middle', mr: 1, color: 'green' }} />
                      {event.attendeesCount || 0} Attendees
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: '#1e3c72', '&:hover': { backgroundColor: '#154286' } }}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DashboardPage;
