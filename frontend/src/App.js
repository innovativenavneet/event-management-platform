import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateEventPage from './pages/CreateEventPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isLoginPage && <Header />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
            <Route path="/create-event" element={<PrivateRoute element={<CreateEventPage />} />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
