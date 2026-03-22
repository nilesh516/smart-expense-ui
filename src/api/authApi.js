import axios from 'axios';
import { APP } from '../constants/appConstants';

const BASE_URL = `${APP.API_BASE_URL}/api/auth`;

const authApi = {

  /**
   * Step 1 of registration.
   * Sends user details and triggers OTP email.
   */
  sendOtp: async (name, email, password) => {
    const response = await axios.post(`${BASE_URL}/send-otp`, {
      name,
      email,
      password
    });
    return response.data;
  },

  /**
   * Step 2 of registration.
   * Verifies OTP and creates user account.
   * Returns JWT token on success.
   */
  verifyOtp: async (email, otp) => {
    const response = await axios.post(`${BASE_URL}/verify-otp`, {
      email,
      otp
    });
    return response.data;
  },

  /**
   * Authenticates existing user.
   * Returns JWT token on success.
   */
  login: async (email, password) => {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    return response.data;
  },

  /**
   * Clears stored auth data from local storage.
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authApi;