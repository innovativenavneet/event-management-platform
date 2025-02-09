import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // Retrieve stored user & auth state from localStorage
  const storedUser = localStorage.getItem('user');
  const storedAuth = localStorage.getItem('isAuthenticated');

  const [isAuthenticated, setIsAuthenticated] = useState(
    storedAuth ? JSON.parse(storedAuth) : false
  );
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  // Effect to persist auth state in localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user)); // Store null if user logs out
  }, [isAuthenticated, user]);

  // Login Function
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', JSON.stringify(true)); 
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("User data at login:", userData);

  };
  

  // Logout Function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
