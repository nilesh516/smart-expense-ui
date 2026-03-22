import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock, MdArrowForward } from 'react-icons/md';
import authApi from '../../api/authApi';
import Alert from '../../components/common/Alert';
import Loader from '../../components/common/Loader';
import {
  AUTH_PLACEHOLDERS,
  AUTH_LABELS,
  LOADING_MESSAGES
} from '../../constants/uiText';
import { ROUTES } from '../../constants/appConstants';

/**
 * Registration page — Step 1 of 2.
 * Collects user details and triggers OTP email.
 * On success, navigates to OTP verification page.
 *
 * Email is passed via navigation state to VerifyOtp page
 * so the user does not need to re-enter it.
 */
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await authApi.sendOtp(
        formData.name,
        formData.email,
        formData.password
      );

      // Navigate to OTP page passing email via state
      // so user does not need to re-enter it
      navigate(ROUTES.VERIFY_OTP, {
        state: {
          email: formData.email,
          name: formData.name
        }
      });

    } catch (err) {
      const message = err.response?.data?.error || 'Failed to send OTP. Please try again.';
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
          <p className="auth-subtitle">Create your account</p>
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
            <label htmlFor="name" className="form-label">
              <MdPerson size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {AUTH_LABELS.NAME}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              placeholder={AUTH_PLACEHOLDERS.NAME}
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
            />
            <p className="form-hint">
              Min 8 characters with uppercase, lowercase, number and special character.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <MdLock size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
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
                Send Verification Code
                <MdArrowForward size={16} style={{ marginLeft: 6, verticalAlign: 'middle' }} />
              </>
            )}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;