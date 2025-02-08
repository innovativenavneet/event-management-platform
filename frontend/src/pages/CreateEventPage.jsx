import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, MenuItem, Box, Paper } from '@mui/material';
import { Event, Description, DateRange, LocationOn, Category, Image, People } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    category: '',
    attendeesLimit: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
      formData.append(key, eventData[key]);
    });

    try {
      const response = await axios.post(
        'https://event-management-platform-vgoc.onrender.com/api/events', 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1e3c72' }}
          component={motion.h4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Create Event
        </Typography>

        <Box component="form" onSubmit={handleCreateEvent} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Event Name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ startAdornment: <Event sx={{ mr: 1 }} /> }}
          />
          
          <TextField
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
            InputProps={{ startAdornment: <Description sx={{ mr: 1 }} /> }}
          />

          <TextField
            label="Event Date & Time"
            type="datetime-local"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ startAdornment: <DateRange sx={{ mr: 1 }} /> }}
          />

          <TextField
            label="Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ startAdornment: <LocationOn sx={{ mr: 1 }} /> }}
          />

          <TextField
            select
            label="Category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ startAdornment: <Category sx={{ mr: 1 }} /> }}
          >
            <MenuItem value="conference">Conference</MenuItem>
            <MenuItem value="workshop">Workshop</MenuItem>
            <MenuItem value="meetup">Meetup</MenuItem>
          </TextField>

          <TextField
            label="Attendee Limit"
            type="number"
            name="attendeesLimit"
            value={eventData.attendeesLimit}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{ startAdornment: <People sx={{ mr: 1 }} /> }}
          />

          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained" component="label" startIcon={<Image />}>
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {eventData.image && <Typography>{eventData.image.name}</Typography>}
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#1e3c72',
              '&:hover': { backgroundColor: '#154286' }
            }}
          >
            Create Event
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEventPage;
