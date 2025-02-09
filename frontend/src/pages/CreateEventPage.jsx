import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { PhotoCamera, CloudUpload } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const categories = ["Conference", "Workshop", "Meetup", "Concert", "Webinar"];

const CreateEventPage = () => {
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    category: "",
    createdBy: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      console.log("User ID:", user.id); // Debugging
      setEventData((prevData) => ({
        ...prevData,
        createdBy: user.id.toString(), // Ensure it's a string
      }));
    } else {
      console.warn("User ID is missing! Make sure the user is logged in.");
    }
  }, [user]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!eventData.createdBy || eventData.createdBy.trim() === "") {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => formData.append(key, value));

      const response = await axios.post(
        "https://event-management-platform-vgoc.onrender.com/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token || ""}`,
          },
        }
      );

      alert("Event Created Successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      alert("Failed to create event.");
      setLoading(false);
    }
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Create an Event 🎉
      </Typography>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleCreateEvent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Event Name" 
                name="name" value={eventData.name} 
                onChange={handleChange} required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Description" 
                name="description" value={eventData.description} 
                onChange={handleChange} multiline rows={3} required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Date" 
                name="date" type="date" 
                value={eventData.date} onChange={handleChange} 
                InputLabelProps={{ shrink: true }} required 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label="Location" 
                name="location" value={eventData.location} 
                onChange={handleChange} required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth select label="Category"
                name="category" value={eventData.category}
                onChange={handleChange} required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" component="label" 
                fullWidth sx={{ textTransform: "none" }} 
                startIcon={<CloudUpload />}
              >
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Grid>

            {imagePreview && (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <img src={imagePreview} alt="Preview" 
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }} 
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ textTransform: "none", fontSize: "1rem", fontWeight: "bold" }}
              >
                {loading ? <CircularProgress size={24} /> : "Create Event"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateEventPage;
