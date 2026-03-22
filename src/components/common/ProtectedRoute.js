import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../constants/appConstants';

/**
 * Wraps protected pages and redirects unauthenticated users to login.
 * Used in App.js to protect routes that require authentication.
 *
 * Usage:
 * <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  // Redirect to login if user is not authenticated
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;