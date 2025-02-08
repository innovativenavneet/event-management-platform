// filepath: /home/navneet/Desktop/event-management-platform/frontend/src/components/Auth/GuestLogin.jsx
import React from 'react';

const GuestLogin = () => {
  const handleGuestLogin = () => {
    // Implement guest login logic here
    console.log('Guest login');
  };

  return (
    <button onClick={handleGuestLogin}>Guest Login</button>
  );
};

export default GuestLogin;