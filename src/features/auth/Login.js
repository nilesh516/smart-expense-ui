import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdLogin } from 'react-icons/md';
import authApi from '../../api/authApi';
import Alert from '../../components/common/Alert';
import Loader from '../../components/common/Loader';
import { useAuthContext } from '../../context/AuthContext';
import {
  AUTH_PLACEHOLDERS,
  AUTH_LABELS,
  LOADING_MESSAGES
} from '../../constants/uiText';
import { ROUTES } from '../../constants/appConstants';

/**
 * Login page component.
 * Authenticates existing users and stores JWT token in context.
 * Redirects to home page on successful login.
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(formData.email, formData.password);

      // Store auth data in context and localStorage
      login(
        { name: response.name, email: response.email },
        response.token
      );

      // Redirect to home page after successful login
      navigate(ROUTES.HOME);

    } catch (err) {
      const message = err.response?.data?.error || 'Invalid email or password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h1 className="auth-title">SmartExpense AI</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
          />
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <MdEmail size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {AUTH_LABELS.EMAIL}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder={AUTH_PLACEHOLDERS.EMAIL}
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <MdLock size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {AUTH_LABELS.PASSWORD}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder={AUTH_PLACEHOLDERS.PASSWORD}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? (
              <Loader message={LOADING_MESSAGES.DEFAULT} />
            ) : (
              <>
                <MdLogin size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Do not have an account?{' '}
          <Link to={ROUTES.REGISTER} className="auth-link">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;