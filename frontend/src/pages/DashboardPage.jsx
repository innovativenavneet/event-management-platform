import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  TextField,
  MenuItem,
  Skeleton,
  useTheme,
} from "@mui/material";
import { Event, DateRange, LocationOn, People, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://event-management-platform-vgoc.onrender.com/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter & Sort Events
  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();

      if (category && event.category !== category) return false;
      if (dateFilter === "upcoming" && eventDate < now) return false;
      if (dateFilter === "past" && eventDate >= now) return false;
      if (searchTerm && !event.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOrder === "popular") return (b.attendees?.length || 0) - (a.attendees?.length || 0);
      return 0;
    });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1e3c72, #2a5298)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
          component={motion.h4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Event List
        </Typography>

        {/* Filters & Search */}
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} sx={{ mb: 4 }}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 200, backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="conference">Conference</MenuItem>
            <MenuItem value="workshop">Workshop</MenuItem>
            <MenuItem value="meetup">Meetup</MenuItem>
          </TextField>

          <TextField
            select
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{ minWidth: 200, backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="">All Events</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="past">Past</MenuItem>
          </TextField>

          <TextField
            select
            label="Sort By"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ minWidth: 200, backgroundColor: "#fff", borderRadius: 1 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
          </TextField>

          <TextField
            variant="outlined"
            placeholder="Search Events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200, backgroundColor: "#fff", borderRadius: 1 }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "gray" }} />,
            }}
          />
        </Box>

        {/* Loading Skeletons */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3 }} />
                <Skeleton height={30} width="80%" sx={{ mt: 1 }} />
                <Skeleton height={20} width="60%" sx={{ mt: 1 }} />
                <Skeleton height={20} width="40%" sx={{ mt: 1 }} />
              </Grid>
            ))}
          </Grid>
        ) : filteredEvents.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "#fff" }}>
            No events found. Try adjusting filters!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card
                    sx={{
                      boxShadow: 4,
                      borderRadius: 3,
                      backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
                      transition: "0.3s",
                      "&:hover": { boxShadow: 8 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.imageUrl || "https://via.placeholder.com/300"}
                      alt={event.name}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                        <Event sx={{ verticalAlign: "middle", mr: 1 }} />
                        {event.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <DateRange sx={{ verticalAlign: "middle", mr: 1 }} />
                        {new Date(event.date).toDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
                        {event.location}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                        <People sx={{ verticalAlign: "middle", mr: 1, color: "green" }} />
                        {event.attendees ? event.attendees.length : 0} Attendees
                      </Typography>
                      <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={() => navigate(`/events/${event._id}`)}>
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
    </Box>
  );
};

export default EventListPage;
