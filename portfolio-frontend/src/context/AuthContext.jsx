import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService } from '../services/portfolioService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const storedToken = localStorage.getItem('token');
    
    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginService(credentials);
      const { token, admin } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      
      setToken(token);
      setAdmin(admin);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setToken(null);
    setAdmin(null);
  };

  const value = {
    admin,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
