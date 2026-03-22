import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

/**
 * Provides authentication state and actions to the entire app.
 * Persists token and user data in localStorage so auth
 * survives page refreshes.
 */
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    // Restore user from localStorage on app load
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  /**
   * Stores auth data after successful login or registration.
   * Persists to localStorage so user stays logged in on refresh.
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  /**
   * Clears all auth data and redirects to login.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);