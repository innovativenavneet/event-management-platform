import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isGuestLogin, setIsGuestLogin] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      let response;
      if (isRegistering) {
        response = await axios.post('https://event-management-platform-vgoc.onrender.com/api/auth/register', { fullName, email, password });
        setMessage('🎉 Registration successful! You can now log in.');
        setIsRegistering(false);
      } else {
        response = await axios.post('https://event-management-platform-vgoc.onrender.com/api/auth/login', { email, password });
        localStorage.setItem('user', JSON.stringify(response.data));
        login();  // Mark user as authenticated
        setMessage('🎉 Login Successful!');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (err) {
      setError(isRegistering ? '❌ User already exists. Try logging in.' : '❌ Invalid credentials. Try again or Sign Up.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = { fullName: 'Guest User', email: 'guest@example.com' };

    localStorage.setItem('user', JSON.stringify(guestUser));
    login(); // Mark user as authenticated

    setMessage('🎉 Logged in as Guest!');
    setOpenSnackbar(true);

    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #000428, #004e92)',
      }}
    >
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {isRegistering ? 'Register' : 'Login'}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {!isGuestLogin && (
            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <TextField
                  label="Full Name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
              )}
              <TextField
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
              />
              <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
                InputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#ccc' } }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : isRegistering ? 'Sign Up' : 'Login'}
              </Button>
            </form>
          )}

          <Button variant="outlined" onClick={handleGuestLogin} fullWidth sx={{ mb: 2 }}>
            Login as Guest
          </Button>

          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', color: '#ffeb3b' }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </Typography>
        </Paper>
      </motion.div>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} message={message} />
    </Box>
  );
};

export default LoginPage;
