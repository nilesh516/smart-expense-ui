import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdShield, MdRefresh } from 'react-icons/md';
import authApi from '../../api/authApi';
import Alert from '../../components/common/Alert';
import { useAuthContext } from '../../context/AuthContext';
import { AUTH_PLACEHOLDERS, AUTH_LABELS } from '../../constants/uiText';
import { ROUTES } from '../../constants/appConstants';

// OTP expires in 10 minutes — matches backend configuration
const OTP_EXPIRY_SECONDS = 600;

/**
 * OTP verification page — Step 2 of registration.
 * Receives email via navigation state from Register page.
 * Verifies OTP and completes account creation.
 *
 * Features:
 * - 10 minute countdown timer
 * - Resend OTP after expiry
 * - Auto-focus OTP input
 * - Auto-login after successful verification
 */
function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const otpInputRef = useRef(null);

  // Get email and name passed from Register page
  const email = location.state?.email;
  const name = location.state?.name;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);

  // Redirect to register if email is missing from state
  useEffect(() => {
    if (!email) {
      navigate(ROUTES.REGISTER);
    }
  }, [email, navigate]);

  // Auto-focus OTP input on mount
  useEffect(() => {
    otpInputRef.current?.focus();
  }, []);

  // Countdown timer — decrements every second
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.verifyOtp(email, otp);

      // Auto-login after successful verification
      login(
        { name: response.name, email: response.email },
        response.token
      );

      navigate(ROUTES.HOME);

    } catch (err) {
      const message = err.response?.data?.error || 'Invalid OTP. Please try again.';
      setError(message);
      setOtp('');
      otpInputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');

    try {
      await authApi.sendOtp(name, email, '');
      setTimeLeft(OTP_EXPIRY_SECONDS);
      setOtp('');
      setSuccess('New verification code sent to your email.');
      otpInputRef.current?.focus();
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <MdShield size={48} className="auth-icon" />
          <h1 className="auth-title">Verify your email</h1>
          <p className="auth-subtitle">
            We sent a 6-digit code to
          </p>
          <p className="auth-email-highlight">{email}</p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError('')}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess('')}
          />
        )}

        <form onSubmit={handleVerify} className="auth-form">
          <div className="form-group">
            <label htmlFor="otp" className="form-label">
              {AUTH_LABELS.OTP}
            </label>
            <input
              id="otp"
              ref={otpInputRef}
              type="text"
              className="form-input otp-input"
              placeholder={AUTH_PLACEHOLDERS.OTP}
              value={otp}
              onChange={(e) => {
                // Only allow numeric input
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 6) setOtp(val);
              }}
              maxLength={6}
              required
              autoComplete="one-time-code"
            />
          </div>

          {/* Countdown timer */}
          <div className="otp-timer">
            {timeLeft > 0 ? (
              <span className="timer-active">
                Code expires in {formatTime(timeLeft)}
              </span>
            ) : (
              <span className="timer-expired">Code has expired</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading || otp.length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify and Create Account'}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="resend-section">
          <p className="auth-footer">Did not receive the code?</p>
          <button
            className="btn btn-secondary resend-btn"
            onClick={handleResend}
            disabled={resendLoading || timeLeft > 0}
          >
            <MdRefresh size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>

        <p className="auth-footer" style={{ marginTop: 16 }}>
          Wrong email?{' '}
          <span
            className="auth-link"
            onClick={() => navigate(ROUTES.REGISTER)}
            role="button"
            tabIndex={0}
          >
            Go back
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;