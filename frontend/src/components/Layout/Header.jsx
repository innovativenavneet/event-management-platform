import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Home, Dashboard, Event, Person, Logout } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Toggle Drawer for mobile navigation
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Open Profile Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close Profile Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleMenuClose();
    navigate('/login');
  };

  // Navigation Links
  const menuItems = [
    { text: 'Home', icon: <Home />, link: '/' },
    { text: 'Dashboard', icon: <Dashboard />, link: '/dashboard' },
    { text: 'Create Event', icon: <Event />, link: '/create-event' },
  ];

  // Sidebar Drawer Content
  const drawerList = (
    <Box
      sx={{
        width: 250,
        p: 2,
        backgroundColor: '#1e3c72',
        height: '100%',
        color: '#fff',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(({ text, icon, link }) => (
          <ListItem
            key={text}
            component={Link}
            to={link}
            sx={{ color: '#fff', '&:hover': { backgroundColor: '#2a5298' } }}
          >
            {icon}
            <ListItemText primary={text} sx={{ ml: 2 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e3c72', boxShadow: 'none' }}>
      <Toolbar>
        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ffeb3b' }}>
          Event Management
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map(({ text, icon, link }) => (
              <Button
                key={text}
                color="inherit"
                component={Link}
                to={link}
                sx={{ color: '#fff', '&:hover': { color: '#ffeb3b' } }}
              >
                {icon} {text}
              </Button>
            ))}
          </Box>
        )}

        {/* Profile Icon */}
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar sx={{ bgcolor: '#ffeb3b', color: '#1e3c72' }}>
            <Person />
          </Avatar>
        </IconButton>

        {/* Profile Dropdown Menu (Fixed Fragment Issue) */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ mt: 1 }}>
          {user
            ? [
                <MenuItem key="name" disabled>{user.fullName}</MenuItem>,
                <MenuItem key="email" disabled>{user.email}</MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> Logout
                </MenuItem>,
              ]
            : [
                <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>,
                <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
                  Register
                </MenuItem>,
              ]}
        </Menu>
      </Toolbar>

      {/* Sidebar Drawer for Mobile Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </AppBar>
  );
};

export default Header;
